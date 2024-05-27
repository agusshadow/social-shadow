<script>

import { BIconChatSquare, BIconPersonFill } from "bootstrap-icons-vue";
import Like from './Like.vue'

export default {
    name: 'Post',
    components: {
        BIconChatSquare,
        BIconPersonFill,
        Like
    },
    props: {
        post: Object
    },
    data: () => {
        return {
            like: false
        }
    },
    methods: {
        handleLike() {
            this.like = !this.like;
        },
        handleDoubleClick() {
            this.like = true;
        },
        handleComment() {
            this.$router.push({
                path: '/comentarios/' + this.post.id
            });
        }
    },
}

</script>

<template>
    <div class="pb-5 border-b-2">
        <div class="p-3">
            <div class="flex gap-2 mb-2 align-bottom items-stretch">
                <BIconPersonFill class="w-5 h-5 mt-1 text-purple-900"></BIconPersonFill>
                <a class="font-bold text-lg" href="">{{ post.username }}</a>
            </div>
            <div>
                <p class="break-words text-slate-600">{{ post.content }}</p>
            </div>


            <div class="mt-3 flex gap-3">
                <div class="flex gap-1 items-center">
                    <Like @click="handleLike()" :like="like"></Like>
                    1
                </div>
                <div class="flex gap-1 items-center">
                    <BIconChatSquare @click="handleComment()" class="w-5 h-5"></BIconChatSquare>
                    1
                </div>
            </div>
        </div>
    </div>
</template>