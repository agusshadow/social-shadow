<script>

import { subscribeToAuth } from './services/auth.js'
import Avatar from './components/Avatar.vue'

export default {
  name: 'App',
  components: { Avatar },
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

  <div class="bg-slate-50 fixed top-0 w-full py-5 px-3 z-10">
    <div class="flex justify-between items-center">
      <img @click="goToHome()" src="../public/logo-nuevo.svg" alt="" class="w-8 cursor-pointer">
      <div v-if="authUser.id" @click="goToProfile()" class="cursor-pointer">
        <Avatar :src="''" :alt="authUser.username" :width="6" :height="6"/>
      </div>
    </div>
  </div>

  <div class="md:mx-36 pt-20">
    <router-view></router-view>
  </div>

  <Loader v-if="loading" :message="'Cerrando sesion'"/>

</template>