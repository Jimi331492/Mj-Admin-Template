<!--
 * @Author: 龙际妙
 * @Date: 2021-10-15 14:26:34
 * @Description: 
 * @FilePath: \music-web-vue\src\views\Layout.vue
 * @LastEditTime: 2021-11-08 18:24:31
 * @LastEditors: Please set LastEditors
-->
<template>
  <v-header></v-header>
  <vSiderBar></vSiderBar>
  <div class="content-box" :class="isCollapse ? '' : 'content-collapse'">
    <v-tags></v-tags>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import { getUserInfo } from '../api/system/user'
import vHeader from '../components/public/Header.vue'
import vSiderBar from '../components/public/SideBar.vue'
import vTags from '../components/public/Tags.vue'
export default {
  data() {
    return {}
  },
  components: {
    vHeader,
    vSiderBar,
    vTags,
  },
  created() {},
  mounted() {},
  computed: {
    isCollapse() {
      return this.$store.getters.collapse
    },
  },
  methods: {},
}
</script>

<style scoped lang="less">
.content-box {
  position: absolute;
  left: 65px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;

  .content {
    width: auto;
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
}

.content-collapse {
  left: 250px;
}
</style>
