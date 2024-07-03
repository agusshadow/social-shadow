<script>

import Avatar from './Avatar.vue';
import { subscribeToAuth } from '../services/authService';

export default {
    name: 'Navbar',
    components: { Avatar },
    data() {
        return {
            authUser: {
                id: null,
                email: null,
                username: null,
                photoURL: null,
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
          <img @click="goToHome()" src="../assets/logo.svg" alt="logo" class="w-12 cursor-pointer">
          <div v-if="authUser.id" @click="goToProfile()" class="cursor-pointer">
            <!-- <Avatar :src="authUser.photoUrl" :alt="authUser.username" :width="10" :height="10"/> -->
            <img :src="authUser.photoURL" class="w-10 h-10 rounded-full">
          </div>
        </div>
    </div>
    
</template>