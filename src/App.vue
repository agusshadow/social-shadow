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
            }
        };
    },
    methods: {
        handleLogout() {
            logout();
            this.$router.push({
                path: '/iniciar-sesion'
            });
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
      <h1 class="text-xl font-bold italic">Social <span class="text-purple-700">Shadow</span></h1>
      <!-- <BIconPersonFill class="w-6 h-6 text-purple-900"></BIconPersonFill> -->
      <span @click="handleLogout()" v-if="authUser.id">{{ authUser.email }}</span>
    </div>
  </div>

  <div class="md:w-1/2 mx-auto">
    <router-view></router-view>
  </div>

</template>