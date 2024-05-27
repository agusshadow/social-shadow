<script>

import Post from './Post.vue'
import Loader from './Loader.vue'
import { subscribeToAuth } from '../services/auth.js'
import { subscribeToPosts } from '../services/post';

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
        subscribeToAuth(newUserData => this.authUser = newUserData);
        this.unsubscribeFromPosts = subscribeToPosts(newPosts => {
            this.posts = newPosts;
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
    <div v-for="post in posts">
        <Post :post="post"></Post>
    </div>
    <div v-if="!havePosts()">
        <!-- agregar un data zero aca -->
        no hay posts
    </div>
    <Loader v-if="loadingPosts" :message="'Cargando publicaciones'"/>
</template>