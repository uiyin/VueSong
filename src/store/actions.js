import {
  playMode
} from './config.js'

export const selectPlay = function ({
  commit,
  state
}, {
  list,
  index
}) {
  if (state.mode === playMode.random) {
    // 打乱数组
    let _arr = list.slice()
    for (let i = 0; i < _arr.length; i++) {
      let j = Math.floor(Math.random() * (i - 0 + 1) + 0)
      let t = _arr[i]
      _arr[i] = _arr[j]
      _arr[j] = t
    }
    commit('setplaylist', _arr)
    index = _arr.findIndex((item) => {
      console.log(state.sequenceList)
      return item.id === state.sequenceList[index].id
    })
    console.log('最后的' + index)
  } else {
    commit('setsequenceList', list)
    commit('setplaylist', list)
  }

  commit('setcurrentIndex', index)
  commit('setfullScreen', true)
  commit('setplaying', true)
}
