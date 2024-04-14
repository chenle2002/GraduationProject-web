import Vue from 'vue'
import axios from 'axios'
import ViewUI from 'view-design'
// 加载 element 组件库
// eslint-disable-next-line import/no-extraneous-dependencies
import ElementUI from 'element-ui'
// 加载 element 组件库的样式
// eslint-disable-next-line import/no-extraneous-dependencies
import 'element-ui/lib/theme-chalk/index.css'
// eslint-disable-next-line import/no-extraneous-dependencies
import Vue2OrgTree from 'vue2-org-tree'
import App from './App'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css'
import './permission'

// 全局注册 element 组件库
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.use(Vue2OrgTree)
Vue.prototype.$axios = axios

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
