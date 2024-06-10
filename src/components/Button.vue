<script>

export default {
    name: 'Button',
    props: { type: String, buttonType: String},
}

</script>

<template>

    <div>
        <button 
            v-if="buttonType === 'primary'"
            :type="type" 
            class="w-full p-3 border font-bold rounded-md text-white  bg-purple-700  hover:bg-purple-800 focus:outline-none focus:bg-purple-900">
            <slot></slot>
        </button>
        <button 
            v-if="buttonType === 'secondary'"
            :type="type" 
            class="w-full p-3 border font-bold rounded-md border-purple-700 text-purple-700 hover:bg-purple-100">
            <slot></slot>
        </button>
    </div>
    
</template>