// 以下写的都是为了防止storge过期，加入原型链是为了其他页面也能用
const storgeMemery = {
  setvalue: (key, value, expire) => {
    let obj = {
      data: value,
      time: Date.now(),
      expire: expire
    }
    localStorage.setItem(key, JSON.stringify(obj))
  },
  getvalue: (key) => {
    let val = localStorage.getItem(key)
    if (!val) {
      return null
    }
    val = JSON.parse(val)
    if (Date.now() - val.time > val.expire) {
      localStorage.removeItem(key)
      return null
    }
    return val.data
  }

}
export default storgeMemery
