<!--
 * @Author: 龙际妙
 * @Date: 2021-10-15 14:27:30
 * @Description: 
 * @FilePath: \music-web-vue\src\components\public\SideBar.vue
 * @LastEditTime: 2021-11-08 02:44:16
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
      <!-- <el-menu-item
        ><i class="el-icon-s-home"></i>
       
        <span>首页</span></el-menu-item
      > -->
      <el-sub-menu v-show="item.menus.length !== null" :index="item.menuId + ''" v-for="(item, index) in menuList" :key="index">
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
  {{}}
</template>

<script>
// import { getMenu } from '../../api/home/home'
// import { getRoleMenus } from '../../api/system/role'
export default {
  data() {
    return {
      collapse: false,
      menuList: [],
      quanxian: true,
      wuquan: false,
      roleId: '',
      userId: '',
      roleIdList: [],
      show: true,
      form: {
        roleId: '',
      },
      activePath: '',
    }
  },
  created() {
    this.getMenuList()
  },
  mounted() {
    // this.getMenuList()
  },
  computed: {
    isCollapse() {
      return this.$store.state.collapse
    },
    isMenusInfo() {
      return this.$store.state.menusInfo
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

    // 获取菜单列表
    async getMenuList() {
      this.menuList = this.isMenusInfo
    },
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
}

.sidebar > ul {
  height: 100%;
}
</style>
