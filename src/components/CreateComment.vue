<script>

import Comment from './Comment.vue';
import Loader from './Loader.vue';
import GoBack from './GoBack.vue'
import { createComment } from '../services/comment.js'
import { subscribeToAuth } from '../services/auth.js'

export default {
    name: 'CreateComment',
    components: { Comment, Loader, GoBack },
    props: { postId: String },
    data() {
       return {
        authUser: {
            id: null,
            email: null,
            username: null,
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
                    username: this.authUser.username
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
                    <div class="flex gap-3">
                        <input 
                            v-model="commentContent"
                            type="text" 
                            :disabled="loading"
                            class="disabled disabled:bg-gray-200 disabled:text-gray-500 w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-700">
                        <button type="submit" class="p-4 text-white font-bold bg-purple-700 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-900">Comentar</button>
                    </div>
                </form>
            </div>
            <Loader v-else :message="'Creando comentario'"/>
        </section>

</template>