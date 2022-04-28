import { a } from './js/a.js'
const { b } = require('./js/b.js')
import './js/c.js'
// 解析template模板，须使用vue.esm-bundler版本进行解析
// import {createApp} from 'vue/dist/vue.esm-bundler'
import { createApp } from 'vue'
import App from './vue/App.vue'

a()
b()


const names = ["abc", "cba", "nba"];
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