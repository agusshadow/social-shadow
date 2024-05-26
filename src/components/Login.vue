<script>

import { BIconGoogle } from "bootstrap-icons-vue";
import { login, loginWithGoogle } from "../services/auth.js";
  
export default {
    name: 'Login',
    components: {
        BIconGoogle
    },
    data() {
      return {
        loading: false,
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async handleSubmit() {
        this.loading = true;
        if (this.user.email && this.user.password) {
          await login(this.user.email, this.user.password);
          this.$router.push({
                path: '/publicaciones'
            });
        }
        this.loading = false;
      },
      goToRegister() {
        this.$router.push({
                path: '/registro'
            });
      },
      /* async googleLogin() {
        await loginWithGoogle();
      } */
    }
};

</script>

<template>

  <div class="flex items-center justify-center min-h-screen">
    <form
        @submit.prevent="handleSubmit()"
        :class="{'opacity-20': loading, 'w-full max-w-sm p-6 rounded-lg': true}"
    >
      <label class="block mb-2">
        Usuario
        <input v-model="user.email" type="text" class="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </label>
      <label class="block mb-2">
        Contraseña
        <input v-model="user.password" type="password" class="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </label>
      <button type="submit" class="w-full py-3 mt-4 text-white font-bold bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-900">Iniciar Sesión</button>
      <!-- <button @click="googleLogin()" class="flex justify-center gap-2 w-full py-4 mt-4 text-purple-700 border-purple-700 border-2 rounded-md">
          <BIconGoogle></BIconGoogle>
      </button> -->
      <div class="text-center mt-5">
      <p>No tenes una cuenta? <span @click="goToRegister()" class="text-purple-700 font-bold">Crea una</span></p>
      </div>
    </form>
    <svg v-if="loading" aria-hidden="true" class="absolute inset-0 m-auto z-50 w-8 h-8 text-gray-200 animate-spin fill-purple-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
  </div>

</template>  