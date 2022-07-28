<!-- 用户列表页面 -->
<template>
  <div>
    <el-form :inline="true" :model="SearchData" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="SearchData.nickName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select
          v-model="SearchData.role"
          class="m-2"
          placeholder="请选择角色"
          size="large"
        >
          <el-option label="全部" :value="0" />
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-throttle.click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="用户ID" width="180" />
      <el-table-column prop="nickName" label="姓名" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-button
            v-for="item in scope.row.role"
            :key="item.role"
            type="text"
            size="small"
            @click.prevent="clickRow(scope.row)"
          >
            {{ item.roleName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="changeUser(row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="isShowDialog" title="编辑信息">
      <el-form :model="EditData">
        <el-form-item label="姓名" label-width="50px">
          <el-input v-model="EditData.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" :label-width="50">
          <el-select v-model="EditData.role" placeholder="请选择角色" multiple>
            <el-option label="全部" :value="0" />
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShowDialog = false">取消</el-button>
          <el-button type="primary" @click="updateItem"
            >更改</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'

import { getUserList, getRoleList } from '@/request/login'
import { InitData, UserListInt } from '@/type/user'
export default defineComponent({
  setup () {
    onMounted(() => {
      getUser()
      getRole()
    })
    const data = reactive(new InitData())
    const getUser = async () => {
      const res = await getUserList()
      data.userList = res.data
      // console.log(res)
    }
    const getRole = async () => {
      const res = await getRoleList()
      data.roleList = res.data
      // console.log(res)
    }
    // 点击表格
    const clickRow = (scope: any) => {
      console.log(scope)
    }
    // 点击查询
    const onSubmit = () => {
      const { userList } = data
      const { nickName, role } = data.SearchData
      console.log(nickName, role)
      if (nickName) {
        data.userList = userList.filter(
          (item) => item.nickName.indexOf(nickName) !== -1
        )
      }
      if (role) {
        data.userList = userList.filter((value) =>
          value.role.find((item) => item.role === role)
        )
      }
    }
    // 监听搜索框全是空的情况，重新获取数据
    watch(
      [() => data.SearchData.nickName, () => data.SearchData.role],
      (newV, oldV) => {
        if (!newV[0] && newV[1] === 0) {
          getUser() // 重新获取
        }
      }
    )
    // 弹窗编辑
    const changeUser = (row: UserListInt) => {
      data.isShowDialog = true
      data.EditData = {
        id: row.id,
        nickName: row.nickName,
        role: row.role.map((item:any) => item.role || item.roleId),
        userName: row.userName
      }
      // console.log(data.EditData)
    }
    // 更改
    const updateItem = () => {
      data.isShowDialog = false
      const { EditData, userList, roleList } = data
      const EditObj:any = userList.find(value => value.id === EditData.id)
      EditObj.nickName = EditData.nickName
      EditObj.role = roleList.filter(value => EditData.role.indexOf(value.roleId) !== -1)
      console.log(EditObj)
    }
    // toRefs解构reactive对象
    return { ...toRefs(data), clickRow, onSubmit, changeUser, updateItem }
  }
})
</script>

<style lang="scss" scoped></style>
