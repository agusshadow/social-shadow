import { createRouter, createWebHistory } from 'vue-router';
import { subscribeToAuth, logout } from './services/auth.js'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import CommentContainer from './views/CommentContainer.vue'
import CreatePost from './views/CreatePost.vue'
import UserProfile from './views/UserProfile.vue'
import ChangePassword from './views/ChangePassword.vue'

const routes = [
  {
    path: '/',
    redirect: '/iniciar-sesion'
  },
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
    path: '/crear-publicacion',
    name: 'CreatePost',
    component: CreatePost,
    meta: { requiresAuth: true }
  },
  {
    path: '/comentarios/:postId',
    name: 'CommentContainer',
    component: CommentContainer,
    meta: { requiresAuth: true }
  },
  {
    path: '/perfil/:userId',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/cambiar-contraseña',
    name: 'ChangePassword',
    component: ChangePassword,
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

router.beforeEach(async (to, from, next) => {
  if ((to.path === '/iniciar-sesion' || to.path === '/registro') && isUserLogged()) {
    await logout();
    next();
  } else if (authUser.id === null && to.meta.requiresAuth && !isUserLogged()) {
    next('/iniciar-sesion');
  } else if (to.matched.length === 0) {
    next(false);
  } else {
    next();
  }
});


export default router;