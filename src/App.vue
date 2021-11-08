<!--
 * @Author: 龙际妙
 * @Date: 2021-10-14 18:32:18
 * @Description: 
 * @FilePath: \music-web-vue\src\App.vue
 * @LastEditTime: 2021-11-08 18:18:49
 * @LastEditors: Please set LastEditors
-->
<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  created() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      console.log(this.$store.state)
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
}
</script>

<style lang="less"></style>
