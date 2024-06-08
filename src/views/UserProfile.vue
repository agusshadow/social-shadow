<script>

import Loader from '../components/Loader.vue'
import Post from '../components/Post.vue'
import GoBack from '../components/GoBack.vue'
import { subscribeToAuth, logout } from '../services/auth.js'
import { subscribeToPostsByUserId } from '../services/post.js'
import { formatDateUtil } from '../utils/formatDate.js'
import { getUserProfileById } from '../services/user-profile.js'
import { BIconPersonCircle } from 'bootstrap-icons-vue';


export default {
    name: 'UserProfile',
    components: { Loader, Post, GoBack, BIconPersonCircle },
    data() {
        return {
            authUser: {
                id: null,
                email: null,
                username: null,
                creationTime: null
            },
            user: {
                id: null,
                email: null,
                username: null,
                creationTime: null
            },
            loading: false,
            posts: [],
            unsubscribeFromAuth: () => {},
            unsubscribeFromPosts: () => {},
        };
    },
    methods: {
        async handleLogout() {
            await logout();
            this.$router.push({
              path: '/iniciar-sesion'
            });
        },
        handleChnagePassword() {
            this.$router.push({
              path: '/cambiar-contraseña'
            });
        },
        formatDate(date) {
            return formatDateUtil(date);
        },
        havePosts() {
            return this.posts.length > 0;
        },
        isAuthUser() {
            return this.authUser.id == this.user.id
        }
    },
    async mounted() {
        this.loading = true;
        this.unsubscribeFromAuth = subscribeToAuth(newUserData => this.authUser = newUserData);
        this.user = await getUserProfileById(this.$route.params.userId);
        this.unsubscribeFromPosts = subscribeToPostsByUserId(this.$route.params.userId, newPosts => {
            this.posts = newPosts;
            this.loading = false;
        });
    },
    unmounted() {
        this.unsubscribeFromAuth();
        this.unsubscribeFromPosts();
    }
}

</script>

<template>
    <section>
        <div  v-if="!loading" class="flex flex-col items-center justify-center gap-8 p-6 md:p-10">
          <div class="flex flex-col items-center gap-4">
            <img src="../../public/logo-cara-1.jpeg" alt="@shadcn" class="w-20 h-20 rounded-full"/>
            <!-- <BIconPersonCircle class="w-20 h-20 rounded-full text-gray-500"></BIconPersonCircle> -->
            <div class="grid gap-1 text-center">
              <h2 class="text-2xl font-bold">{{ user.username }}</h2>
              <p class="text-gray-500 dark:text-gray-400">{{ user.email }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Unido {{ formatDate(user.creationTime) }}</p>
              <p className="text-gray-500 dark:text-gray-400 mt-6">
                This is your personal profile page. Here you can manage your account settings, update your password, and log
                out of your session.
              </p>
            </div>
          </div>
          <div class="w-full max-w-md space-y-6">
            <div class="grid gap-4">
              <div class="flex items-center justify-center gap-2">
                <button @click="handleChnagePassword()" class="px-4 py-2 border border-purple-700 rounded text-purple-700">
                    Cambiar contraseña
                </button>
                <button @click="handleLogout()" class="px-4 py-2 border bg-purple-700 text-white rounded hover:bg-red-600 ">
                    Cerrar sesion
                </button>
              </div>
            </div>
          </div>
          <div v-if="havePosts()" class="w-full">
            <!-- <p class=" text-slate-500">Publicaciones de {{ user.username }}</p> -->
            <div v-for="post in posts">
                <Post :post="post" :key="post.id"></Post>
            </div>
        </div>
        <div v-else>
            <p class="mt-10 text-center text-slate-500">el usuario no ha creado publicaciones</p>
        </div>
        </div>
        <Loader v-else :message="'Cargando perfil'"/>
    </section>
  </template>