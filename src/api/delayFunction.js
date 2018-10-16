// 延迟函数 函数柯里化
export function delayFunction(fun, delay) {
  let timer = null
  return function(...arg) {
    if (timer != null) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fun.apply(this, arg)
    }, delay)
  }
}