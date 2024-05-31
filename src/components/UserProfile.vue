<script>

import Loader from './Loader.vue'
import Post from './Post.vue'
import GoBack from './GoBack.vue'
import { subscribeToAuth, logout } from '../services/auth.js'
import { subscribeToPostsByUserId } from '../services/post.js'
import { formatDateUtil } from '../utils/formatDate.js'
import { getUserProfileById } from '../services/user-profile.js'

export default {
    name: 'UserProfile',
    components: { Loader, Post, GoBack },
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
        <div v-if="!loading">
            <GoBack></GoBack>
            <div class="p-4">
                <p class="mb-3 font-bold text-xl text-purple-700">{{ user.username }}</p>
                <span class="font-bold">Email</span>
                <p>{{ user.email }}</p>
                <span class="font-bold">Fecha de creacion</span>
                <p>{{ formatDate(user.creationTime) }}</p>
                <div v-if="isAuthUser()" class="flex gap-2">
                    <button @click="handleChnagePassword()" class="py-1 px-2 mt-5 text-white font-bold bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-900">Cambiar contraseña</button>
                    <button @click="handleLogout()" class="py-1 px-2 mt-5 text-white font-bold bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-900">Cerrar sesion</button>
                </div>
            </div>
            <div v-if="havePosts()">
                <p class="p-3 text-slate-500">Publicaciones de {{ user.username }}</p>
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