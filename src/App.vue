<script>

import { BIconPersonFill } from "bootstrap-icons-vue";
import { subscribeToAuth } from './services/auth.js'

export default {
  name: 'App',
  components: { BIconPersonFill },
  data() {
        return {
            authUser: {
                id: null,
                email: null,
                username: null
            },
            loading: true
        };
    },
    methods: {
      goToHome() {
        this.$router.push({
              path: '/publicaciones'
          });
      },
      goToProfile() {
        this.$router.push({
              path: `/perfil/${this.authUser.id}`
          });
      }
    },
    mounted() {
        subscribeToAuth(newUserData => {
          this.authUser = newUserData
        });
    }
}

</script>

<template>

  <div class="bg-slate-50 fixed top-0 w-full py-5 px-3">
    <div class="flex justify-between items-center">
      <img @click="goToHome()" src="../public/logo.svg" alt="" class="w-16">
      <div v-if="authUser.id" class="flex gap-1 items-center bg-purple-700 text-white px-2 py-1 rounded-md cursor-pointer">
        <BIconPersonFill></BIconPersonFill>
        <span @click="goToProfile()">{{ authUser?.username }}</span>
      </div>
    </div>
  </div>

  <div class="md:w-1/2 md:px-40 mx-auto pt-20">
    <router-view></router-view>
  </div>

  <Loader v-if="loading" :message="'Cerrando sesion'"/>

</template>