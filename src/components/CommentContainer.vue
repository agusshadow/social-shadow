<script>

import CreateComment from './CreateComment.vue';
import Comment from './Comment.vue';
import Loader from './Loader.vue';
import GoBack from './GoBack.vue'
import { subscribeToComments } from '../services/comment.js'


export default {
    name: 'CommentContainer',
    components: { Comment, Loader, GoBack, CreateComment },
    data() {
       return {
        loading: false,
        comments: [],
       }
    },
    methods: {
        haveComments() {
            return this.comments.length > 0;
        }
    },
    mounted() {
        this.loading = true;
        subscribeToComments(this.$route.params.postId, newComments => {
            this.comments = newComments;
            this.loading = false;
        });
    }
}

</script>

<template>

    <section>
        <div v-if="!loading">
            <GoBack></GoBack>
            <div v-if="haveComments()">
                <ul class="mb-20">
                    <li v-for="comment in comments" :key="comment.id">
                        <Comment :comment="comment"></Comment>
                    </li>
                </ul>
            </div>
            <div v-else>
                <p class="mt-10 text-center text-slate-500">no hay comentarios</p>
            </div>
            <CreateComment :postId="this.$route.params.postId"></CreateComment>
        </div>
        <Loader v-else :message="'Cargando comentarios'"/>
    </section>

</template>