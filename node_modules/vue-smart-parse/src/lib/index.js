import smart from './smartParse.vue'

const myPlugin = {    
    install(Vue, options) {
        Vue.prototype.smartParse = smart.smart
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(myPlugin)
  }

export default myPlugin

