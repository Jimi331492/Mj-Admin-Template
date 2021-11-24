<!--
 * @Author: 龙际妙
 * @Date: 2021-10-15 14:26:34
 * @Description: 
 * @FilePath: \music-web-vue\src\views\Layout.vue
 * @LastEditTime: 2021-11-18 13:23:14
 * @LastEditors: Please set LastEditors
-->
<template>
  <v-header></v-header>
  <vSiderBar></vSiderBar>
  <div class="content-box" :class="isCollapse ? '' : 'content-collapse'">
    <v-tags></v-tags>
    <div class="content">
      <vue-particles
        class="login-background"
        color="#000"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="2"
        linesColor="#000"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
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
  overflow: hidden;

  .content {
    width: 100%;
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
    background-color: #fff;
    box-sizing: border-box;
    .login-background::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      // background-image: url('https://cdn.jsdelivr.net/gh/Jimi331492/cdn@1.3/img/cover/(4).jpg.webp');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      padding: 10px;
      // filter: blur(2px);
      // -webkit-filter: blur(2px);
      z-index: -1;
    }
    .login-background {
      width: 100%;
      height: 100%;
      padding: 10px;
      z-index: 0;
      position: absolute;
    }
  }
}

.content-collapse {
  left: 250px;
}
</style>
