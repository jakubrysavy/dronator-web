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
    about: 'About me',
    aboutHeading: 'About me',
    aboutName: 'Jakub, dronator.cz',
    aboutPhotoAlt: 'Portrait of Jakub',
    aboutText: '“My name is Jakub. I have been a DJI drone pilot since 2024. I hold a remote pilot competency certificate for the A2 subcategory of the Open category, issued by the Civil Aviation Authority of the Czech Republic. Drones fascinated me before that, and since 2024 I have felt like a full-fledged member of the drone community. I fly in accordance with applicable laws, with the consent of the people concerned and, when needed, with permission from landowners. I edit my videos and music using freely available tools.”',
    contact: 'Contact',
    contactHeading: 'Contact',
    contactText: 'Have a question, a collaboration proposal, or are you interested in using my footage? Email me at',
    latestVideos: 'Latest Videos',
    latestShorts: 'Latest Shorts',
    loadingVideos: 'Loading videos…',
    loadingShorts: 'Loading Shorts…',
    visitChannel: 'Visit the Dronator channel',
    videosError: 'Videos could not be loaded right now.',
    shortsError: 'Shorts could not be loaded right now.',
    opensOnYouTube: 'opens on YouTube',
    pageTitle: 'Dronator.cz - Drones come first',
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
    about: 'O mně',
    aboutHeading: 'O mně',
    aboutName: 'Jakub, dronator.cz',
    aboutPhotoAlt: 'Portrét Jakuba',
    aboutText: '„Jmenuji se Jakub. Od roku 2024 jsem pilotem dronů DJI. Mám osvědčení dálkově řídícího pilota pro podkategorii A2 otevřené kategorie, které vydal Úřad pro civilní letectví České republiky. Drony mě fascinovaly už dříve a od roku 2024 se cítím jako plnohodnotný člen komunity dronařů. Létám v souladu s platnými právními předpisy, se souhlasem dotčených osob a v případě potřeby i s povolením majitelů pozemků. Videa a hudbu střihám ve volně dostupných nástrojích.“',
    contact: 'Kontakt',
    contactHeading: 'Kontakt',
    contactText: 'Máte dotaz, nabídku spolupráce nebo zájem o využití záběrů? Napište mi na',
    latestVideos: 'Nejnovější videa',
    latestShorts: 'Nejnovější Shorts',
    loadingVideos: 'Načítání videí…',
    loadingShorts: 'Načítání Shorts…',
    visitChannel: 'Navštívit kanál Dronator',
    videosError: 'Videa se právě nepodařilo načíst.',
    shortsError: 'Shorts se právě nepodařilo načíst.',
    opensOnYouTube: 'otevře se na YouTube',
    pageTitle: 'Dronator.cz - Dron na prvním místě',
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
    about: 'O mnie',
    aboutHeading: 'O mnie',
    aboutName: 'Jakub, dronator.cz',
    aboutPhotoAlt: 'Portret Jakuba',
    aboutText: '„Nazywam się Jakub. Od 2024 roku jestem pilotem dronów DJI. Posiadam certyfikat kompetencji pilota zdalnego sterowania w podkategorii A2 kategorii otwartej, wydany przez Urząd Lotnictwa Cywilnego Republiki Czeskiej. Drony fascynowały mnie już wcześniej, a od 2024 roku czuję się pełnoprawnym członkiem społeczności droniarzy. Lataję zgodnie z obowiązującymi przepisami prawa, za zgodą osób, których to dotyczy, a w razie potrzeby także za zgodą właścicieli gruntów. Montuję filmy i dodaję muzykę za pomocą ogólnodostępnych narzędzi.”',
    contact: 'Kontakt',
    contactHeading: 'Kontakt',
    contactText: 'Masz pytanie, propozycję współpracy lub chcesz wykorzystać moje ujęcia? Napisz do mnie na',
    latestVideos: 'Najnowsze filmy',
    latestShorts: 'Najnowsze Shorts',
    loadingVideos: 'Ładowanie filmów…',
    loadingShorts: 'Ładowanie Shorts…',
    visitChannel: 'Odwiedź kanał Dronator',
    videosError: 'Nie udało się teraz załadować filmów.',
    shortsError: 'Nie udało się teraz załadować Shorts.',
    opensOnYouTube: 'otwiera się w YouTube',
    pageTitle: 'Dronator.cz - Drony na pierwszym miejscu',
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
    about: 'Über mich',
    aboutHeading: 'Über mich',
    aboutName: 'Jakub, dronator.cz',
    aboutPhotoAlt: 'Porträt von Jakub',
    aboutText: '„Ich heiße Jakub. Seit 2024 bin ich DJI-Drohnenpilot. Ich besitze den Fernpiloten-Kompetenznachweis für die Unterkategorie A2 der offenen Kategorie, ausgestellt von der Zivilluftfahrtbehörde der Tschechischen Republik. Drohnen haben mich schon zuvor fasziniert, und seit 2024 fühle ich mich als vollwertiges Mitglied der Drohnen-Community. Ich fliege im Einklang mit den geltenden Rechtsvorschriften, mit Zustimmung der betroffenen Personen und bei Bedarf auch mit Genehmigung der Grundstückseigentümer. Meine Videos und die Musik schneide ich mit frei verfügbaren Tools.“',
    contact: 'Kontakt',
    contactHeading: 'Kontakt',
    contactText: 'Haben Sie eine Frage, einen Kooperationsvorschlag oder Interesse an der Nutzung meiner Aufnahmen? Schreiben Sie mir an',
    latestVideos: 'Neueste Videos',
    latestShorts: 'Neueste Shorts',
    loadingVideos: 'Videos werden geladen…',
    loadingShorts: 'Shorts werden geladen…',
    visitChannel: 'Dronator-Kanal besuchen',
    videosError: 'Videos konnten gerade nicht geladen werden.',
    shortsError: 'Shorts konnten gerade nicht geladen werden.',
    opensOnYouTube: 'wird auf YouTube geöffnet',
    pageTitle: 'Dronator.cz - Drohnen an erster Stelle',
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
    about: 'Sobre mí',
    aboutHeading: 'Sobre mí',
    aboutName: 'Jakub, dronator.cz',
    aboutPhotoAlt: 'Retrato de Jakub',
    aboutText: '«Me llamo Jakub. Desde 2024 soy piloto de drones DJI. Tengo el certificado de competencia de piloto a distancia para la subcategoría A2 de la categoría abierta, expedido por la Autoridad de Aviación Civil de la República Checa. Los drones ya me fascinaban antes y, desde 2024, me siento miembro de pleno derecho de la comunidad de pilotos de drones. Vuelo de acuerdo con la legislación vigente, con el consentimiento de las personas afectadas y, cuando es necesario, también con el permiso de los propietarios de los terrenos. Edito mis vídeos y la música con herramientas de libre acceso.»',
    contact: 'Contacto',
    contactHeading: 'Contacto',
    contactText: '¿Tienes alguna pregunta, una propuesta de colaboración o te interesa utilizar mis tomas? Escríbeme a',
    latestVideos: 'Últimos vídeos',
    latestShorts: 'Últimos Shorts',
    loadingVideos: 'Cargando vídeos…',
    loadingShorts: 'Cargando Shorts…',
    visitChannel: 'Visitar el canal de Dronator',
    videosError: 'No se pudieron cargar los vídeos.',
    shortsError: 'No se pudieron cargar los Shorts.',
    opensOnYouTube: 'se abre en YouTube',
    pageTitle: 'Dronator.cz - Los drones primero',
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
    about: 'Обо мне',
    aboutHeading: 'Обо мне',
    aboutName: 'Jakub, dronator.cz',
    aboutPhotoAlt: 'Портрет Якуба',
    aboutText: '«Меня зовут Якуб. С 2024 года я пилот дронов DJI. У меня есть сертификат компетентности дистанционного пилота для подкатегории A2 открытой категории, выданный Управлением гражданской авиации Чешской Республики. Дроны увлекали меня и раньше, а с 2024 года я чувствую себя полноценным участником сообщества пилотов дронов. Я летаю в соответствии с действующим законодательством, с согласия затронутых лиц и, при необходимости, с разрешения владельцев земельных участков. Видео и музыку я монтирую с помощью свободно доступных инструментов.»',
    contact: 'Контакты',
    contactHeading: 'Контакты',
    contactText: 'Есть вопрос, предложение о сотрудничестве или хотите использовать мои кадры? Напишите мне на',
    latestVideos: 'Последние видео',
    latestShorts: 'Последние Shorts',
    loadingVideos: 'Загрузка видео…',
    loadingShorts: 'Загрузка Shorts…',
    visitChannel: 'Перейти на канал Dronator',
    videosError: 'Не удалось загрузить видео.',
    shortsError: 'Не удалось загрузить Shorts.',
    opensOnYouTube: 'откроется на YouTube',
    pageTitle: 'Dronator.cz - Дроны на первом месте',
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
        <a href="index.html#latest-videos" data-nav="videos" data-i18n="videos">Videos</a>
        <a href="index.html#latest-shorts" data-nav="shorts" data-i18n="shorts">Shorts</a>
        <a href="index.html#about-me" data-nav="about" data-i18n="about">About me</a>
        <a href="index.html#contact" data-nav="contact" data-i18n="contact">Contact</a>
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

  document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
    const translation = copy[element.dataset.i18nAlt];
    if (translation) element.alt = translation;
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