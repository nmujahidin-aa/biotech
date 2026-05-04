import './assets/main.css'
import 'vue3-easy-data-table/dist/style.css'
import './assets/styles/fix-easy-table.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './routes'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
