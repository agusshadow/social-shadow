import { createRouter, createWebHistory } from 'vue-router';
import { subscribeToAuth } from './services/auth.js'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import CommentContainer from './components/CommentContainer.vue'

const routes = [
  {
    path: '/registro',
    name: 'Register',
    component: Register
  },
  {
    path: '/iniciar-sesion',
    name: 'Login',
    component: Login
  },
  {
    path: '/publicaciones',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/comentarios/:postId',
    name: 'CommentContainer',
    component: CommentContainer,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

let authUser = {
  id: null,
  email: null,
}

subscribeToAuth(newUserData => authUser = newUserData);

const isUserLogged = () => {
  return localStorage.getItem('user') !== null;
}

router.beforeEach((to, from, next) => {
  if (authUser.id === null && to.meta.requiresAuth && !isUserLogged()) {
    next('/iniciar-sesion');
  } else if (to.matched.length === 0) {
    next(false);
  } else {
    next();
  }
});


export default router;