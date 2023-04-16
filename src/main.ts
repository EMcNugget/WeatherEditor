import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import naive from 'naive-ui'

import './assets/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(naive)

app.mount('#app')
