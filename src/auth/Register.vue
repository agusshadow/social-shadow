<script>

import { createUser } from "../services/authService.js";
import Loader from '../common/Loader.vue'
import Button from "../common/Button.vue";
import Input from "../common/Input.vue";
  
export default {
    name: 'Register',
    components: {
        Button,
        Loader,
        Input
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

  <div class="flex justify-center pt-16">
    <img src="../assets/logo.svg" alt="" class="w-20">
  </div>
  <div class="flex items-center justify-center">
    <form
        @submit.prevent="handleSubmit()"
        :class="{'opacity-20': loading, 'w-full max-w-sm p-6 rounded-lg mx-auto': true}"
    >
      <Input 
        v-model="user.username"
        label="Nombre de usuario"
        type="text"
      />
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
      <p class="text-red-500 text-sm mt-2" v-if="error">Credenciales inválidas</p>
      <Button :type="submit" :buttonType="'primary'">Crear cuenta</Button>
      <div class="text-center mt-5">
        <p>¿Ya tenés una cuenta?  <span @click="goToLogin()" class="text-purple-700 font-bold cursor-pointer">Iniciar sesión</span></p>
      </div>
    </form>
    <Loader v-if="loading" :message="'Creando cuenta'"/>
  </div>
  
</template>  