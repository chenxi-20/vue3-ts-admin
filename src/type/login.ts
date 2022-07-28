export interface LoginDataInt {
  username: string
  password: string
}
// 实例化一个data对象：可以直接通过new一个实例，创建一个实例化对象
// 作用：指定data数据的类型
export class LoginData {
  ruleForm:LoginDataInt = {
    username: '',
    password: ''
  }
}

// export interface resInt {
//   code: number
//   data?: object
// }
