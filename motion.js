(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Map();
  function animate(element, frames, options = {}) {
    running.get(element)?.cancel();
    if (reduced.matches) return null;
    const animation = element.animate(frames, {duration:360, easing:'cubic-bezier(.2,.7,.2,1)', ...options});
    running.set(element, animation);
    animation.finished.catch(() => {}).finally(() => {if(running.get(element)===animation)running.delete(element);});
    return animation;
  }
  window.psiMotion = animate;
  reduced.addEventListener('change', () => {if(reduced.matches){for(const animation of running.values())animation.finish();running.clear();}});
  const systems = [...document.querySelectorAll('[data-system]')];
  const desired = new Map(systems.map(el=>[el,el.open]));
  function settle(el, open) {
    el.open=open; el.style.height=''; el.style.overflow='';
    el.querySelector('.system-content').inert=!open;
    dispatchEvent(new Event('resize'));
  }
  function disclose(el, open, immediate=false) {
    desired.set(el,open);
    const start=el.getBoundingClientRect().height;
    running.get(el)?.cancel();
    el.open=true;el.style.height='';
    const end=open?el.getBoundingClientRect().height:el.querySelector('summary').getBoundingClientRect().height;
    el.querySelector('.system-content').inert=!open;
    if(immediate||reduced.matches){settle(el,open);return;}
    el.style.overflow='clip';
    const animation=animate(el,[{height:start+'px'},{height:end+'px'}]);
    animation.onfinish=()=>{if(desired.get(el)===open)settle(el,open);};
  }
  systems.forEach(el=>el.querySelector('summary').addEventListener('click',event=>{
    event.preventDefault();const open=!desired.get(el);
    if(open)systems.filter(other=>other!==el&&desired.get(other)).forEach(other=>disclose(other,false));
    disclose(el,open);
  }));
  const revealHash=()=>{
    let target;try{target=document.getElementById(decodeURIComponent(location.hash.slice(1)));}catch{return;}
    const owner=target?.closest('[data-system]');
    if(!owner)return;
    systems.filter(el=>el!==owner).forEach(el=>disclose(el,false,true));
    disclose(owner,true,true);
    requestAnimationFrame(()=>target.scrollIntoView({behavior:'instant',block:'start'}));
  };
  revealHash();addEventListener('hashchange',revealHash);addEventListener('pageshow',revealHash);
  document.querySelectorAll('[data-program-switch]').forEach(root=>{
    const controls=root.querySelector('[data-program-choices]');
    const panels=[...root.querySelectorAll('[data-program]')];
    controls.hidden=false;root.dataset.enhanced='true';
    const select=(id,motion=true)=>{
      for(const panel of panels){panel.hidden=panel.dataset.program!==id;if(!panel.hidden&&motion)animate(panel,[{opacity:.25,transform:'translateY(18px)'},{opacity:1,transform:'none'}]);}
      controls.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.programChoice===id)));
    };
    controls.addEventListener('click',event=>{const button=event.target.closest('button');if(button)select(button.dataset.programChoice);});
    select('pslv',false);
  });
})();
