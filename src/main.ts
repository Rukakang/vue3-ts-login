import { createApp } from 'vue'
import App from './App.vue'
import {initRouter} from './router'

//初始化路由，不暴露路由
const app = createApp(App);
//app.use(vueRouter);
initRouter(app);
app.mount('#app');
