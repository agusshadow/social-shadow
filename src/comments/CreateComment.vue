<script>

import Comment from '../comments/Comment.vue';
import Loader from '../common/Loader.vue';
import GoBack from '../common/GoBack.vue'
import Button from '../common/Button.vue';
import Input from '../common/Input.vue';
import { createComment } from '../services/commentService.js'
import { subscribeToAuth } from '../services/authService.js'

export default {
    name: 'CreateComment',
    components: { Comment, Loader, GoBack, Button, Input },
    props: { postId: String },
    data() {
       return {
        authUser: {
            id: null,
            email: null,
            username: null,
            photoURL: null
        },
        loading: false,
        commentContent: '',
        unsubscribeFromAuth: () => {},
       }
    },
    methods: {
        async handleSubmit() {
            if (!this.commentContent) return
            this.loading = true;
            await createComment({
                post_id: this.postId,
                content: this.commentContent ,
                comment_by: {
                    id: this.authUser.id,
                    email: this.authUser.email,
                    username: this.authUser.username,
                    photoURL: this.authUser.photoURL
                }
            })
            this.clearInputContent();
            this.loading = false;
        },
        clearInputContent() {
            this.commentContent = '';
        },
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

        <section>
            <div v-if="!loading" class="fixed bottom-0 left-0 right-0 p-4 md:mx-36 bg-white">
                <form @submit.prevent="handleSubmit()">
                    <div class="flex items-center gap-3">
                        <Input 
                            v-model="commentContent"
                            label="Comentario"
                            type="text"
                            :disabled="loading"
                        />
                        <Button :type="submit" :buttonType="'primary'">Comentar</Button>
                    </div>
                </form>
            </div>
            <Loader v-else :message="'Creando comentario'"/>
        </section>

</template>