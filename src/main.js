import './assets/scss/app.scss'

import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
const fb = require('./firebaseConfig.js')
Vue.config.productionTip = false

// handle page reloads
let app
fb.auth.onAuthStateChanged(user => {
    console.log('main.js', user)
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})
