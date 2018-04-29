// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import dom from './utils/dom'

console.log('') // eslint-disable-line
console.log('%cAntoine Lin <contact@antoinelin.com>', 'background: #304FFE; padding:5px; font-size: 10px; font-family: Lucida Console, sans-serif; color: #FFF;') // eslint-disable-line
console.log('%c 📣 Twitter : https://twitter.com/toinelin', 'background: #304FFE; padding:5px; font-size: 10px; font-family: Lucida Console, sans-serif; color: #FFF;') // eslint-disable-line
console.log('%c ⌨️ Github : https://github.com/toinelin', 'background: #304FFE; padding:5px; font-size: 10px; font-family: Lucida Console, sans-serif; color: #FFF;') // eslint-disable-line
console.log('') // eslint-disable-line

global.dom = dom

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
