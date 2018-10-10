import Vue from 'vue'
import App from './app.vue'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render:(h)=>h(App)
}).$mount(root)

//vue的内容 插入到 div

