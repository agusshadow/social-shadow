<script>

import { BIconArrowLeftShort } from "bootstrap-icons-vue";

export default {
    name: 'GoBack',
    components: { BIconArrowLeftShort },
    methods: {
        goBack() {
            this.$router.back();
        }
    }
}

</script>

<template>
    <div @click="goBack()" class="p-4 flex items-center gap-1 cursor-pointer">
        <BIconArrowLeftShort class="h-6 w-6"></BIconArrowLeftShort>
        <span>Volver</span>
    </div>
</template>