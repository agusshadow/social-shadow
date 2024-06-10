<script>

import Avatar from './Avatar.vue';
import { subscribeToAuth } from '../services/auth';

export default {
    name: 'Navbar',
    components: { Avatar },
    data() {
        return {
            authUser: {
                id: null,
                email: null,
                username: null
            },
            unsubscribeFromAuth: () => {},
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
        this.unsubscribeFromAuth = subscribeToAuth(newUserData => this.authUser = newUserData);
    },
    unmounted() {
        this.unsubscribeFromAuth();
    }
}

</script>

<template>

    <div class="bg-slate-50 fixed top-0 w-full py-5 px-3 z-10">
        <div class="flex justify-between items-center">
          <img @click="goToHome()" src="../../public/logo-nuevo.svg" alt="logo" class="w-6 cursor-pointer">
          <div v-if="authUser.id" @click="goToProfile()" class="cursor-pointer">
            <Avatar :src="'../../public/logo-cara-1.jpeg'" :alt="authUser.username" :width="10" :height="10"/>
          </div>
        </div>
    </div>
    
</template>