const siteHeader = document.querySelector('[data-site-header]');
const siteFooter = document.querySelector('[data-site-footer]');

window.DRONATOR_TRANSLATIONS = {
  en: {
    language: 'Language',
    logoAlt: 'Dronator.cz - Drones come first',
    subscribers: 'subscribers',
    subscriberLabel: 'Channel subscribers',
    navigation: 'Main navigation',
    home: 'Home',
    videos: 'Videos',
    shorts: 'Shorts',
    latestVideos: 'Latest Videos',
    latestShorts: 'Latest Shorts',
    loadingVideos: 'Loading videos…',
    loadingShorts: 'Loading Shorts…',
    visitChannel: 'Visit the Dronator channel',
    videosError: 'Videos could not be loaded right now.',
    shortsError: 'Shorts could not be loaded right now.',
    opensOnYouTube: 'opens on YouTube',
    pageTitle: 'Dronator | Latest videos',
    pageDescription: 'The latest videos and Shorts from Dronator.',
    copyright: 'Copyright',
  },
  cs: {
    language: 'Jazyk',
    logoAlt: 'Dronator.cz - Dron na prvním místě',
    subscribers: 'odběratelů',
    subscriberLabel: 'Počet odběratelů kanálu',
    navigation: 'Hlavní navigace',
    home: 'Domů',
    videos: 'Videa',
    shorts: 'Shorts',
    latestVideos: 'Nejnovější videa',
    latestShorts: 'Nejnovější Shorts',
    loadingVideos: 'Načítání videí…',
    loadingShorts: 'Načítání Shorts…',
    visitChannel: 'Navštívit kanál Dronator',
    videosError: 'Videa se právě nepodařilo načíst.',
    shortsError: 'Shorts se právě nepodařilo načíst.',
    opensOnYouTube: 'otevře se na YouTube',
    pageTitle: 'Dronator | Nejnovější videa',
    pageDescription: 'Nejnovější videa a Shorts z kanálu Dronator.',
    copyright: 'Autorská práva',
  },
  pl: {
    language: 'Język',
    logoAlt: 'Dronator.cz - Drony na pierwszym miejscu',
    subscribers: 'subskrybentów',
    subscriberLabel: 'Liczba subskrybentów kanału',
    navigation: 'Nawigacja główna',
    home: 'Strona główna',
    videos: 'Filmy',
    shorts: 'Shorts',
    latestVideos: 'Najnowsze filmy',
    latestShorts: 'Najnowsze Shorts',
    loadingVideos: 'Ładowanie filmów…',
    loadingShorts: 'Ładowanie Shorts…',
    visitChannel: 'Odwiedź kanał Dronator',
    videosError: 'Nie udało się teraz załadować filmów.',
    shortsError: 'Nie udało się teraz załadować Shorts.',
    opensOnYouTube: 'otwiera się w YouTube',
    pageTitle: 'Dronator | Najnowsze filmy',
    pageDescription: 'Najnowsze filmy i Shorts z kanału Dronator.',
    copyright: 'Prawa autorskie',
  },
  de: {
    language: 'Sprache',
    logoAlt: 'Dronator.cz - Drohnen an erster Stelle',
    subscribers: 'Abonnenten',
    subscriberLabel: 'Kanal-Abonnenten',
    navigation: 'Hauptnavigation',
    home: 'Startseite',
    videos: 'Videos',
    shorts: 'Shorts',
    latestVideos: 'Neueste Videos',
    latestShorts: 'Neueste Shorts',
    loadingVideos: 'Videos werden geladen…',
    loadingShorts: 'Shorts werden geladen…',
    visitChannel: 'Dronator-Kanal besuchen',
    videosError: 'Videos konnten gerade nicht geladen werden.',
    shortsError: 'Shorts konnten gerade nicht geladen werden.',
    opensOnYouTube: 'wird auf YouTube geöffnet',
    pageTitle: 'Dronator | Neueste Videos',
    pageDescription: 'Die neuesten Videos und Shorts vom Dronator-Kanal.',
    copyright: 'Urheberrecht',
  },
  es: {
    language: 'Idioma',
    logoAlt: 'Dronator.cz - Los drones primero',
    subscribers: 'suscriptores',
    subscriberLabel: 'Suscriptores del canal',
    navigation: 'Navegación principal',
    home: 'Inicio',
    videos: 'Vídeos',
    shorts: 'Shorts',
    latestVideos: 'Últimos vídeos',
    latestShorts: 'Últimos Shorts',
    loadingVideos: 'Cargando vídeos…',
    loadingShorts: 'Cargando Shorts…',
    visitChannel: 'Visitar el canal de Dronator',
    videosError: 'No se pudieron cargar los vídeos.',
    shortsError: 'No se pudieron cargar los Shorts.',
    opensOnYouTube: 'se abre en YouTube',
    pageTitle: 'Dronator | Últimos vídeos',
    pageDescription: 'Los últimos vídeos y Shorts del canal Dronator.',
    copyright: 'Derechos de autor',
  },
  ru: {
    language: 'Язык',
    logoAlt: 'Dronator.cz - Дроны на первом месте',
    subscribers: 'подписчиков',
    subscriberLabel: 'Подписчики канала',
    navigation: 'Главная навигация',
    home: 'Главная',
    videos: 'Видео',
    shorts: 'Shorts',
    latestVideos: 'Последние видео',
    latestShorts: 'Последние Shorts',
    loadingVideos: 'Загрузка видео…',
    loadingShorts: 'Загрузка Shorts…',
    visitChannel: 'Перейти на канал Dronator',
    videosError: 'Не удалось загрузить видео.',
    shortsError: 'Не удалось загрузить Shorts.',
    opensOnYouTube: 'откроется на YouTube',
    pageTitle: 'Dronator | Последние видео',
    pageDescription: 'Последние видео и Shorts на канале Dronator.',
    copyright: 'Авторские права',
  },
};

