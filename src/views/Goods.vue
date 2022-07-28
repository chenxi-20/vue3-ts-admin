<template>
  <div class="select-top">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formInline.title" placeholder="请输入标题关键字" />
      </el-form-item>
      <el-form-item label="详情">
        <el-input
          v-model="formInline.desc"
          placeholder="请输入详情关键字"
          v-debounce:2000.input="onSearch"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-throttle:1000.click="onSubmit"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="id" label="商品ID" width="180" />
      <el-table-column prop="title" label="商品名称" width="180" />
      <el-table-column prop="introduce" label="商品详情" />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="formInline.total"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, watch } from 'vue'
import { getGoodsList } from '@/request/login'
// 导入data实例化数据
import { GoodsData, ListInt } from '@/type/goods'
export default defineComponent({
  setup () {
    onMounted(() => {
      getGoodsLs() // 获取商品列表
    })
    const data = reactive(new GoodsData()) // 创建data对象实例
    // 设置table行的样式
    const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
      if (rowIndex % 2 === 1) {
        return 'warning-row'
      } else if (rowIndex % 2 === 0) {
        return 'success-row'
      }
      return ''
    }
    const getGoodsLs = async () => {
      const res = await getGoodsList()
      // console.log(res)
      data.goodsList = res.data
      data.formInline.total = res.data.length
    }
    const currentChange = (pageNum: number) => {
      data.formInline.pageNum = pageNum
      console.log(pageNum)
    }
    const sizeChange = (pageSize:number) => {
      data.formInline.pageSize = pageSize
      console.log(pageSize)
    }
    // 设置一个计算属性，前端自己实现分页的效果
    // 计算属性的简单用法
    const dataList = computed<ListInt[]>(() => {
      const { pageNum, pageSize } = data.formInline
      return data.goodsList.slice((pageNum - 1) * pageSize, pageNum * pageSize)
    })
    // 详情检索
    const onSearch = (value: string) => {
      console.log(data.formInline.desc)
    }
    const onSubmit = () => {
      const { goodsList } = data
      const { title, desc } = data.formInline
      console.log('点击查询')
      if (title) {
        data.goodsList = goodsList.filter(item => item.title.indexOf(title) !== -1)
      }
      if (desc) {
        data.goodsList = goodsList.filter(item => item.introduce.indexOf(desc) !== -1)
      }
      data.formInline.total = data.goodsList.length
    }
    // 监听多个单一属性值
    watch([() => data.formInline.title, () => data.formInline.desc], (newV, oldV) => {
      // console.log(newV, oldV) // newV是一个新的数组，oldV是老的数组
      if (newV.every(item => !item)) { // 两个搜索框都没值则重新请求接口
        getGoodsLs()
      }
    })
    return {
      ...toRefs(data),
      tableRowClassName,
      currentChange,
      sizeChange,
      onSearch,
      onSubmit,
      dataList
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
::v-deep .el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
