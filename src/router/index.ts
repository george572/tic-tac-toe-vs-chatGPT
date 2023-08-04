import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Base View',
      component: () => import('../views/BaseView.vue')
    },
    {
      path: '/play',
      name: 'Game View',
      component: () => import('../views/GameView.vue')
    }
  ]
});

export default router;
