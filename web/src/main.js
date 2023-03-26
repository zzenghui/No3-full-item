import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueParticles from 'vue-particles'
import axios from 'axios'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'animate.css';
import { ElLoading } from 'element-plus'






//封装axios
const server = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    // headers: {
    //     "Content-Type": "application/json;charset=utf-8"
    // }
})

let loadingobj = null
//请求拦截
server.interceptors.request.use(config => {
    loadingobj = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    return config
})

//相应拦截
server.interceptors.response.use(response => {
    loadingobj.close()
    return response.data
}, err => {
    ElMessage({
        message: "请求错误",
        grouping: true,
        type: "warning",
    });
})


const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueParticles)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$http = server




app.mount('#app')
