// 角色接口类型定义
export interface RoleListInt {
  authority: number[]
  roleId: number
  roleName: string
}

export class InitData {
  roleList:RoleListInt[] = []
}
