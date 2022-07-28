// 列表成员数据类型
export interface ListInt {
  id: number
  introduce: string
  title: string
  userId: number
}
interface FormDataInt {
  title: string
  desc: string
  pageNum: number // 页数
  total: number // 总条数
  pageSize: number // 默认值
}
export class GoodsData {
  formInline: FormDataInt = {
    title: '',
    desc: '',
    pageNum: 1,
    total: 0,
    pageSize: 10
  };

  goodsList:ListInt[] = []
}
