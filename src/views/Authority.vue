<!-- 修改权限页面：路由可以传参 -->
<template>
  <div>
    <el-tree
      ref="treeRef"
      :data="list"
      show-checkbox
      node-key="roleId"
      :default-expanded-keys="authority"
      :default-checked-keys="authority"
      :props="defaultProps"
      check-strictly
    />
    <el-button @click="changeAuthority">确认修改</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
// 获取路由实例
import { useRoute } from 'vue-router'
import { InitData } from '@/type/authority'
import { getAuthorityList } from '@/request/login'
export default defineComponent({
  setup () {
    onMounted(() => {
      getAuthority()
    })
    const Route = useRoute()
    // console.log(Route.query, Route.params)
    const params: any = Route.params
    // 新法：要初始化data的相关的值；
    const data = reactive(new InitData(params.id, params.authority))
    const getAuthority = async () => {
      const res = await getAuthorityList()
      data.list = res.data
      // console.log(res, data.authority)
    }
    const defaultProps = {
      children: 'roleList',
      label: 'name'
    }
    // 修改
    const changeAuthority = () => {
      console.log('通过ref实例获取到选择的key值数组', data.treeRef.getCheckedKeys().sort((a, b) => a - b))
      // data.treeRef.getCheckedKeys().sort((a:number, b:number) => a - b)
      // 传给后台让后台去修改
    }
    return { ...toRefs(data), defaultProps, changeAuthority }
  }
})
</script>

<style scoped></style>
