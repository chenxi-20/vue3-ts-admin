<template>
  <div class="login-wrap">
    <el-form
      ref="formRef"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h1 class="title">vue3后台管理系统</h1>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="subLogin(formRef)" class="login-btn"
          >登录</el-button
        >
        <el-button @click="resetForm(formRef)" class="login-btn"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { LoginData } from '@/type/login'
import type { FormInstance } from 'element-plus'
import { Login } from '@/request/login'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    // 第一种不用ts：
    // const data = reactive({
    //   ruleForm: {
    //     username: '',
    //     password: ''
    //   }
    // })
    // ts的开发：而响应式数据，需要通过type文件夹中导出的接口/类指定类型，通过class来new一个实例化对象
    const data = reactive(new LoginData())

    // 因为rules数据不会发生改变，所以不用指定类型，不用消耗响应式
    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名长度在3-10之间', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入你的密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度在6-16之间', trigger: 'blur' }
      ]
    }
    // 创建表单ref对象
    const formRef = ref<FormInstance>()
    const Router = useRouter() // 路由实例对象
    // 点击登录
    const subLogin = (formEl: FormInstance | undefined) => {
      // console.log('formEl', formEl)
      if (!formEl) return
      formEl.validate(async (valid) => {
        if (valid) {
          const res = await Login(data.ruleForm)
          console.log(res)
          // 存储token
          localStorage.setItem('token', res.data.token)
          // 跳转到首页
          Router.push('/')
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    return { ...toRefs(data), rules, formRef, subLogin }
  }
})
</script>

<style lang="scss" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background: url('@/assets/login2.jpg') no-repeat;
  background-size: cover;
  padding: 1px; // 可以解决子元素margin导致父元素出现空白的情况
  .demo-ruleForm {
    margin: 200px auto;
    width: 500px;
    padding: 30px 40px;
    border-radius: 10px;
    background-color: #fff;
    .title {
      margin-bottom: 20px;
      text-align: center;
    }
    .login-btn {
      width: 48%;
    }
  }
}
</style>
