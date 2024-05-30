<script>

import { BIconPersonFill } from "bootstrap-icons-vue";
import { formatDateUtil } from '../utils/formatDate.js'

export default {
    name: 'Comment',
    components: { BIconPersonFill },
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
            <BIconPersonFill class="w-5 h-5 mt-1 text-purple-900"></BIconPersonFill>
            <a class="font-bold text-lg" href="">{{ comment.comment_by.username }}</a>
        </div>
        <p class="break-words text-slate-600">{{ comment.content }}</p>
        <span class="text-xs text-slate-500">{{ formatDate(comment?.created_at) }}</span>
    </div>
    
</template>