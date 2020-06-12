import Vue from 'vue'
import App from './App'
import Status from './pages/components/status/status.vue'
Vue.config.productionTip = false
Vue.component('Status',Status)
App.mpType = 'app'
import lyzmldatepicker from './components/lyzml-datepicker/lyzml-datepicker.vue'
import uniLoadMore from './components/uni-load-more/uni-load-more.vue'
import smartParse from 'vue-smart-parse';
 Vue.use(smartParse)

Vue.component('lyzml-datepicker',lyzmldatepicker);
Vue.component('uniLoadMore',uniLoadMore);

import fetch from './libs/request.js'
import api from './api'

Vue.prototype.$fetch = fetch
Vue.prototype.$api = api

// 引入dayjs
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 引入相对时间
import 'dayjs/locale/zh-cn' // 引入中文
dayjs.locale('zh-cn') // 引入中文
dayjs.extend(relativeTime)
Vue.prototype.$dayjs = dayjs // 放入原型中

import uView from "uview-ui";
Vue.use(uView);

// import gcoord from 'gcoord'
// Vue.prototype.$gcoord = gcoord

const app = new Vue({
    ...App
})
app.$mount()
