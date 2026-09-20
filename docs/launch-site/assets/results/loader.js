(() => {
  const script = document.currentScript;
  for (const root of document.querySelectorAll('[data-test-results]')) {
    let dispose, attempt = 0;
    const retry = root.querySelector('[data-results-retry]');
    const status = root.querySelector('[data-results-status]');
    const load = async () => {
      retry.hidden = true;
      status.dataset.resultsStatus = 'loading';
      status.textContent = document.documentElement.lang === 'ko' ? '그래프를 불러오는 중입니다' : 'Loading charts';
      try {
        dispose?.();
        const module = await import(new URL('mount.mjs?attempt=' + (++attempt), script.src).href);
        dispose = await module.mountResults(root);
        status.dataset.resultsStatus = 'ready'; status.textContent = '';
      } catch (error) {
        status.dataset.resultsStatus = 'error';
        status.textContent = document.documentElement.lang === 'ko' ? '그래프를 불러오지 못했습니다. 위 표와 원자료 링크를 이용하거나 다시 시도하세요.' : 'Charts could not load. Use the table and source links above, or retry.';
        retry.hidden = false;
        console.error('Test-results panel:', error);
      }
    };
    retry.addEventListener('click', load);
    window.addEventListener('pagehide', () => dispose?.());
    window.addEventListener('pageshow', event => {if(event.persisted) load();});
    load();
  }
})();
