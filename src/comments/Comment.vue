<script>

import Avatar from '../common/Avatar.vue'
import { formatDateUtil } from '../utils/formatDate.js'

export default {
    name: 'Comment',
    components: { Avatar },
    props: { comment: Object },
    methods: {
        formatDate(date) {
            return formatDateUtil(date);
        }
    }
}

</script>

<template>
    
    <div class="p-3">
        <div class="flex gap-2 mb-2 align-bottom items-stretch">
            <Avatar :src="comment.comment_by.photoURL" :alt="comment.comment_by.username" :size="6"/>
            <a class="font-bold text-lg" href="">{{ comment.comment_by.username }}</a>
        </div>
        <p class="break-words text-slate-600">{{ comment.content }}</p>
        <span class="text-xs text-slate-500">{{ formatDate(comment?.created_at) }}</span>
    </div>
    
</template>