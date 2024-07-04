<script>

import Loader from '../common/Loader.vue'
import Post from '../common/Post.vue'
import GoBack from '../common/GoBack.vue'
import Avatar from '../common/Avatar.vue'
import Button from '../common/Button.vue'
import { subscribeToAuth, logout } from '../services/authService.js'
import { subscribeToPostsByUserId } from '../services/postService.js'
import { getUserProfileById } from '../services/userProfileService.js'

export default {
    name: 'UserProfile',
    components: { Loader, Post, GoBack, Avatar, Button },
    data() {
        return {
            authUser: {
                id: null,
                email: null,
                username: null,
                creationTime: null,
                photoURL: null
            },
            user: {
                id: null,
                email: null,
                username: null,
                creationTime: null,
                photoURL: null
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
        handleEditProfile() {
          this.$router.push({
            path: `/perfil/${this.$route.params.userId}/editar`
          });
        },
        handleFormatDate(date) {
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
        this.unsubscribeFromAuth = subscribeToAuth(newUserData => {
          this.authUser = newUserData
        });
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
        <div  v-if="!loading" class="flex flex-col items-center justify-center gap-8">
          <div class="flex flex-col items-center gap-4 mt-6">
            <Avatar :src="user.photoURL" :alt="user.name" :size="12"/>
            <div class="grid gap-1 text-center">
              <h2 class="text-2xl font-bold">{{ user.username }}</h2>
              <p class="text-gray-500 dark:text-gray-400">{{ user.email }}</p>
            </div>
          </div>
          <div class="w-full max-w-md space-y-6" v-if="isAuthUser()">
            <div class="grid gap-4">
              <div class="flex items-center justify-center gap-2">
                <Button @click="handleEditProfile()" :type="submit" :buttonType="'secondary'">Editar perfil</Button>
                <Button @click="handleLogout()" :type="submit" :buttonType="'primary'">Cerrar sesión</Button>
              </div>
            </div>
          </div>
          <div v-if="havePosts()" class="w-full">
            <div v-for="post in posts">
                <Post :post="post" :key="post.id"></Post>
            </div>
          </div>
          <div v-else>
              <p class="mt-10 text-center text-slate-500">El usuario no ha creado publicaciones</p>
          </div>
        </div>
        <Loader v-else :message="'Cargando perfil'"/>
    </section>
  </template>