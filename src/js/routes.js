import HomePage from '../pages/home.vue';
import NotFoundPage from '../pages/404.vue';
import SettingsPage from '../pages/settings.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/settings',
    component: SettingsPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
