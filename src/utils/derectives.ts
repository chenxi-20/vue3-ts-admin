// 此文件就是为了封装全局的自定义指令
class Instructions {
  public app: any = '' // 指定实例对象的app属性为公共属性

  public init (app:any) {
    this.app = app
    // this.inputThrottle()
    // this.clickThrottle()
    this.debounce()
    this.throttle()
  }

  // 新方法bindding的arg就是传入的防抖时间，value就是防抖要执行的函数
  private debounce () {
    this.app.directive('debounce', {
      mounted (el: any, binding: any) {
        // console.log(binding)
        const delay = binding.arg || 500 // 防抖时间
        let timer:any = null
        const eventName = Object.keys(binding.modifiers)[0] || 'click' // binding.modifiers可以获取监听事件名称,默认点击事件
        // console.log(eventName) // 要监听的事件名v-debounce:2000.click
        el.addEventListener(eventName, () => {
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            binding.value()
          }, delay)
        })
      }
    })
  }

  // 节流
  private throttle () {
    this.app.directive('throttle', {
      mounted (el: any, binding: any) {
        const delay = binding.arg || 500 // 节流时间
        // let flag = true
        let timer:any = null
        const eventName = Object.keys(binding.modifiers)[0] || 'click'
        el.addEventListener(eventName, () => {
          // if (!flag) return
          // flag = false
          // timer = setTimeout(() => {
          //   binding.value()
          //   clearTimeout(timer)
          //   timer = null
          //   flag = true
          // }, delay)
          if (!timer) {
            timer = setTimeout(() => {
              binding.value()
              clearTimeout(timer)
              timer = null
            }, delay)
          }
        })
      }
    })
  }

  // 老套的方法，不使用，兼容性太差
  // // 私有方法:只能在类内部访问的方法和属性；外部无法访问；
  // // 输入节流
  // private inputThrottle () {
  //   this.app.directive('input-throttle', {
  //     mounted (el:any, binding:any) {
  //       // console.log(el, binding)
  //       const debounceTime:number = binding.value || 500 // 节流时间
  //       let timer:any = null
  //       el.addEventListener('input', (event:any) => {
  //         if (!timer) {
  //           timer = setTimeout(() => {
  //             timer = null
  //           }, debounceTime)
  //         } else { // 如果input事件触发，定时器还在，则阻止事件的发生
  //           event && event.stopImmediatePropagation()
  //         }
  //       }, true)
  //     }
  //   })
  // }

  // // 点击节流
  // private clickThrottle () {
  //   this.app.directive('click-throttle', {
  //     mounted (el:any, binding:any) {
  //       const debounceTime:number = binding.value || 500
  //       let timer:any = null
  //       el.addEventListener('click', (event:any) => {
  //         if (!timer) {
  //           timer = setTimeout(() => {
  //             timer = null
  //           }, debounceTime)
  //         } else {
  //           event && event.stopImmediatePropagation()
  //         }
  //       }, true)
  //     }
  //   })
  // }
}

// 默认导出类实例
export default new Instructions()
