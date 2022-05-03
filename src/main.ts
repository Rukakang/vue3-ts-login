import { createApp } from 'vue'
import App from './App.vue'
import vueRouter from './router'

//初始化路由，不暴露路由
const app = createApp(App);
//app.use(vueRouter);
app.mount('#app');
