<!-- 角色列表页面 -->
<template>
  <div>
    <!-- <el-row> -->
      <el-button type="primary" v-throttle.click="addRole">添加角色</el-button>
    <!-- </el-row> -->
    <el-table :data="roleList" style="width: 100%">
      <el-table-column prop="roleId" label="角色ID" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="role" label="操作">
        <template #default="{ row }">
          <el-button link size="small" @click.prevent="gotoAuthority(row)">
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getRoleList } from '@/request/login'
import { InitData, RoleListInt } from '@/type/role'
// 导入路由实例
import { useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    onMounted(() => {
      getRole()
    })
    const Router = useRouter()
    const data = reactive(new InitData())
    const getRole = async () => {
      const res = await getRoleList()
      data.roleList = res.data
      console.log(res)
    }
    // 添加角色
    const addRole = () => {
      ElMessageBox.prompt('请输入角色名称', '添加角色', {
        confirmButtonText: '添加',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          // value表示输入的值
          if (value) {
            data.roleList.push({
              authority: [],
              roleId: data.roleList.length + 1,
              roleName: value
            })
          }
          ElMessage({
            type: 'success',
            message: `${value}角色添加成功`
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消添加'
          })
        })
    }
    // 跳转权限页面
    const gotoAuthority = (row:RoleListInt) => {
      // console.log(row)
      // path跳转
      // Router.push({
      //   path: '/authority',
      //   query: {
      //     id: row.roleId,
      //     authority: row.authority.join(',')
      //   }
      // })
      // 推荐：方法二name跳转。此法不会在地址栏显示参数
      Router.push({
        name: 'Authority',
        params: {
          id: row.roleId,
          authority: row.authority
        }
      })
    }
    return { ...toRefs(data), addRole, gotoAuthority }
  }
})
</script>

<style lang="scss" scoped></style>
