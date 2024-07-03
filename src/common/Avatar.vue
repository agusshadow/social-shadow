<script>
import { BIconPersonCircle } from "bootstrap-icons-vue";

const sizeMap = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    8: '8',
    10: '10',
    12: '12',
};

export default {
    name: 'Avatar',
    components: { BIconPersonCircle },
    props: { 
        src: String, 
        alt: String, 
        size: { 
            type: Number, 
            default: 12
        }
    },
    computed: {
        computedClasses() {
            const mappedSize = sizeMap[this.size] || '12';
            return `w-${mappedSize} h-${mappedSize}`;
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
            class="rounded-full text-gray-500">
        </BIconPersonCircle>
    </div>
</template>
