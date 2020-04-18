import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = "http://127.0.0.1:83/api/"

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
