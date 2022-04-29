import { a } from './js/a.js'
const { b } = require('./js/b.js')
import './js/c.js'
import {d} from '@/js/d.jsx'
// 解析template模板，须使用vue.esm-bundler版本进行解析
// import {createApp} from 'vue/dist/vue.esm-bundler'
import { createApp } from 'vue'
import App from '@/vue/App'

// vue vue-loader中自带HMR 热更新  
// React react-refresh实时调整react组件
// 监听js文件 热更新变化  
if(module.hot){
    module.hot.accept("./js/c.js",()=>{
        console.log('c.js发生更新了')
    })
}

a()
b()
d()


const names = ["abc", "cba", "nba2"];
names.forEach(item => console.log(item));

// const componentA = {
//     template: '#component-a'
// }
// const app = createApp({
//     template:'#my-app',
//     components:{
//       componentA
//     }, 
//     data(){
//         return {
//             title:'template'
//         }
//     }
// })

const app = createApp(App)
app.mount('#app')