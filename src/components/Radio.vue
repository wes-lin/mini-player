<script setup>

import { ref,computed } from 'vue'

const props = defineProps({
    label:{
        type:[String , Boolean , Number],
        default:''
    },
    modelValue:{
        type:[String , Boolean , Number],
        default:''
    },
    disabled:Boolean,
    name:{
        type:String,
        default:''
    }
})

const emit = defineEmits(['update:modelValue'])

const radio = ref(null)

const model = computed({
  get:() => {
    return props.modelValue
  },
  set:(val) => {
    emit('update:modelValue',val)
    radio.value && (radio.value.checked = val === props.label)
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
        ref="radio"
        v-model="model"
        type="radio"
        :value="label"
        :name="name"
        class="radio-v sr-only"
      >
      <span
        class="radio-icon"
        aria-hidden="true"
      />   
    </span>
    <span class="radio-text">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<style lang="scss" scoped>
@import "@/styles/radio.scss";
</style>