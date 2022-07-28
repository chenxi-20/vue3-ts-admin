interface RoleInt {
  role: number
  roleName: string
}
// 用户列表类型
export interface UserListInt {
  id: number
  nickName: string
  role: RoleInt[]
  userName: string
}
// 角色列表类型
interface RoleListInt {
  authority?: number[]
  roleId: number
  roleName: string
}
// 搜索数据
interface SearchDataInt {
  nickName: string
  role: number
}
// 编辑数据
interface EditDataInt {
  id: number
  nickName: string
  role: number[]
  userName: string
}
export class InitData {
  userList:UserListInt[] = [] // 用来接收用户信息的列表

  roleList:RoleListInt[] = [] // 用来接收角色信息的列表

  SearchData:SearchDataInt = {
    nickName: '',
    role: 0
  }

  isShowDialog = false

  EditData:EditDataInt = {
    id: 0,
    nickName: '',
    role: [],
    userName: ''
  }
}
