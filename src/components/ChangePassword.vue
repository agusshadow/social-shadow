<script>

import Loader from './Loader.vue'
import GoBack from './GoBack.vue'
import { subscribeToAuth, changePassword } from '../services/auth.js'

export default {
    name: 'ChangePassword',
    components: { Loader, GoBack },
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            loading: false,  
            unsubscribeFromAuth: () => {},
        };
    },
    methods: {
        async handleSubmit() {
            this.loading= true;
            await changePassword(this.oldPassword, this.newPassword);
            this.loading = false;
            this.$router.back();
        }
    },
    async mounted() {
        this.unsubscribeFromAuth = subscribeToAuth(newUserData => this.authUser = newUserData);
    },
    unmounted() {
        this.unsubscribeFromAuth();
    }
}

</script>

<template>

    <GoBack></GoBack>
    <section class="flex items-center justify-center pt-32">
        
        <form @submit.prevent="handleSubmit()" :class="{'opacity-20': loading, 'w-full max-w-sm p-6 rounded-lg': true}">
          <label class="block mb-2">
            Contraseña anterior
            <input v-model="oldPassword" type="text" class="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
          </label>
          <label class="block mb-2">
            Contraseña nueva
            <input v-model="newPassword" type="text" class="w-full p-3 mt-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
          </label>
          <button type="submit" class="w-full py-3 mt-4 text-white font-bold bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-900">Cambiar contraseña</button>
          <div class="text-center mt-5">
          </div>
        </form>
        <Loader v-if="loading" :message="'Cambiando contraseña'"/>
    </section>
    
</template>