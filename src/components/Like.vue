<script>

import { BIconHeartFill, BIconHeart } from "bootstrap-icons-vue";
  
export default {
    name: 'Like',
    props: { like: Boolean },
    components: { BIconHeartFill, BIconHeart },
};

</script>


<template>

    <div>
      <BIconHeartFill v-if="like" class="w-5 h-5 text-red-600"></BIconHeartFill>
      <BIconHeart v-else class="w-5 h-5"></BIconHeart>
    </div>

</template>  