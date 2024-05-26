<script>

import { BIconPersonCircle } from "bootstrap-icons-vue";

export default {
    name: 'Comment',
    components: {
        BIconPersonCircle,
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

    <div class="flex gap-2 items-center p-3 bg">
        <BIconPersonCircle class="w-5 h-5"></BIconPersonCircle>
        <div>
            <a class="font-bold text-xs" href="#">{{ comment.user }}</a>
            <p class="text-sm">{{ comment.content }}</p>
        </div>
    </div>
    
</template>