<script>

import Comment from './Comment.vue';
import { BIconArrowLeftShort } from "bootstrap-icons-vue";
import { createComment } from '../services/comment.js'
import { subscribeToAuth } from '../services/auth.js'

export default {
    name: 'CommentContainer',
    components: {
        Comment,
        BIconArrowLeftShort
    },
    data() {
       return {
        authUser: {
            id: null,
            email: null,
            username: null,
        },
        comment: '',
        comments: [
            { id: 1, user: 'user1', content: 'Hola como estas?' },
            { id: 2, user: 'user2', content: 'Fuegoooo' }
        ]
       }
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        async handleSubmit() {
            await createComment({
                post_id: this.$route.params.postId,
                comment_by: this.authUser.id,
                username: this.authUser.username,
                content: this.comment
            })
            this.$router.push({
                path: '/publicaciones'
            });
        },
    },
    mounted() {
        subscribeToAuth(newUserData => this.authUser = newUserData);
    }
}

</script>

<template>

    <div>
        <!-- <div class="flex py-4">
            <BIconArrowLeftShort @click="goBack()" class="w-6 h-6"></BIconArrowLeftShort>
        </div> -->
        <ul>
            <li v-for="comment in comments" :key="comment.id">
                <Comment :comment="comment"></Comment>
            </li>
        </ul>
        <div class="fixed bottom-0 bg-black p-4">
            <form @submit.prevent="handleSubmit()">
                <div class="flex">
                    <input v-model="comment" type="text" class="w-full p-3 border-2 border-r-0">
                    <button type="submit" class="bg-black text-white px-2">Comentar</button>
                </div>
            </form>
        </div>
    </div>

</template>