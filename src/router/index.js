import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
  },
  {
    path: '/ecommerce',
    name: 'Ecommerce',
    component: () => import('../views/EcommerceView.vue'),
  },
  {
    path: '/to-do',
    name: 'To-do',
    component: () => import('../views/TodosView.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/CalendarView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;