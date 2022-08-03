import { createApp } from 'vue'
import './styles/main.scss'
import App from './App.vue'
import SvgIcon from '@components/SvgIcon.vue'
import Button from '@components/Button.vue'
import Radio from '@components/Radio.vue'
import Dialog from '@components/Dialog.vue'

createApp(App)
.component('w-icon',SvgIcon)
.component('w-button',Button)
.component('w-radio',Radio)
.component('w-dialog',Dialog)
.mount('#app')
