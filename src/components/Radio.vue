<script setup>
defineProps({
    label:{
        type:Object,
        default:() => {}
    },
    disabled:Boolean,
    name:{
        type:String,
        default:''
    }
})
</script>

<template>
  <label
    role="radio"
    class="radio-item"
  >
    <span class="radio-input">
      <input
        type="radio"
        :value="label"
        :name="name"
        class="sr-only"
      >
      <span
        class="radio-icon"
        aria-hidden="true"
      />   
    </span>
    <span class="radio-label">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<style lang="scss" scoped>
@import "@/styles/radio.scss";
</style>