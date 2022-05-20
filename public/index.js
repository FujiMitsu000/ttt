const routes = {
  '/': {
    importer: () => import('/src/autorization.js'),
    title: 'Вход | Tic Tac Toe',
    styleSheet: '/assets/css/autorization.css',
    script: ['src/autorization-form.js'],
  },
  '/statistics': {
    importer: () => import('/src/statistics.js'),
    title: 'Рейтинг | Tic Tac Toe',
    styleSheet: '/assets/css/statistics.css',
    script: ['src/menu-showMenu.js'],
  },
  '/history': {
    importer: () => import('/src/history.js'),
    title: 'История игр | Tic Tac Toe',
    styleSheet: '/assets/css/history.css',
    script: ['src/menu-showMenu.js'],
  },
  '/players': {
    importer: () => import('/src/players.js'),
    title: 'Список игроков | Tic Tac Toe',
    styleSheet: '/assets/css/players.css',
    script: ['src/menu-showMenu.js'],
  },
  '/404': {
    importer: () => import('/src/404.js'),
    title: 'Страница не найдена | Tic Tac Toe',
    styleSheet: '/assets/css/404.css',
    script: ['src/menu-showMenu.js'],
  },
  '/game': {
    importer: () => import('/src/game.js'),
    title: 'Tic Tac Toe',
    styleSheet: '/assets/css/game.css',
    script: ['src/gameLogic.js', 'src/menu-showMenu.js'],
  },
};

const handleRoute = async(location) => {
  const route = routes[location] || routes['/404'];
  const {importer, title, styleSheet} = route;
  if (!document.head.querySelector(`link[href="${styleSheet}"]`)) {
    const cssLink = document.createElement('link');

    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.href = styleSheet;

    document.head.append(cssLink);
  }

  document.querySelector('.container').innerHTML = '';
  document.head.querySelector('title').textContent = title;

  if (!route.pageLoader) {
    const {default: loader} = await importer();

    route.pageLoader = loader;
  }

  const {pageLoader} = route;
  const page = await pageLoader(async(newLocation) => {
    await handleRoute(newLocation);

    window.history.pushState({}, '', newLocation);
  });

  document.querySelector('.container').append(page);

  const scriptLink = document.createElement('script');
  const {script} = route;

  scriptLink.type = 'module';
  scriptLink.src = script[0];
  document.body.append(scriptLink);

  if (routes['/game']) {
    const scriptLink = document.createElement('script');
    const {script} = route;

    scriptLink.type = 'module';
    scriptLink.src = script[1];
    document.body.append(scriptLink);
  }
};

window.onload = async() => {
  window.addEventListener('popstate', async() => {
    await handleRoute(window.location.pathname);
  });

  await handleRoute(window.location.pathname);
};