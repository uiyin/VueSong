export const selectPlay = function ({
  commit
}, {
  list,
  index
}) {
  commit('setsequenceList', list)
  commit('setplaylist', list)
  commit('setcurrentIndex', index)
  commit('setfullScreen', true)
  commit('setplaying', true)
}
