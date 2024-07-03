<script>

import Post from '../common/Post.vue'
import CreatePostButton from '../posts/CreatePostButton.vue'
import PostsContainer from '../posts/PostsContainer.vue'

export default {
    name: 'Home',
    components: { Post, CreatePostButton, PostsContainer }
}

</script>

<template>

    <PostsContainer></PostsContainer>
    <CreatePostButton></CreatePostButton>
    
</template>