<script>
import { BIconChatSquare } from "bootstrap-icons-vue";
import Like from './Like.vue';
import { subscribeToCommentsByPostId } from '../services/comment.js';
import { formatDateUtil } from '../utils/formatDate.js'

export default {
    name: 'Post',
    components: {
        BIconChatSquare,
        Like
    },
    props: {
        post: Object
    },
    data: () => {
        return {
            like: false,
            commentCount: 0,
            unsubscribe: null // Guardar la función de desuscripción
        }
    },
    methods: {
        handleLike() {
            this.like = !this.like;
            console.log(this.post);
        },
        handleDoubleClick() {
            this.like = true;
        },
        handleComment() {
            this.$router.push({
                path: '/comentarios/' + this.post.id
            });
        },
        fetchCommentCount(postId) {
            this.unsubscribe = subscribeToCommentsByPostId(postId, (count) => {
                this.commentCount = count;
            });
        },
        formatDate(date) {
            return formatDateUtil(date);
        },
        goToProfile(userId) {
            console.log('anashe', userId);
            this.$router.push({
              path: `/perfil/${userId}`
          });
        }
    },
    mounted() {
        this.fetchCommentCount(this.post.id);
    },
    beforeDestroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}
</script>

<template>
    <div class="pb-5 border-b-2">
        <div class="p-3">
            <div class="flex items-center gap-2 mb-2">
                <a @click="goToProfile(post.post_by.id)" class="font-bold text-lg text-purple-700 cursor-pointer">{{ post.post_by?.username }}</a>
            </div>
            <p class="break-words text-slate-700">{{ post?.content }}</p>
            <!-- pendiente v2 -->
            <!-- <img class="my-3 mx-auto" src="https://placehold.co/600x400" alt="imagen de prueba"> -->
            <span class="text-xs text-slate-500">{{ formatDate(post?.created_at) }}</span>
            <div class="mt-3 flex gap-3">
                <!-- pendiente v2 -->
                <!-- <div class="flex gap-1 items-center cursor-pointer">
                    <Like @click="handleLike()" :like="like"></Like>
                    1
                </div> -->
                <div class="flex gap-1 items-center cursor-pointer">
                    <BIconChatSquare @click="handleComment()" class="w-5 h-5"></BIconChatSquare>
                    {{ commentCount }}
                </div>
            </div>
        </div>
    </div>
</template>
