<script setup>
import { watch,ref } from 'vue'
const props = defineProps(
    {
      visible:{
        type:Boolean,
        default:false,
        required:true
      },
      title:{
        type:String,
        default:''
      },
      confirmText:{
        type:String,
        default:'confirm'
      },
      showCancel:{
        type:Boolean,
        default:false
      },
      cancelText:{
        type:String,
        default:'cancel'
      }
    }
  )

  const emit = defineEmits(['confirm','cancel'])
  const confirm = (e) => {
    emit('confirm',e)
  }
  const cancel = (e) => {
    emit('cancel',e)
  }

  const showSelf = ref(props.visible)

  watch(() => props.visible,(val) => {
    showSelf.value = val
  })

</script>
<template>
  <div
    v-if="showSelf"
    class="dialog"
  >
    <div class="dialog-mark" />
    <transition name="dialog">
      <div class="dialog-sprite">
        <section
          v-if="title"
          class="header"
        >
          title
        </section>
        <section class="dialog-body">
          <slot />
        </section>
        <section class="dialog-footer">
          <div
            v-if="showCancel"
            class="btn btn-refuse"
            @click="cancel"
          >
            {{ cancelText }}
          </div>
          <div
            class="btn btn-confirm"
            @click="confirm"
          >
            {{ confirmText }}
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.dialog{
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    .dialog-mark{
        position:absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background:  rgba(0,0,0,.6);
    }
    .dialog-sprite{
        position: absolute;
        top: 25%;
        left: 15%;
        right: 15%;
        bottom: 35%;
        display: flex;
        flex-direction: column;
        max-height: 75%;
        min-height: 180px;
        overflow: hidden;
        background: #fff;
        border-radius: 8px;

      .header {
          padding: 15px;
          text-align: center;
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }

        .dialog-body{
            flex: 1;
            overflow-x: hidden;
            // overflow-y: scroll;
            padding: 20px 15px 20px 15px;
        }

        .dialog-footer {
            position: relative;
            display: flex;
            width: 100%;
            // flex-shrink: 1;
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background: #ddd;
                transform: scaleY(.5);
            }
            .btn {
                flex: 1;
                text-align: center;
                padding: 15px;
                font-size: 17px;
                &:nth-child(2) {
                    position: relative;
                    &::after {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 1px;
                        height: 100%;
                        background: #ddd;
                        transform: scaleX(.5);
                    }
                }
              }
            }
    }

    &-leave{
        &-active{
          transition: all .35s ease-in-out;
        }
        &-to{
          transform: scale(1.2);
          pointer-events: none;
          opacity: 0;
        }
    }
    &-enter{
        &-active{
          transition: all .35s ease-in-out;
        }
        &-from{
          transform: scale(.55);
          pointer-events: none;
          opacity: 0;
        }
    }
} 
</style>