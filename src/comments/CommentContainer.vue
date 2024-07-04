<script>

import CreateComment from '../comments/CreateComment.vue';
import Comment from '../comments/Comment.vue';
import Loader from '../common/Loader.vue';
import GoBack from '../common/GoBack.vue'
import { subscribeToComments } from '../services/commentService.js'


export default {
    name: 'CommentContainer',
    components: { Comment, Loader, GoBack, CreateComment },
    data() {
       return {
        loading: false,
        comments: [],
        unsubscribeFromComments: () => {},
       }
    },
    methods: {
        haveComments() {
            return this.comments.length > 0;
        }
    },
    mounted() {
        this.loading = true;
        this.unsubscribeFromComments = subscribeToComments(this.$route.params.postId, newComments => {
            this.comments = newComments;
            this.loading = false;
        });
    },
    unmounted() {
        this.unsubscribeFromComments();
    }
}

</script>

<template>

    <section>
        <div v-if="!loading">
            <GoBack></GoBack>
            <h2 class="font-bold text-3xl text-center my-8 text-purple-900">Comentarios</h2>
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