<script>

import { BIconPersonCircle } from "bootstrap-icons-vue";

export default {
    name: 'Avatar',
    components: { BIconPersonCircle },
    props: { src: String, alt: String, width: Number, height: Number },
    computed: {
    computedClasses() {
      const widthClass = `w-${this.width}`;
      const heightClass = `h-${this.height}`;
      return `${widthClass} ${heightClass}`;
    }
  }
}

</script>

<template>

    <div class="block">
        <img 
            v-if="src"
            :src="src"
            :alt="alt" 
            :class="computedClasses"
            class="rounded-full"
        />
        <BIconPersonCircle 
            v-else
            :class="computedClasses"
            class="w-8 rounded-full text-gray-500">
        </BIconPersonCircle>
    </div>
    
</template>