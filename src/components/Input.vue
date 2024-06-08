<script>

export default {
    name: 'Input',
    emits: ['update:modelValue'],
    props: { modelValue: String, label: String, type: String }
}

</script>

<template>

    <label :for="label" class="block sr-only">{{ label }}</label>
    <input 
         @input="$emit('update:modelValue', $event.target.value)"
        :id="label" 
        :type="type" 
        :placeholder="label" 
        class="w-full p-3 mt-1 mb-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-400"
    >
    
</template>