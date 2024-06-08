<script>

import { BIconGoogle } from "bootstrap-icons-vue";
import { createUser } from "../services/auth.js";
import Loader from '../components/Loader.vue'
  
export default {
    name: 'Register',
    components: {
        BIconGoogle,
        Loader
    },
    data() {
      return {
        loading: false,
        user: {
          username: '',
          email: '',
          password: ''
        },
        error: false
      }
    },
    methods: {
      async handleSubmit() {
        this.loading = true;
        if (this.user.email && this.user.password) {
            try {
              await createUser(this.user.email, this.user.password, this.user.username);
              this.$router.push({
                  path: '/publicaciones'
              });
            } catch (error) {
              this.error = true;
            }
        }
        this.loading = false;
      },
      goToLogin() {
        this.$router.push({
                path: '/iniciar-sesion'
            });
      },
    }
};

</script>

<template>

  <div class="flex items-center justify-center pt-32">
    <form
        @submit.prevent="handleSubmit()"
        :class="{'opacity-20': loading, 'w-full max-w-sm p-6 rounded-lg mx-auto': true}"
    >
    <label class="block mb-2">
      Nombre de usuario
      <input v-model="user.username" type="text" class="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
    </label>
      <label class="block mb-2">
        Email
        <input v-model="user.email" type="text" class="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </label>
      <label class="block mb-2">
        Contraseña
        <input v-model="user.password" type="password" class="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </label>
      <p class="text-red-500 text-sm mt-2" v-if="error">Credenciales invalidas</p>
      <button type="submit" class="w-full py-3 mt-4 text-white font-bold bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-900">Crear cuenta</button>
      <div class="text-center mt-5">
        <p>Ya tenes una cuenta? <span @click="goToLogin()" class="text-purple-700 font-bold cursor-pointer">Iniciar sesion</span></p>
        </div>
    </form>
    <Loader v-if="loading" :message="'Creando cuenta'"/>
  </div>
  
</template>  