if (siteHeader) {
  siteHeader.innerHTML = `
    <div class="site-header-inner">
      <div class="header-tools">
        <label class="language-control">
          <span data-i18n="language">Language</span>
          <select id="site-language" aria-label="Language">
            <option value="en">EN</option>
            <option value="cs">CS</option>
            <option value="pl">PL</option>
            <option value="de">DE</option>
            <option value="es">ES</option>
            <option value="ru">RU</option>
          </select>
        </label>
      </div>
      <a class="brand" href="index.html" aria-label="Dronator.cz - Drones come first">
        <img src="img/dronatorV3_white-1024x203.png" alt="Dronator.cz - Drones come first">
      </a>
      <p class="channel-subscribers" aria-label="Channel subscribers">
        <strong id="subscriber-count">1.18K</strong>
        <span data-i18n="subscribers">subscribers</span>
      </p>
      <nav class="site-nav" aria-label="Main navigation">
        <a href="index.html" data-nav="home" data-i18n="home">Home</a>
        <a href="index.html#latest-videos" data-nav="videos" data-i18n="videos">Videos</a>
        <a href="index.html#latest-shorts" data-nav="shorts" data-i18n="shorts">Shorts</a>
      </nav>
    </div>
  `;

  const subscriberCount = window.DRONATOR_SUBSCRIBERS;
  if (Number.isInteger(subscriberCount)) {
    siteHeader.querySelector('#subscriber-count').textContent = new Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(subscriberCount);
  }

  const currentPage = document.body.dataset.page || 'home';
  const activeLink = siteHeader.querySelector(`[data-nav="${currentPage}"]`);
  activeLink?.setAttribute('aria-current', 'page');
}

function setDronatorLanguage(language) {
  const selectedLanguage = window.DRONATOR_TRANSLATIONS[language] ? language : 'en';
  const copy = window.DRONATOR_TRANSLATIONS[selectedLanguage];
  window.DRONATOR_LANGUAGE = selectedLanguage;
  document.documentElement.lang = selectedLanguage;
  document.title = copy.pageTitle;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = copy.pageDescription;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const translation = copy[element.dataset.i18n];
    if (translation) element.textContent = translation;
  });

  if (siteHeader) {
    const logo = siteHeader.querySelector('.brand img');
    const logoLink = siteHeader.querySelector('.brand');
    const navigation = siteHeader.querySelector('.site-nav');
    const languageSelect = siteHeader.querySelector('#site-language');
    const subscriberCount = window.DRONATOR_SUBSCRIBERS;

    logo.alt = copy.logoAlt;
    logoLink.setAttribute('aria-label', copy.logoAlt);
    navigation.setAttribute('aria-label', copy.navigation);
    siteHeader.querySelector('.channel-subscribers').setAttribute('aria-label', copy.subscriberLabel);
    languageSelect.setAttribute('aria-label', copy.language);
    languageSelect.value = selectedLanguage;

    if (Number.isInteger(subscriberCount)) {
      siteHeader.querySelector('#subscriber-count').textContent = new Intl.NumberFormat(selectedLanguage === 'cs' ? 'cs-CZ' : 'en', {
        notation: 'compact',
        maximumFractionDigits: 2,
      }).format(subscriberCount);
    }
  }

  if (siteFooter) {
    const year = document.createElement('time');
    year.textContent = new Date().getFullYear();
    siteFooter.replaceChildren(
      document.createTextNode(`${copy.copyright} © `),
      year,
      document.createTextNode(' dronator.cz'),
    );
  }

  try {
    localStorage.setItem('dronator-language', selectedLanguage);
  } catch {}

  window.dispatchEvent(new CustomEvent('dronator:language-change'));
}

const languageSelect = siteHeader?.querySelector('#site-language');
let savedLanguage = 'en';
try {
  savedLanguage = localStorage.getItem('dronator-language') || 'en';
} catch {}

languageSelect?.addEventListener('change', () => setDronatorLanguage(languageSelect.value));
setDronatorLanguage(savedLanguage);