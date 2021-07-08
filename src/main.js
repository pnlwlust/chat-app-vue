import {createApp } from 'vue'
import installElementPlus from './plugins/element'
import router from "@/router";
import App from "@/App";
import store from "@/store";
import socket from "./utils/socket.service";

const app = createApp(App)
app.use(router)
app.use(store)
//integrate socket io
app.config.globalProperties.$socket = socket;
installElementPlus(app)
app.mount('#app')