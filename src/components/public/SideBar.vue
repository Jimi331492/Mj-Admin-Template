<!--
 * @Author: 龙际妙
 * @Date: 2021-10-15 14:27:30
 * @Description: 
 * @FilePath: \music-web-vue\src\components\public\SideBar.vue
 * @LastEditTime: 2021-11-09 04:42:01
 * @LastEditors: Please set LastEditors
-->
<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      @open="btn"
      :default-active="activePath"
      :collapse="isCollapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <el-sub-menu v-show="item.menus.length !== null" :index="item.menuId + ''" v-for="(item, index) in isMenusList" :key="index">
        <template #title>
          <i :class="item.icon"></i>
          <!-- 文本 -->
          <span>{{ item.menuName }}</span>
        </template>
        <el-menu-item :index="'/' + subitem.url" v-for="subitem in item.menus" :key="subitem.id" @click="savaNavState('/' + subitem.url)">
          <!-- 图标 -->
          <i :class="subitem.icon"></i>
          <!-- 文本 -->
          <span>{{ subitem.menuName }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import { getAsyncRouter, getFinallyRouter, mountedRouter } from '../../utils/addRouter'

export default {
  data() {
    return {
      menuList: [],
      show: true,
      activePath: '',
    }
  },
  created() {
    getAsyncRouter(this.isMenusList)
    const finallyRouter = getFinallyRouter()
    mountedRouter(finallyRouter)
  },
  computed: {
    isCollapse() {
      console.log(this.$store.getters.collapse)
      return this.$store.getters.collapse
    },
    // 获取菜单列表
    isMenusList() {
      return this.$store.getters.menusInfo
    },
  },

  methods: {
    // getPerms(data) {
    //   data.forEach((item, i) => {
    //     console.log(item)
    //     if (item.menus) {
    //       // 调用递归函数
    //       this.getPerms(item.menus)
    //     }
    //     if (item.menus) {
    //       if (data.perms) {
    //         console.log(data.perms)
    //         let obj = {
    //           menuId: data[i].menuId,
    //           perms: data[i].perms,
    //         }
    //         console.log(obj)
    //         this.$store.dispatch('SET_BUTTONS', obj)
    //       }
    //     }
    //   })
    // },

    btn(e) {
      console.log(e)
    },
    // 保存链接(组件)的激活状态
    savaNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  },
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}

.sidebar > ul {
  height: 100%;
}
</style>
