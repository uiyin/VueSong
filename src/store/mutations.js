// 以下写的都是为了防止storge过期，加入原型链是为了其他页面也能用
Storage.prototype.setvalue = (key, value, expire) => {
  let obj = {
    data: value,
    time: Date.now(),
    expire: expire
  }
  localStorage.setItem(key, JSON.stringify(obj))
}
// 表示要是过期了就清除
Storage.prototype.getvalue = key => {
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
let overtime = 1000 * 60 * 60 * 24 * 7 // 一周以后自动清除
let mutations = {
  // state代表整个数据
  changetoken (state, value) {
    state.token = value
    try {
      localStorage.setvalue('token', value, overtime)
    } catch (e) {}
  },
  setsinger (state, value) {
    state.singer = value
  }
}
export default mutations
