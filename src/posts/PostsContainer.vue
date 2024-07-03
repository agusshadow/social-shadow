<script>

import Post from '../common/Post.vue'
import Loader from '../common/Loader.vue'
import { subscribeToAuth } from '../services/authService.js'
import { subscribeToPosts } from '../services/postService.js';

export default {
    name: 'PostsContainer',
    components: {
        Post,
        Loader
    },
    data() {
        return {
            authUser: {
                id: null,
                email: null,
            },
            posts: [],
            loadingPosts: true,
            unsubscribeFromAuth: () => {},
            unsubscribeFromPosts: () => {},
        };
    },
    methods: {
        havePosts() {
            return this.posts.length > 0;
        }
    },
    mounted() {
        this.unsubscribeFromAuth = subscribeToAuth(newUserData => this.authUser = newUserData);
        this.unsubscribeFromPosts = subscribeToPosts(newPosts => {
            this.posts = newPosts;
            console.log(newPosts);
            this.loadingPosts = false;
        });
    },
    unmounted() {
        this.unsubscribeFromAuth();
        this.unsubscribeFromPosts();
    }
}

</script>

<template>

    <div v-if="havePosts()">
        <div v-for="post in posts">
            <Post :post="post" :key="post.id"></Post>
        </div>
    </div>
    <div v-else>
        <p class="mt-10 text-center text-slate-500">no hay publicaciones</p>
    </div>
    <Loader v-if="loadingPosts" :message="'Cargando publicaciones'"/>
    
</template>