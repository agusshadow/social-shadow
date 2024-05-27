<script>

import { BIconPersonFill } from "bootstrap-icons-vue";

export default {
    name: 'Comment',
    components: {
        BIconPersonFill,
    },
    props: {
        comment: {
            type: Object,
            required: true
        }
    }
}

</script>

<template>
    
    <div class="p-3">
        <div class="flex gap-2 mb-2 align-bottom items-stretch">
            <BIconPersonFill class="w-5 h-5 mt-1 text-purple-900"></BIconPersonFill>
            <a class="font-bold text-lg" href="">{{ comment.user }}</a>
        </div>
        <div>
            <p class="break-words text-slate-600">{{ comment.content }}</p>
        </div>
    </div>
    
</template>