<script>

import Comment from './Comment.vue';
import { BIconArrowLeftShort } from "bootstrap-icons-vue";

export default {
    name: 'CommentContainer',
    components: {
        Comment,
        BIconArrowLeftShort
    },
    data() {
       return {
        comments: [
            { id: 1, user: 'user1', content: 'Hola como estas?' },
            { id: 2, user: 'user2', content: 'Fuegoooo' }
        ]
       }
    },
    methods: {
        goBack() {
            this.$router.back();
        }
    },
    mounted() {
        console.log(this.$route.params.postId);
    }
}

</script>

<template>

    <div class="fixed bottom-0 w-1/2 h-1/2 bg-white">
        <div class="relative py-4 border-b-2 flex justify-center items-center">
            <BIconArrowLeftShort @click="goBack()" class="absolute left-0 ml-4 w-6 h-6"></BIconArrowLeftShort>
            <h2 class="text-center">Comentarios</h2>
        </div>
        <ul>
            <li v-for="comment in comments" :key="comment.id">
                <Comment :comment="comment"></Comment>
            </li>
        </ul>
        <div class="fixed bottom-0 w-full">
            <form>
                <div class="flex">
                    <input type="text" class="w-full p-3 border-2 border-r-0">
                    <button type="submit" class="bg-black text-white px-2">Comentar</button>
                </div>
            </form>
        </div>
    </div>

</template>