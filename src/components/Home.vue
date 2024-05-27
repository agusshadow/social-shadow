<script>

import Post from './Post.vue'
import CreatePostButton from './CreatePostButton.vue'
import PostsContainer from './PostsContainer.vue'
import { subscribeToAuth } from '../services/auth.js'
import { subscribeToPosts } from '../services/post';

export default {
    name: 'Home',
    components: {
        Post,
        CreatePostButton,
        PostsContainer
    }
}

</script>

<template>
    <PostsContainer></PostsContainer>
    <CreatePostButton></CreatePostButton>
</template>