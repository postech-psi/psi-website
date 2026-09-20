// The original CAD remains the no-JS, no-WebGL and network-error fallback.
const figure=document.querySelector('#electric-tvc .cad-figure');
if(figure) mount(figure);

function mount(figure){
 const ko=document.documentElement.lang==='ko';
 const t=(en,kr)=>ko?kr:en;
 const fallback=figure.querySelector('.cad-board');
 const host=document.createElement('div');host.className='tvc-viewer';host.dataset.tvcViewer='';host.dataset.state='idle';
 const start=document.createElement('button');start.type='button';start.className='tvc-start';start.dataset.tvcStart='';start.textContent=t('View in 3D','3D 보기');
 const status=document.createElement('span');status.className='tvc-status';status.setAttribute('role','status');
 const bar=document.createElement('div');bar.className='tvc-toolbar';bar.append(start,status);
 fallback.after(host,bar);
 let view;
 start.addEventListener('click',async()=>{
  if(view){show();return;}
  start.disabled=true;host.dataset.state='loading';status.textContent=t('Loading model…','모델 불러오는 중…');
  try{
   const [THREE,{STLLoader},{OrbitControls}]=await Promise.all([
    import('./assets/tvc/three.module.min.js'),import('./assets/tvc/STLLoader.js'),import('./assets/tvc/OrbitControls.js')
   ]);
   const response=await fetch(new URL('./assets/tvc/tvc_vehicle.stl',import.meta.url),{signal:AbortSignal.timeout(30000)});
   if(!response.ok)throw Error('Model unavailable');
   const geometry=new STLLoader().parse(await response.arrayBuffer());
   view=createView(host,geometry,THREE,OrbitControls,ko,()=>{
    view.dispose();view=null;host.replaceChildren();host.dataset.state='error';fallback.hidden=false;
    start.hidden=false;start.disabled=false;status.textContent=t('3D unavailable. Showing CAD image.','3D를 표시할 수 없어 CAD 이미지를 보여드립니다.');
   });
   show();
  }catch{
   host.dataset.state='error';host.replaceChildren();fallback.hidden=false;
   status.textContent=t('Could not load 3D. Try again or open the CAD image.','3D를 불러오지 못했습니다. 다시 시도하거나 CAD 이미지를 열어 주세요.');
  }finally{start.disabled=false;}
 });
 function show(){
  fallback.hidden=true;host.hidden=false;host.dataset.state='ready';start.hidden=true;status.textContent='';
  view.resize();view.canvas.focus({preventScroll:true});
 }
 host.addEventListener('click',event=>{
  if(!event.target.closest('[data-tvc-close]'))return;
  host.hidden=true;fallback.hidden=false;start.hidden=false;start.focus({preventScroll:true});
 });
}

