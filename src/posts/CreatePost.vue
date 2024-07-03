<script>

import Loader from '../common/Loader.vue';
import GoBack from '../common/GoBack.vue'
import Button from '../common/Button.vue';
import { subscribeToAuth } from '../services/authService.js'  
import { createPost } from '../services/postService.js'

export default {
    name: 'CreatePost',
    components: { Loader, GoBack, Button },
    data() {
      return {
        authUser: {
            id: null,
            email: null,
            username: null,
            photoURL: null
        },
        loading: false,
        postContent: '',
        image: null,
        unsubscribeFromAuth: () => {},
      }
    },
    methods: {
      async handleSubmit() {
        if (!this.postContent) return
        this.loading = true;
        await createPost({
                content: this.postContent,
                image: this.image,
                post_by: {
                  id: this.authUser.id,
                  email: this.authUser.email,
                  username: this.authUser.username,
                  photoURL: this.authUser.photoURL
                },
            })
        this.loading = false;
        this.goToRegister();
      },
      handleFileSelection(event) {
            this.image = event.target.files[0];

            const reader = new FileReader();

            reader.readAsDataURL(this.image);
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
      <h2>Crea una nueva publicacion</h2>
      <p>Escribe el contenido de tu publicacion y luego da click en crear</p>
      <div class="flex items-center justify-center">
        
        <form @submit.prevent="handleSubmit()" :class="{'opacity-20': loading, 'w-full px-6 rounded-lg': true}">
          <label class="block mb-2 sr-only" for="content">
            Escribe el contenido de tu publicacion
          </label>
          <textarea v-model="this.postContent" type="text" id="content" class="w-full h-96 p-3 mt-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-700 resize-none"/>
          <input
              type="file"
              class="w-full p-2 border border-gray-500 rounded read-only:bg-gray-200"
              id="photoURL"
              :read-only="loading"
              @change="handleFileSelection"
          />
          <Button :type="submit" :buttonType="'primary'">Crear publicacion</Button>
        </form>
      </div>
    </div>
    <Loader v-else :message="'Creando publicacion'"/>
  </section>

</template>  