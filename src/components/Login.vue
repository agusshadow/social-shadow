<script>

import Loader from './Loader.vue'
import { login } from "../services/auth.js";
  
export default {
    name: 'Login',
    components: {
        Loader
    },
    data() {
      return {
        user: {
          email: null,
          password: null
        },
        loading: false,
        error: false
      }
    },
    methods: {
      async handleSubmit() {
        this.loading = true;
        if (this.user.email && this.user.password) {
          try {
            await login(this.user.email, this.user.password);
          this.$router.push({
                path: '/publicaciones'
            });
          } catch (error) {
            this.error = true;
          }
        }
        this.loading = false;
      },
      goToRegister() {
        this.$router.push({
                path: '/registro'
            });
      },
    }
};

</script>

<template>

  <div class="flex items-center justify-center pt-32">
    <form @submit.prevent="handleSubmit()" :class="{'opacity-20': loading, 'w-full max-w-sm p-6 rounded-lg': true}">
      <label class="block mb-2">
        Email
        <input v-model="user.email" type="text" class="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </label>
      <label class="block mb-2">
        Contraseña
        <input v-model="user.password" type="password" class="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </label>
      <p class="text-red-500 text-sm mt-2" v-if="error">Credenciales invalidas</p>
      <button type="submit" class="w-full py-3 mt-4 text-white font-bold bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-900">Iniciar Sesión</button>
      <div class="text-center mt-5">
      <p>No tenes una cuenta? <span @click="goToRegister()" class="text-purple-700 font-bold cursor-pointer">Crea una</span></p>
      </div>
    </form>
    <Loader v-if="loading" :message="'Iniciando sesion'"/>
  </div>

</template>  