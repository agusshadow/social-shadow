<script>

import { BIconChat, BIconChatSquare, BIconPersonFill } from "bootstrap-icons-vue";
import Like from './Like.vue'

export default {
    name: 'Post',
    components: {
        BIconChat,
        BIconChatSquare,
        BIconPersonFill,
        Like
    },
    props: {
        id: Number,
        image: String,
        description: String,
        comments: String,
        likes: String
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
    }
}

</script>

<template>
    <div class="pb-6 border-b-2">
        <!-- <div class="flex gap-2 items-center p-3 bg">
            <BIconPersonCircle class="w-5 h-5"></BIconPersonCircle>
            <a class="font-bold" href="">username</a>
        </div>
        <div>
            <img @dblclick="handleDoubleClick()" class="w-full" src="https://placehold.co/500x600" alt="a">
        </div>
        <div class="p-3">
            <div class="flex gap-3 py-2">
                <div @click="handleLike()">
                    <BIconHeartFill v-if="like" class="w-5 h-5 text-red-600"></BIconHeartFill>
                    <BIconHeart v-else class="w-5 h-5"></BIconHeart>
                </div>
                
            </div>
            <div>
                <span class="font-bold"> 
                    142 Me gusta
                </span>
            </div>
            <div>
                <p>
                    <a class="font-bold" href="">username</a>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <div class="mt-1">
                <router-link to="/comments" class="text-slate-500 text-base">Ver los 3254 comentarios</router-link>
            </div>
        </div> -->
        <div class="p-3 bg">
            <div class="flex gap-2 mb-2">
                <BIconPersonFill class="w-5 h-5 mt-1 text-purple-900"></BIconPersonFill>
                <a class="font-bold" href="">agustingonzalezj</a>
            </div>
            <div>
                <p class="break-words">Lorem ipsum dolor sit amet consectetur adipii gregregergreggregerggrejhgiuheuighrughebughbeughreugheugherughuhguehgruehguhgierhguihuhuhuhisicinfewbhufgwefweyfewuyfgbwuiyfgwuifguweghfwuegfewugfuifgwiuyfgg elit.</p>
            </div>
            <!-- <div class="mt-4">
                <img @dblclick="handleDoubleClick()" class="w-full md:mx-auto rounded-md" src="https://placehold.co/500x600" alt="a">
            </div> -->


            <div class="mt-3 flex gap-3">
                <div class="flex gap-1 items-center">
                    <Like @click="handleLike()" :like="like"></Like>
                    254
                </div>
                <div class="flex gap-1 items-center">
                    <router-link to="/comentarios/1">
                        <BIconChatSquare class="w-5 h-5"></BIconChatSquare>
                    </router-link>
                    6
                </div>
            </div>
        </div>
    </div>
</template>