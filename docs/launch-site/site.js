(() => {
  'use strict';
  const ko = document.documentElement.lang === 'ko';
  const t = (en, kr) => ko ? kr : en;
  // Preserve old public entry points with same-directory, language-safe routes.
  const pageName=location.pathname.split('/').pop();
  const legacyDestination=()=>{
    if(pageName==='learning.html')return 'join.html#learning';
    if(pageName==='projects.html'&&['#avionics','#tms'].includes(location.hash))return location.hash.slice(1)+'.html';
    if(pageName==='news.html'&&location.hash==='#tests')return 'records.html#tests';
    if(pageName==='research.html'&&(location.hash==='#research-archive'||[...document.querySelectorAll('[data-archive-compatibility] a')].some(a=>a.hash===location.hash)))return 'records.html'+location.hash;
  };
  const forwardLegacy=()=>{const destination=legacyDestination();if(destination)location.replace(destination);};
  forwardLegacy();
  addEventListener('hashchange',forwardLegacy);
  const trialSelect=document.querySelector('[data-results-select]');
  const requestedTrial=new URLSearchParams(location.search).get('test');
  if(trialSelect&&[...trialSelect.options].some(option=>option.value===requestedTrial))trialSelect.value=requestedTrial;
  const languageLink=document.querySelector('[data-language-link]');
  if(languageLink){const destination=languageLink.getAttribute('href');const updateLanguage=()=>{languageLink.setAttribute('href',destination+location.search+location.hash);};updateLanguage();addEventListener('hashchange',updateLanguage);}
  const themeButton = document.querySelector('[data-theme-toggle]');
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  let theme = 'system';
  try { theme = localStorage.getItem('psi-theme') || 'system'; } catch {}
  if (!['light', 'dark', 'system'].includes(theme)) theme = 'system';
  const applyTheme = () => {
    const resolved = theme === 'system' ? (systemTheme.matches ? 'dark' : 'light') : theme;
    document.documentElement.dataset.themeChoice = theme;
    document.documentElement.dataset.theme = resolved;
    const chrome = document.querySelector('meta[name="theme-color"]');
    if (chrome) chrome.content = resolved === 'dark' ? '#000000' : '#FFFFFF';
    if (themeButton) {
      themeButton.hidden = false;
      themeButton.setAttribute('aria-pressed', String(resolved === 'dark'));
      themeButton.setAttribute('aria-label', t('Dark mode', '다크 모드'));
      themeButton.title = resolved === 'dark' ? t('Switch to light mode', '라이트 모드로 전환') : t('Switch to dark mode', '다크 모드로 전환');
    }
  };
  applyTheme();
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('psi-theme', theme); } catch {}
      applyTheme();
    });
  }
  systemTheme.addEventListener('change', applyTheme);

  // One photographic scene follows the reader. It never hides or gates content.
  const scene = document.querySelector('[data-rocket-scene]');
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  if (scene) {
    const portrait = scene.querySelector('[data-rocket-motion]');
    const wide = matchMedia('(min-width: 901px)');
    let inView = false, frame = 0;
    const update = () => {
      frame = 0;
      if (motionPreference.matches || !wide.matches) { portrait.style.removeProperty('--scene-shift'); return; }
      const box = scene.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - box.top) / (innerHeight + box.height)));
      portrait.style.setProperty('--scene-shift', `${(1 - progress * 2) * 42}px`);
    };
    const schedule = () => { if (inView && !frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; if (inView) schedule(); }, {rootMargin:'120px'});
    observer.observe(scene);
    addEventListener('scroll', schedule, {passive:true});
    addEventListener('resize', schedule, {passive:true});
    motionPreference.addEventListener('change', update);
    wide.addEventListener('change', update);
  }

  const menu = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('#site-navigation');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const menuBreakpoint = matchMedia('(max-width: 1100px)');
  const setMenu = (open, restoreFocus = false) => {
    if (!menu || !navigation) return;
    menu.setAttribute('aria-expanded', String(open));
    menu.querySelector('[data-menu-label]').textContent = open ? t('Close', '닫기') : t('Menu', '메뉴');
    navigation.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (main) main.inert = open;
    if (footer) footer.inert = open;
    if (restoreFocus) menu.focus();
  };
  menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  navigation?.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  menuBreakpoint.addEventListener('change', () => setMenu(false));
  window.addEventListener('pageshow', () => setMenu(false));

  function tabKeyboard(buttons, currentOrientation) {
    buttons.forEach((button, index) => button.addEventListener('keydown', event => {
      const vertical = currentOrientation ? currentOrientation() : button.closest('[role="tablist"]')?.getAttribute('aria-orientation') === 'vertical';
      let next;
      if (event.key === 'ArrowRight' || (vertical && event.key === 'ArrowDown')) next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft' || (vertical && event.key === 'ArrowUp')) next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next !== undefined) { event.preventDefault(); buttons[next].focus(); buttons[next].click(); }
    }));
  }

  document.querySelectorAll('[data-activity-selector]').forEach(selector => {
    const tablist = selector.querySelector('[data-activity-tabs]');
    const tabs = [...selector.querySelectorAll('[data-activity]')];
    const panels = [...selector.querySelectorAll('[data-activity-panel]')];
    const select = tab => {
      tabs.forEach(other => {
        const selected = other === tab;
        other.setAttribute('aria-selected', String(selected));
        other.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.activityPanel !== tab.dataset.activity; });
    };
    panels.forEach(panel => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `activity-tab-${panel.dataset.activityPanel}`);
      panel.tabIndex = 0;
    });
    tabs.forEach(tab => tab.addEventListener('click', () => {
      const changed = tab.getAttribute('aria-selected') !== 'true';
      select(tab);
      const active = panels.find(panel => !panel.hidden);
      if (changed && !motionPreference.matches) {
        active.getAnimations().forEach(animation => animation.cancel());
        active.animate([{opacity:.4,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}], {duration:320,easing:'cubic-bezier(.22,1,.36,1)'});
      }
    }));
    select(tabs[0]);
    tablist.hidden = false;
    const compact = matchMedia('(max-width: 650px)');
    const setOrientation = () => {
      const vertical = !compact.matches;
      tablist.setAttribute('aria-orientation', vertical ? 'vertical' : 'horizontal');
      return vertical;
    };
    setOrientation();
    compact.addEventListener('change', setOrientation);
    // Media-query change delivery can follow a key immediately after resize.
    tabKeyboard(tabs, setOrientation);
  });

  const dialog = document.querySelector('#photo-dialog');
  if (dialog) {
    const photos = [...document.querySelectorAll('[data-gallery-open]')];
    let picture = dialog.querySelector('[data-gallery-image]');
    const loading = dialog.querySelector('[data-gallery-loading]');
    const caption = dialog.querySelector('[data-gallery-caption]');
    const count = dialog.querySelector('[data-gallery-count]');
    const previous = dialog.querySelector('[data-gallery-prev]');
    const next = dialog.querySelector('[data-gallery-next]');
    const close = dialog.querySelector('[data-gallery-close]');
    const error = dialog.querySelector('[data-gallery-error]');
    let album = [], index = 0, opener, photoVersion = 0;
    const showPhoto = () => {
      const anchor = album[index];
      const version = ++photoVersion;
      const replacement = picture.cloneNode(false);
      replacement.removeAttribute('src');
      picture.replaceWith(replacement);
      picture = replacement;
      picture.alt = anchor.querySelector('img').alt;
      caption.textContent = anchor.closest('figure').querySelector('figcaption').textContent;
      count.textContent = `${index + 1} / ${album.length}`;
      previous.disabled = next.disabled = album.length < 2;
      error.hidden = true;
      picture.hidden = true;
      loading.textContent = t('Loading photograph…', '사진을 불러오는 중…');
      loading.hidden = false;
      const finish = failed => {
        if (version !== photoVersion) return;
        loading.hidden = true;
        loading.textContent = '';
        error.hidden = !failed;
        picture.hidden = failed;
      };
      picture.addEventListener('load', () => finish(false), {once:true});
      picture.addEventListener('error', () => finish(true), {once:true});
      picture.src = anchor.href;
    };
    const step = direction => { index = (index + direction + album.length) % album.length; showPhoto(); };
    photos.forEach(anchor => anchor.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      setMenu(false);
      opener = anchor;
      album = photos.filter(photo => photo.dataset.event === anchor.dataset.event);
      index = album.indexOf(anchor);
      dialog.querySelector('h2').textContent = anchor.closest('[data-gallery-event]').querySelector('h2').textContent;
      showPhoto();
      document.body.classList.add('dialog-open');
      dialog.showModal();
      close.focus();
    }));
    close.addEventListener('click', () => dialog.close());
    previous.addEventListener('click', () => step(-1));
    next.addEventListener('click', () => step(1));
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
      photoVersion += 1;
      loading.hidden = true;
      loading.textContent = '';
      document.body.classList.remove('dialog-open');
      if (opener?.isConnected) opener.focus({preventScroll:true});
    });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1); }
      if (event.key === 'Tab') {
        const buttons = [...dialog.querySelectorAll('button:not(:disabled)')];
        const first = buttons[0], last = buttons.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
  }

  document.querySelectorAll('[data-media-stage]').forEach(stage => {
    const video = stage.querySelector('[data-flight-video]');
    const play = stage.querySelector('[data-media-play]');
    const playLabel = stage.querySelector('[data-play-label]');
    const description = stage.querySelector('[data-media-description]');
    const failure = stage.querySelector('[data-media-failure]');
    const tabs = [...stage.querySelectorAll('[data-media]')];
    const panel = stage.querySelector('.media-screen');
    const asset = stage.dataset.assetBase;
    const background = stage.hasAttribute('data-background-pad');
    const motion = stage.querySelector('[data-motion-toggle]');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    let mode = background ? 'background' : 'manual';
    let userPaused = false;
    let autoplayBlocked = false;
    let explicitlyResumed = false;
    let visible = false;
    let pending = false;
    let started = false;
    let current = 'pad';
    let selectionVersion = 0;
    const views = {
      pad: {
        file: 'launch.mp4', poster: 'launch-poster.webp',
        label: t('PSI launch-pad footage', 'PSI 발사대 영상'),
        action: t('Watch the launch', '발사 영상 보기'),
        description: t('The rocket lifts off from the stand, leaving smoke at the pad. Original field sound plays with the video.', '발사대에 서 있던 로켓이 이륙하고 연기가 남습니다. 현장 소리가 영상과 함께 재생됩니다.')
      },
      onboard: {
        file: 'onboard.mp4', poster: 'onboard-poster.webp',
        label: t('PSI onboard footage with rapid camera rotation', '빠른 카메라 회전이 포함된 PSI 탑재 영상'),
        action: t('Watch onboard footage', '탑재 영상 보기'),
        description: t('Onboard view of takeoff, a rapidly rotating aerial view, then ground and grass. Contains rapid camera rotation; playback begins only when you choose to play.', '이륙 후 항공 시점이 빠르게 회전하고, 이어 지면과 풀이 보입니다. 빠른 카메라 회전이 포함되어 있으며 재생 버튼을 눌러야 시작합니다.')
      }
    };
    const render = () => {
      video.controls = mode === 'manual' && started;
      video.loop = mode === 'background';
      video.tabIndex = video.controls ? 0 : -1;
      // Preserve the keyboard position before CSS or hidden removes the overlay.
      if (video.controls && document.activeElement === play) video.focus({preventScroll: true});
      stage.dataset.playing = String(!video.paused);
      stage.dataset.started = String(mode === 'manual' && started);
      stage.dataset.mediaMode = mode;
      play.hidden = mode === 'manual' && started;
      const action = mode === 'background' ? t('Watch with sound', '소리와 함께 보기') : views[current].action;
      playLabel.textContent = action;
      play.setAttribute('aria-label', action);
      if (motion) {
        motion.hidden = mode !== 'background';
        motion.dataset.paused = String(video.paused);
        motion.querySelector('[data-motion-label]').textContent = video.paused ? t('Resume background', '배경 영상 재생') : t('Pause background', '배경 영상 정지');
        motion.setAttribute('aria-label', video.paused ? t('Play muted background film', '무음 배경 영상 재생') : t('Pause background film', '배경 영상 멈춤'));
        motion.title = motion.getAttribute('aria-label');
      }
      play.title = action;
      description.textContent = mode === 'background'
        ? t('The rocket lifts off from the stand. Background film is muted; choose “Watch with sound” for the full film and original field sound.', '발사대에서 로켓이 이륙합니다. 배경 영상은 무음입니다. 현장 소리와 전체 영상은 “소리와 함께 보기”로 재생하세요.')
        : views[current].description;
    };
    const eligible = () => mode === 'background' && current === 'pad' && visible && !document.hidden
      && !document.body.classList.contains('menu-open') && !document.body.classList.contains('dialog-open')
      && !userPaused && !autoplayBlocked && (explicitlyResumed || (!reduced.matches && !connection?.saveData));
    const reconcile = async () => {
      if (mode !== 'background') return;
      if (!eligible()) { video.pause(); render(); return; }
      if (!video.paused || pending) return;
      const attempt = selectionVersion;
      pending = true;
      video.muted = true;
      try {
        await video.play();
        if (attempt === selectionVersion && mode === 'background' && !eligible()) video.pause();
      } catch (error) {
        if (attempt === selectionVersion && error.name !== 'AbortError') autoplayBlocked = true;
      } finally {
        if (attempt === selectionVersion) { pending = false; render(); }
      }
    };
    stage.dataset.view = current;
    if (background) video.muted = true;
    render();
    tabs.forEach(tab => tab.addEventListener('click', () => {
      if (tab.dataset.media === current) return;
      selectionVersion += 1;
      pending = false;
      video.pause();
      current = tab.dataset.media;
      // A viewpoint change is intentional navigation, never a request to start a clip.
      mode = 'manual';
      video.loop = false;
      video.muted = false;
      const view = views[current];
      tabs.forEach(other => {
        const selected = other === tab;
        other.setAttribute('aria-selected', String(selected));
        other.tabIndex = selected ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', tab.id);
      stage.dataset.view = current;
      stage.classList.toggle('is-onboard', current === 'onboard');
      video.src = `${asset}${view.file}`;
      video.poster = `${asset}${view.poster}`;
      video.setAttribute('aria-label', view.label);
      description.textContent = view.description;
      failure.hidden = true;
      failure.querySelector('a').href = `${asset}${view.file}`;
      failure.querySelector('a').textContent = t('Open this video file', '이 영상 파일 열기');
      video.load();
      started = false;
      playLabel.textContent = view.action;
      play.setAttribute('aria-label', view.action);
      render();
    }));
    tabKeyboard(tabs);
    play.addEventListener('click', async () => {
      selectionVersion += 1;
      pending = false;
      mode = 'manual';
      video.loop = false;
      video.muted = false;
      if (background && current === 'pad') video.currentTime = 0;
      const attempt = selectionVersion;
      try {
        if (video.ended) video.currentTime = 0;
        await video.play();
        if (attempt === selectionVersion) { started = true; render(); }
      } catch (error) {
        if (attempt === selectionVersion && error.name !== 'AbortError') { failure.hidden = false; render(); }
      }
    });
    video.addEventListener('play', () => {
      if (mode === 'manual') started = true;
      else if (!eligible()) video.pause();
      failure.hidden = true;
      render();
    });
    video.addEventListener('pause', render);
    video.addEventListener('ended', render);
    video.addEventListener('error', () => { failure.hidden = false; autoplayBlocked = true; render(); });
    if (background) {
      motion.addEventListener('click', () => {
        if (!video.paused) { userPaused = true; video.pause(); }
        else { userPaused = false; autoplayBlocked = false; explicitlyResumed = true; reconcile(); }
        render();
      });
      const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; reconcile(); }, {threshold:.15});
      observer.observe(video);
      document.addEventListener('visibilitychange', reconcile);
      const preferenceChanged = () => { explicitlyResumed = false; reconcile(); };
      reduced.addEventListener('change', preferenceChanged);
      connection?.addEventListener?.('change', preferenceChanged);
      new MutationObserver(reconcile).observe(document.body,{attributes:true,attributeFilter:['class']});
    }
  });

  document.querySelectorAll('[data-hardware-explorer]').forEach(explorer => {
    const tabs = [...explorer.querySelectorAll('[data-hardware]')];
    const panels = [...explorer.querySelectorAll('[data-hardware-panel]')];
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(other => {
        const selected = other === tab;
        other.setAttribute('aria-selected', String(selected));
        other.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.hardwarePanel !== tab.dataset.hardware; });
    }));
    tabKeyboard(tabs);
  });

  const archive = document.querySelector('[data-research-archive]');
  if (archive) {
    const topic = archive.querySelector('[data-filter-topic]');
    const type = archive.querySelector('[data-filter-type]');
    const search = archive.querySelector('[data-filter-search]');
    const records = [...archive.querySelectorAll('[data-research-item]')];
    const count = archive.querySelector('[data-result-count]');
    const empty = archive.querySelector('[data-no-results]');
    const filter = () => {
      const query = search.value.toLocaleLowerCase().trim();
      let visible = 0;
      records.forEach(record => {
        const match = (topic.value === 'all' || record.dataset.topic === topic.value)
          && (type.value === 'all' || record.dataset.type === type.value)
          && (!query || record.dataset.search.includes(query));
        record.hidden = !match;
        if (match) visible += 1;
      });
      count.textContent = t(`${visible} of ${records.length} records`, `${records.length}개 중 ${visible}개 기록`);
      empty.hidden = visible !== 0;
    };
    topic.addEventListener('change', filter);
    type.addEventListener('change', filter);
    search.addEventListener('input', filter);
    archive.querySelector('form').addEventListener('submit', event => event.preventDefault());
    archive.querySelector('form').addEventListener('reset', event => {
      event.preventDefault(); topic.value = 'all'; type.value = 'all'; search.value = ''; filter();
    });
    filter();
  }
})();
