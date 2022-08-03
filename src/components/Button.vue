<script setup>
  defineProps({
    type:{
      type:String,
      default:'default'
    },
    disabled:Boolean,
    loading:Boolean
  })

</script>
<template>
  <button
    class="button"
    :class="[`button-${type}`,{
      'is-disabled':disabled
    }]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import "@/styles/button.scss";
</style>