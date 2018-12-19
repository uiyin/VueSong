import storgeMemery from './localstorge'
let overtime = 1000 * 60 * 60 * 24 * 7 // 一周以后自动清除
let mutations = {
  // state代表整个数据
  changetoken (state, value) {
    state.token = value
    try {
      storgeMemery.setvalue('token', value, overtime)
    } catch (e) {}
  },
  setsinger (state, value) {
    state.singer = value
  },
  setplaying (state, value) {
    state.playing = value
  },
  setfullScreen (state, value) {
    state.fullScreen = value
  },
  setplaylist (state, value) {
    state.playlist = value
  },
  setsequenceList (state, value) {
    state.sequenceList = value
  },
  setmode (state, value) {
    state.mode = value
  },
  setcurrentIndex (state, value) {
    state.currentIndex = value
  }
}
export default mutations
