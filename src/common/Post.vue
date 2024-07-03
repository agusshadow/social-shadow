<script>

import Like from './Like.vue';
import Avatar from './Avatar.vue'
import { BIconChatSquare } from "bootstrap-icons-vue";
import { subscribeToCommentsByPostId } from '../services/commentService.js';
import { formatDateUtil } from '../utils/formatDate.js';

export default {
    name: 'Post',
    components: {
        BIconChatSquare,
        Like,
        Avatar,
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

    <div className="rounded-lg m-4">
        <div className="flex items-start">
          <div className="mr-3">
            <!-- <Avatar :src="post.post_by?.photoURL" :alt="post.post_by?.username" :width="8" :height="8"/> -->
            <img :src="post.post_by?.photoURL" class="w-8 h-8 rounded-full">
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
                    v-if="post.image"
                    :src="post.image"
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
