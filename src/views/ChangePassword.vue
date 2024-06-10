<script>

import Loader from '../components/Loader.vue'
import GoBack from '../components/GoBack.vue'
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import { subscribeToAuth, changePassword } from '../services/auth.js'

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