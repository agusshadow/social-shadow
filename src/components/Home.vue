<script>

import Post from './Post.vue'
import CreatePostButton from './CreatePostButton.vue'
import { subscribeToAuth } from '../services/auth.js'
import { BIconPlusCircleFill } from "bootstrap-icons-vue";

export default {
    name: 'Home',
    components: {
        Post,
        CreatePostButton,
        BIconPlusCircleFill
    },
    data() {
        return {
            authUser: {
                id: null,
                email: null,
            }
        };
    },
    mounted() {
        subscribeToAuth(newUserData => this.authUser = newUserData);
    }
}

</script>

<template>

    <div class="pt-16">
        <CreatePostButton></CreatePostButton>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
    </div>

</template>