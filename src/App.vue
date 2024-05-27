<script>

import { BIconPersonFill } from "bootstrap-icons-vue";
import { logout, subscribeToAuth } from './services/auth.js'

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
      handleLogo() {
        this.$router.push({
              path: '/publicaciones'
          });
      },
      async handleLogout() {
          await logout();
          this.$router.push({
              path: '/iniciar-sesion'
          });
          this.loading = false
      }
    },
    mounted() {
        subscribeToAuth(newUserData => this.authUser = newUserData);
    }
}

</script>

<template>

  <div class="bg-slate-50 fixed top-0 w-full py-5 px-3">
    <div class="flex justify-between items-center">
      <h1 @click="handleLogo()" class="text-xl font-bold italic">So<span class="text-purple-700">Sh</span></h1>
      <!-- <BIconPersonFill class="w-6 h-6 text-purple-900"></BIconPersonFill> -->
      <span @click="handleLogout()" v-if="authUser.id">{{ authUser.username }}</span>
    </div>
  </div>

  <div class="md:w-1/2 mx-auto pt-16">
    <router-view></router-view>
  </div>

  <Loader v-if="loading" :message="'Cerrando sesion'"/>

</template>