// import './assets/styles/global.scss';
import _ from 'lodash';
import Vue from 'vue'
import App from './App.vue'

// 获取环境变量，变量基于node生成
console.log("[env]:", process.env);

// 定义全局属性
Vue.config.productionTip = false
Vue.prototype.$env = process.env;

new Vue({
  render: h => h(App)
}).$mount('#app')
