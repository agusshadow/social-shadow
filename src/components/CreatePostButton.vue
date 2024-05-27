<script>

import { BIconPlusCircleFill } from "bootstrap-icons-vue";
import { createPost } from '../services/post.js'

export default {
    name: 'CreatePostButton',
    components: {
        BIconPlusCircleFill
    },
    methods: {
        handleButton() {
            this.$router.push({
                path: '/crear-publicacion'
            });
        }
    }
}

</script>

<template>

    <div class="fixed bottom-5 right-5">
        <BIconPlusCircleFill @click="handleButton()" class="text-purple-900 size-12 cursor-pointer"></BIconPlusCircleFill>
    </div>

</template>