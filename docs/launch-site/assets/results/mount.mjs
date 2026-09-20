const {createController} = await import('./controller.mjs' + new URL(import.meta.url).search);
const loadedScripts=new Map();
function script(url){
 if(!loadedScripts.has(url))loadedScripts.set(url,new Promise((resolve,reject)=>{const tag=document.createElement('script');tag.src=url;tag.onload=resolve;tag.onerror=()=>{loadedScripts.delete(url);tag.remove();reject(Error('Dependency unavailable'));};document.head.append(tag);}));
 return loadedScripts.get(url);
}
let fontReady;
export async function mountResults(root){
 const base=new URL(root.dataset.resultsBase,document.baseURI).href;
 await script(new URL('upstream/assets/vendor/echarts.min.js',base).href);
 await script(new URL('charts.js',base).href);
 if(!fontReady){
  const face=new FontFace('Pretendard',`url("${new URL('upstream/assets/fonts/PretendardVariable.woff2',base).href}")`,{weight:'45 920'});
  fontReady=face.load().then(font=>{document.fonts.add(font);return document.fonts.ready;}).catch(error=>{fontReady=null;throw error;});
 }
 await fontReady;
 const response=await fetch(new URL('upstream/tests/index.json',base));
 if(!response.ok)throw Error('Results catalog unavailable');
 const catalog=await response.json();
 const controllers=[];
 try {
  controllers.push(await createController(root.querySelector('[data-results-comparison]'),{page:'home',rootPath:base},catalog));
  controllers.push(await createController(root.querySelector('[data-results-detail]'),{page:'detail',testId:root.querySelector('[data-results-select]').value,rootPath:base},catalog));
 }catch(error){controllers.forEach(controller=>controller.dispose());throw error;}
 const select=root.querySelector('[data-results-select]');
 const change=()=>controllers[1].select(select.value);
 select.addEventListener('change',change);
 return ()=>{select.removeEventListener('change',change);controllers.forEach(controller=>controller.dispose());};
}
