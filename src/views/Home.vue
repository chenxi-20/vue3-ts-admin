<template>
  <el-container>
    <el-header height="80px">
      <el-row :gutter="20">
        <el-col :span="4" class="img-wrap">
          <div class="img-wrap">
            <img src="@/assets/logo.jpg" alt="logo" class="logo-img" />
          </div>
        </el-col>
        <el-col :span="19"><h2>后台管理系统</h2></el-col>
        <el-col :span="1" class="menu-right">
          <el-button type="text" @click="LoginOut">退出登录</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#666"
          class="el-menu-vertical-demo"
          :default-active="active"
          text-color="#fff"
          router
        >
          <!-- 开启路由模式，以index作为路由路径跳转 -->
          <el-menu-item :index="item.path" v-for="item in menu" :key="item.path">
            <el-icon><icon-menu /></el-icon>
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'HomeView',
  components: {},
  setup () {
    // 获取路由实例对象
    const Router = useRouter()
    const Route = useRoute() // 正在响应的路由,防刷新
    // console.log(Route.path)
    // console.log(Router.getRoutes())
    const menu = Router.getRoutes().filter(item => item.meta.isShow)
    // console.log(menu)

    // 退出登录
    const LoginOut = () => {
      localStorage.removeItem('token')
      Router.push('/login')
    }
    return { menu, active: Route.path, LoginOut }
  }
})
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #666;
  color: #fff;
  .img-wrap {
    height: 80px;
    width: 100px;
    overflow: hidden;
    .logo-img {
      position: relative;
      left: -22%;
      display: inline-block;
      height: 80px;
    }
  }
  h2 {
    height: 80px;
    text-align: center;
    line-height: 80px;
  }
  .menu-right {
    text-align: center;
    height: 80px;
    line-height: 80px;
  }
}
.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }
}
.el-main {
  height: calc(100vh - 80px);
}
</style>
