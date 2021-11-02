<!--
 * @Author: 龙际妙
 * @Date: 2021-10-15 14:27:30
 * @Description: 
 * @FilePath: \music-web-vue\src\components\public\SideBar.vue
 * @LastEditTime: 2021-11-02 22:18:41
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
      <el-sub-menu :index="item.menuId + ''" v-for="(item, index) in menuList" :key="item.menuId">
        <template #title>
          <i :class="iconsObj[index]"></i>
          <!-- 文本 -->
          <span>{{ item.menuName }}</span>
        </template>
        <el-menu-item :index="'/' + subitem.url" v-for="subitem in item.menus" :key="subitem.id" @click="savaNavState('/' + subitem.url)">
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
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
import { getRoleMenus } from '../../api/system/role'
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
      iconsObj: ['el-icon-user', 'el-icon-key', 'el-icon-shopping-cart-1', 'el-icon-s-order', 'el-icon-document-copy'],
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
    getRoleId() {
      return this.$store.state.userBaseInfo
    },
  },
  methods: {
    // 获取菜单列表
    async getMenuList() {
      var role = this.getRoleId.roles
      console.log(role)
      var roleId = role[0].roleId
      const { data: res } = await getRoleMenus(roleId)

      // console.log(res)
      if (res.code !== 200) return this.$message.error('获取菜单列表失败！')
      this.menuList = res.data
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
