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
  // site.css already declares this exact upstream font for DOM and canvas.
  fontReady=document.fonts.load('14px Pretendard').then(()=>document.fonts.ready).catch(error=>{fontReady=null;throw error;});
 }
 await fontReady;
 const response=await fetch(new URL('upstream/tests/index.json',base));
 if(!response.ok)throw Error('Results catalog unavailable');
 const catalog=await response.json();
 const controllers=[];
 try {
  controllers.push(await createController(root.querySelector('[data-results-detail]'),{page:'detail',testId:root.querySelector('[data-results-select]').value,rootPath:base},catalog));
 }catch(error){controllers.forEach(controller=>controller.dispose());throw error;}
 const select=root.querySelector('[data-results-select]');
 const fallback=root.querySelector('[data-results-fallback]');
 fallback.hidden=true;
 const change=()=>controllers[0].select(select.value);
 select.addEventListener('change',change);
 return ()=>{fallback.hidden=false;select.removeEventListener('change',change);controllers.forEach(controller=>controller.dispose());};
}
