<script>

import Loader from '../common/Loader.vue'
import Input from '../common/Input.vue'
import Button from '../common/Button.vue'
import { login } from "../services/authService.js";
  
export default {
    name: 'Login',
    components: {
        Loader,
        Input,
        Button
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

  <div class="flex justify-center pt-16">
    <img src="../assets/logo.svg" alt="" class="w-20">
  </div>
  <div class="flex items-center justify-center">
    <form @submit.prevent="handleSubmit()" :class="{'opacity-20': loading, 'w-full max-w-sm p-6 rounded-lg': true}">
      <Input 
        v-model="user.email"
        label="Email"
        type="text"
      />
      <Input
        v-model="user.password"
        label="Contraseña"
        type="password"
      />
      <p class="text-red-500 text-sm mt-2" v-if="error">Credenciales invalidas</p>
      <Button :type="submit" :buttonType="'primary'">Iniciar sesion</Button>
      <div class="text-center mt-5">
      <p>No tenes una cuenta? <span @click="goToRegister()" class="text-purple-700 font-bold cursor-pointer">Crea una</span></p>
      </div>
    </form>
    <Loader v-if="loading" :message="'Iniciando sesion'"/>
  </div>

</template>  