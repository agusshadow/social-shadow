<script>

import Loader from './Loader.vue';
import GoBack from './GoBack.vue'
import { subscribeToAuth } from '../services/auth.js'  
import { createPost } from '../services/post.js'

export default {
    name: 'CreatePost',
    components: { Loader, GoBack },
    data() {
      return {
        authUser: {
            id: null,
            email: null,
            username: null,
        },
        loading: false,
        postContent: '',
        unsubscribeFromAuth: () => {},
      }
    },
    methods: {
      async handleSubmit() {
        if (!this.postContent) return
        this.loading = true;
        await createPost({
                content: this.postContent,
                post_by: {
                  id: this.authUser.id,
                  email: this.authUser.email,
                  username: this.authUser.username,
                },
            })
        this.loading = false;
        this.goToRegister();
      },
      goToRegister() {
        this.$router.push({
                path: '/publicaciones'
            });
      },
    },
    mounted() {
      this.unsubscribeFromAuth = subscribeToAuth(newUserData => {
          this.authUser = newUserData
      });
    },
    unmounted() {
        this.unsubscribeFromAuth();
    }
};

</script>

<template>

  <section>
    <div v-if="!loading">
      <GoBack></GoBack>
      <div class="flex items-center justify-center">
        <form @submit.prevent="handleSubmit()" :class="{'opacity-20': loading, 'w-full px-6 rounded-lg': true}">
          <label class="block mb-2 sr-only" for="content">
            Escribe el contenido de tu publicacion
          </label>
          <textarea v-model="this.postContent" type="text" id="content" class="w-full h-96 p-3 mt-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-700 resize-none"/>
          <button type="submit" class="w-full py-3 mt-4 text-white font-bold bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-900">Crear publicacion</button>
        </form>
      </div>
    </div>
    <Loader v-else :message="'Creando publicacion'"/>
  </section>

</template>  