<script>

import { subscribeToAuth } from '../services/auth.js'  
import { createPost } from '../services/post.js'
import Loader from './Loader.vue';

export default {
    name: 'CreatePost',
    components: {
        Loader
    },
    data() {
      return {
        loading: false,
        authUser: {
            id: null,
            email: null,
            username: null,
        },
        postContent: ''
      }
    },
    methods: {
      async handleSubmit() {
        this.loading = true;
        await createPost({
                post_by: this.authUser.id,
                email: this.authUser.email,
                username: this.authUser.username,
                content: this.postContent,
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
        subscribeToAuth(newUserData => this.authUser = newUserData);
    }
};

</script>

<template>

<div class="flex items-center justify-center pt-32">
    <form
        @submit.prevent="handleSubmit()"
        :class="{'opacity-20': loading, 'w-full max-w-sm p-6 rounded-lg': true}"
    >
      <label class="block mb-2">
        Contenido
        <textarea v-model="this.postContent" type="text" class="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-full"/>
      </label>
      <button type="submit" class="w-full py-3 mt-4 text-white font-bold bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-900">Crear</button>
    </form>
    <Loader v-if="loading" :message="'Creando publicacion'"/>
  </div>

</template>  