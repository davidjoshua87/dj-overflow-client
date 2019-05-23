import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'animate.css/animate.min.css'
import 'semantic-ui-css/semantic.css'
require('semantic-ui-css/semantic.js')

let host = 'https://overflow-server.herokuapp.com/'

Vue.prototype.$http = axios.create({
    baseURL: host
})
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