function createView(host,geometry,T,OrbitControls,ko,onLost){
 const t=(en,kr)=>ko?kr:en;
 let renderer;
 try{renderer=new T.WebGLRenderer({alpha:true,antialias:true});}catch(error){geometry.dispose();throw error;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));
 renderer.setClearColor(0x000000,0);
 const canvas=renderer.domElement;canvas.tabIndex=0;
 canvas.setAttribute('role','img');canvas.setAttribute('aria-label',t('TVC vehicle 3D model. Drag or use arrow keys to rotate. Use + and − to zoom. Home resets the view.','TVC 기체 3D 모델. 드래그하거나 방향키로 회전합니다. +와 −로 확대·축소하고 Home으로 초기화합니다.'));
 const stage=document.createElement('div');stage.className='tvc-stage';stage.append(canvas);host.append(stage);
 const scene=new T.Scene();
 // The source assembly is Z-up in millimetres. Preserve that axis, centre and normalize for display only.
 geometry.computeBoundingBox();geometry.center();
 const size=geometry.boundingBox.getSize(new T.Vector3());geometry.scale(2/Math.max(size.x,size.y,size.z),2/Math.max(size.x,size.y,size.z),2/Math.max(size.x,size.y,size.z));
 const material=new T.MeshStandardMaterial({color:0xc6cbd0,metalness:.32,roughness:.48,side:T.DoubleSide});
 scene.add(new T.Mesh(geometry,material));
 scene.add(new T.HemisphereLight(0xffffff,0x40444c,2.6));
 const key=new T.DirectionalLight(0xffffff,3.2);key.position.set(3,-4,5);scene.add(key);
 const rim=new T.DirectionalLight(0xc4d5e9,2);rim.position.set(-3,2,1);scene.add(rim);
 const camera=new T.PerspectiveCamera(36,1,.01,100);camera.up.set(0,0,1);camera.position.set(2.2,-3.2,1.2);
 const controls=new OrbitControls(camera,canvas);controls.enablePan=false;controls.enableDamping=false;
 controls.minDistance=1.35;controls.maxDistance=9;controls.zoomSpeed=.7;controls.rotateSpeed=.7;
 controls.touches.TWO=T.TOUCH.DOLLY_ROTATE;
 // Wheel zoom is opt-in through focus so simply reading the page never traps scrolling.
 controls.enableZoom=false;
 const render=()=>renderer.render(scene,camera);
 canvas.addEventListener('focus',()=>{controls.enableZoom=true;});
 canvas.addEventListener('blur',()=>{controls.enableZoom=false;});
 canvas.addEventListener('pointerdown',()=>canvas.focus({preventScroll:true}));
 controls.update();controls.saveState();controls.addEventListener('change',render);
 const zoom=factor=>{
  const offset=camera.position.clone().sub(controls.target);
  offset.setLength(T.MathUtils.clamp(offset.length()*factor,controls.minDistance,controls.maxDistance));
  camera.position.copy(controls.target).add(offset);controls.update();render();
 };
 const reset=()=>{controls.reset();render();};
 canvas.addEventListener('keydown',event=>{
  if(['+','=','-','_','Home','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))event.preventDefault();else return;
  if(event.key==='Home'){reset();return;}
  if(['+','=','-','_'].includes(event.key)){zoom(['+','='].includes(event.key)?.85:1/.85);return;}
  const offset=camera.position.clone().sub(controls.target),up=new T.Vector3(0,0,1);
  const spherical=new T.Spherical().setFromVector3(offset.applyQuaternion(new T.Quaternion().setFromUnitVectors(up,new T.Vector3(0,1,0))));
  spherical.theta+=event.key==='ArrowLeft'?.12:event.key==='ArrowRight'?-.12:0;
  spherical.phi+=event.key==='ArrowUp'?-.12:event.key==='ArrowDown'?.12:0;spherical.makeSafe();
  offset.setFromSpherical(spherical).applyQuaternion(new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),up));
  camera.position.copy(controls.target).add(offset);controls.update();render();
 });
 const actions=document.createElement('div');actions.className='tvc-actions';
 for(const [label,symbol,attribute,value,handler] of [
  [t('Zoom in','확대'),'+','tvcZoom','in',()=>zoom(.85)],
  [t('Zoom out','축소'),'−','tvcZoom','out',()=>zoom(1/.85)],
  [t('Reset view','초기화'),'↺','tvcReset','',reset],
  [t('Show image','이미지 보기'),t('Image','이미지'),'tvcClose','',()=>{}]
 ]){
  const button=document.createElement('button');button.type='button';button.textContent=symbol;button.setAttribute('aria-label',label);button.title=label;button.dataset[attribute]=value;button.addEventListener('click',handler);actions.append(button);
 }
 const help=document.createElement('span');help.className='tvc-help';help.textContent=t('Drag to rotate · Pinch to zoom','드래그로 회전 · 두 손가락으로 확대');actions.prepend(help);host.append(actions);
 const resize=()=>{
  const width=stage.clientWidth,height=stage.clientHeight;if(!width||!height)return;
  renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();render();
 };
 const observer=new ResizeObserver(resize);observer.observe(stage);
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();onLost();},{once:true});
 return {canvas,resize,dispose(){observer.disconnect();controls.dispose();geometry.dispose();material.dispose();renderer.dispose();}};
}
