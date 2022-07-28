interface listInt {
  name: string
  roleId: 1
  roleList?: listInt[]
  viewRole?: string
}

// 初始化路由传参的值
export class InitData {
  id: number
  authority: number[]
  constructor (id: number, authority: number[]) {
    this.id = id
    this.authority = authority
  }

  // 树列表的数据
  list:listInt[] = []

  treeRef:any // 定义一个ref对象
}
