import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import naive from 'naive-ui'

import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(naive)

app.mount('#app')
