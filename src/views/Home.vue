<script>

import Post from '../components/Post.vue'
import CreatePostButton from '../components/CreatePostButton.vue'
import PostsContainer from './PostsContainer.vue'

export default {
    name: 'Home',
    components: { Post, CreatePostButton, PostsContainer }
}

</script>

<template>

    <PostsContainer></PostsContainer>
    <CreatePostButton></CreatePostButton>
    
</template>