import Vue from 'vue'
import App from './App.vue'
import smartParse from './lib/index.js'
Vue.use(smartParse)
new Vue({
  el: '#app',
  render: h => h(App)
})
