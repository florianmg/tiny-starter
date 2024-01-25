export const pages = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  profile: '/profile',
  pricing: '/pricing',
  faq: '/faq',
  settings: '/dashboard/settings',
};

export const publicNavigation = [
  {
    label: 'home',
    path: pages.home,
  },
  {
    label: 'pricing',
    path: pages.pricing,
  },
  {
    label: 'faq',
    path: pages.faq,
  },
];

export const dashboardNavigation = [
  {
    label: 'dashboard',
    path: pages.dashboard,
  },
  {
    label: 'settings',
    path: pages.settings,
  },
];
