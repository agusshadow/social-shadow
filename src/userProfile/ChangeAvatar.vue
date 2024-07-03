<script>

import Loader from '../common/Loader.vue'
import GoBack from '../common/GoBack.vue'
import Input from '../common/Input.vue';
import Button from '../common/Button.vue';
import { subscribeToAuth, updateUserPhoto } from '../services/authService.js'

export default {
    name: 'ChangeAvatar',
    components: { Loader, GoBack, Input, Button },
    data() {
        return {
            photo: null,
            photoPreview: null,
            loading: false,  
            unsubscribeFromAuth: () => {},
        };
    },
    methods: {
        handleFileSelection(event) {
            this.photo = event.target.files[0];

            const reader = new FileReader();

            reader.addEventListener('load', () => {
                this.photoPreview = reader.result;
            });

            reader.readAsDataURL(this.photo);
        },
        async handleUpload() {
            this.loading = true;

            try {
                await updateUserPhoto(this.photo);
            } catch (error) {
                console.error('[MyProfileEditPhoto handleUpload] Error al subir la imagen: ', error);
            }
            this.$router.back();
            this.loading = false;
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
        <form 
        action="#"
        @submit.prevent="handleUpload"
    >
        <div>
            <div>
                <label for="photoURL">Avatar</label>
                <input
                    type="file"
                    class="block w-full text-sm p-3 my-3 text-white rounded-lg cursor-pointer bg-gray-400 focus:outline-none"
                    id="photoURL"
                    :read-only="loading"
                    @change="handleFileSelection"
                />
            </div>
            <div class="my-3" v-if="photoPreview">
                <p class="mb-3">Previsualización</p>
                <img
                    :src="photoPreview"
                    alt=""
                    class="w-1/2 mx-auto"
                />
            </div>
        </div>
        <Button :type="submit" :buttonType="'primary'">Cambiar avatar</Button>
    </form>
        <Loader v-if="loading" :message="'Cambiando avatar'"/>
    </section>
    
</template>