import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store/index.js'

const unsync = sync(store, router)

Vue.config.productionTip = false

Vue.use(VueResource)


new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
