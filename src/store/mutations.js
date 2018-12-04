let mutations = {
  // state代表整个数据
  alterflag (state, flag) {
    state.gonggaoflag = flag
  },
  // 改变购物车
  changeshopcar (state, content) {
    state.shopcar = content
  }
}
export default mutations
