<script>

import Like from './Like.vue';
import { BIconChatSquare } from "bootstrap-icons-vue";
import { subscribeToCommentsByPostId } from '../services/comment.js';
import { formatDateUtil } from '../utils/formatDate.js'
import { BIconPersonCircle } from 'bootstrap-icons-vue';

export default {
    name: 'Post',
    components: {
        BIconChatSquare,
        Like,
        BIconPersonCircle
    },
    props: {
        post: Object
    },
    data: () => {
        return {
            like: false,
            commentCount: 0,
            unsubscribeFromCommentsById: () => {},
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
            this.unsubscribeFromCommentsById = subscribeToCommentsByPostId(postId, (count) => {
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
    unmounted() {
        this.unsubscribeFromCommentsById();
    }
}

</script>

<template>

    <div className="bg-white rounded-lg p-2">
        <div className="flex items-start">
          <div className="mr-4">
            <!-- esto pasarlo a un componente -->
            <img src="../../public/logo-cara-1.jpeg" alt="@shadcn" class="w-8 h-8 rounded-full"/>
           <!--  <BIconPersonCircle class="w-8 h-8 rounded-full text-gray-500"></BIconPersonCircle> -->
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="space-x-2">
                <span className="font-semibold">{{ post.post_by?.username }}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{{ formatDate(post?.created_at) }}</span>
              </div>
            </div>
            <div className="prose prose-sm dark:prose-invert mt-4">
              <p>
                {{ post?.content }}
              </p>
            </div>
            <div>
                <img
                  src="https://placehold.co/600x400"
                  width={800}
                  height={450}
                  alt="Post Image"
                  className="mt-4 rounded-lg w-full object-cover aspect-[16/9]"
                />
                <div class="mt-3 flex gap-3">
                    <div class="flex gap-1 items-center cursor-pointer">
                        <Like @click="handleLike()" :like="like"></Like>
                        1
                    </div>
                    <div class="flex gap-1 items-center cursor-pointer">
                        <BIconChatSquare @click="handleComment()" class="w-5 h-5"></BIconChatSquare>
                        {{ commentCount }}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>


    
</template>
