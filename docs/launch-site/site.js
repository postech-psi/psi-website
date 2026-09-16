(() => {
  'use strict';
  const ko = document.documentElement.lang === 'ko';
  const t = (en, kr) => ko ? kr : en;
  const themeSelect = document.querySelector('[data-theme-select]');
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  let theme = 'system';
  try { theme = localStorage.getItem('psi-theme') || 'system'; } catch {}
  if (!['light', 'dark', 'system'].includes(theme)) theme = 'system';
  const applyTheme = () => { document.documentElement.dataset.theme = theme === 'system' ? (systemTheme.matches ? 'dark' : 'light') : theme; };
  applyTheme();
  if (themeSelect) {
    themeSelect.value = theme;
    themeSelect.addEventListener('change', () => {
      theme = themeSelect.value;
      try { localStorage.setItem('psi-theme', theme); } catch {}
      applyTheme();
    });
  }
  systemTheme.addEventListener('change', applyTheme);

  const menu = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('#site-navigation');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const menuBreakpoint = matchMedia('(max-width: 900px)');
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

  function tabKeyboard(buttons) {
    buttons.forEach((button, index) => button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next !== undefined) { event.preventDefault(); buttons[next].focus(); buttons[next].click(); }
    }));
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
    const setPlaying = playing => {
      stage.dataset.playing = String(playing);
      play.hidden = playing;
      if (!playing && video.currentTime > 0 && !video.ended) {
        playLabel.textContent = t('Resume video', '영상 계속 보기');
        play.setAttribute('aria-label', t('Resume video', '영상 계속 보기'));
      }
    };
    stage.dataset.view = current;
    stage.dataset.playing = 'false';
    description.textContent = views.pad.description;
    tabs.forEach(tab => tab.addEventListener('click', () => {
      if (tab.dataset.media === current) return;
      selectionVersion += 1;
      video.pause();
      current = tab.dataset.media;
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
      playLabel.textContent = view.action;
      play.setAttribute('aria-label', view.action);
      setPlaying(false);
    }));
    tabKeyboard(tabs);
    play.addEventListener('click', async () => {
      const attempt = selectionVersion;
      try {
        if (video.ended) video.currentTime = 0;
        await video.play();
      } catch (error) {
        if (attempt === selectionVersion && error.name !== 'AbortError') failure.hidden = false;
      }
    });
    video.addEventListener('play', () => { setPlaying(true); failure.hidden = true; });
    video.addEventListener('pause', () => setPlaying(false));
    video.addEventListener('ended', () => {
      setPlaying(false);
      playLabel.textContent = t('Replay video', '다시 보기');
      play.setAttribute('aria-label', t('Replay video', '다시 보기'));
    });
    video.addEventListener('error', () => { failure.hidden = false; setPlaying(false); });
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
