import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import store from './store'
import router from './router'
import 'xe-utils'
// 给 vue 实例挂载全局窗口对象
import '@/permission' // permission control
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
