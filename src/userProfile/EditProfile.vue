<script>

import GoBack from '../common/GoBack.vue'
import Button from '../common/Button.vue';

export default {
    name: 'EidtProfile',
    components: { GoBack, Button },
    methods: {
        handleChangePassword() {
            this.$router.push({
            path: `/perfil/${this.$route.params.userId}/cambiar-contraseña`
          });
        },
        handleChangeAvatar() {;
            this.$router.push({
            path: `/perfil/${this.$route.params.userId}/cambiar-avatar`
          });
        }
    },
}

</script>

<template>

    <GoBack></GoBack>
    <h2 class="font-bold text-3xl text-center my-8 text-purple-900">Editar perfil</h2>
    <section class="flex items-center justify-center pt-32">
        <div>
            <Button :type="text" :buttonType="'primary'" class="mb-3" @click="handleChangePassword()">Cambiar contraseña</Button>
            <Button :type="text" :buttonType="'primary'" class="mb-3" @click="handleChangeAvatar()">Cambiar avatar</Button>
        </div>
    </section>
    
</template>