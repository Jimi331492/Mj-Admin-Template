<!--
 * @Author: 龙际妙
 * @Date: 2021-11-04 14:57:49
 * @Description: 
 * @FilePath: \music-web-vue\src\views\Error.vue
 * @LastEditTime: 2021-11-10 18:02:44
 * @LastEditors: Please set LastEditors
-->

<template>
  <div class="container">
    <img src="../assets/404.png" alt="404 image" width="560" height="428" />
    <h2>噢！找不到页面!!!</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    margin-top: -100px;
    margin-bottom: 50px;
  }
}
</style>
