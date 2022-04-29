<template>
    <div class="app">
        <h2>我是vue渲染出来的{{title}}</h2>
        <input type="text" v-model="message">
        <test></test>
    </div>
</template>

<script>
import test from './test'
export default {
    data() {
        return {
            title: "单文件组件2223333",
            message: ''
        };
    },
    components:{
        test
    }
};
</script>

<style lang="less">
.app {
    border: 1px solid green;
    h2 {
        color: red;
    }
}
</style>