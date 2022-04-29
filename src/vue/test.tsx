// export default ()=> <div>test</div>

import { defineComponent, ref } from "vue";

// export default defineComponent({
//     data(){
//         return {
//             t:'111111'
//         }
//     },
//     render(){
//         return <div>{this.t}</div>
//     }
// })

export default defineComponent({
    
    setup(){
        const t = ref(111)
        return ()=>
        <>
         {t.value}        
        <input v-model={t.value}></input>
        </>
    }
})