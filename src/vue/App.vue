<template>
    <div class="app">
        <h2>我是vue渲染出来的{{title}}</h2>
        <input type="text" v-model="message">
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "单文件组件2223333",
            message: ''
        };
    },
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