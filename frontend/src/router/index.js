import { createRouter, createWebHistory } from 'vue-router'
import { MyStore } from '../stores/index.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      beforeEnter: async (to, from, next) => {
        const store = MyStore();
        const success = await store.fetchProfile();
        if (success) {
          next();
        } else {
          next({ name: 'login' });
        }
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/RegView.vue'),
      
    },
    {
      path: '/clocks',
      name: 'clock',
      component: () => import('../views/ClockView.vue'),
      
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = MyStore();

  const token = localStorage.getItem('token');

  if (!token && to.name !== 'login' && to.name !== 'registration' && to.name !== 'about') {
    next({ name: 'login' });
    return;
  }
  else if(!token && (to.name === 'login' ||  to.name === 'registration' || to.name === 'about')){
    next(); 
    return;
  }
  else if(token && (to.name === 'login' ||  to.name === 'registration'))
  {
    next({name: 'profile'}); 
    return;
  }

  const success = await store.autoLogin();

  if (success) {
    next();
  } else {
    next({ name: 'login' });
  }
})
export default router
