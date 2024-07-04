<script>

import Loader from '../common/Loader.vue'
import GoBack from '../common/GoBack.vue'
import Input from '../common/Input.vue';
import Button from '../common/Button.vue';
import { subscribeToAuth, changePassword } from '../services/authService.js'

export default {
    name: 'ChangePassword',
    components: { Loader, GoBack, Input, Button },
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
    <h2 class="font-bold text-3xl text-center my-8 text-purple-900">Cambiar contraseña</h2>
    <section class="flex items-center justify-center pt-32">
        <form @submit.prevent="handleSubmit()" :class="{'opacity-20': loading, 'w-full max-w-sm p-6 rounded-lg': true}">
            <Input 
                v-model="oldPassword"
                label="Contraseña anterior"
                type="text"
            />
            <Input 
                v-model="newPassword"
                label="Contraseña nueva"
                type="text"
            />
            <Button :type="submit" :buttonType="'primary'">Cambiar contraseña</Button>
        </form>
        <Loader v-if="loading" :message="'Cambiando contraseña'"/>
    </section>
    
</template>