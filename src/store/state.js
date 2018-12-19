import {
  playMode
} from '@/store/config.js'
export default {
  token: '',
  singer: '',
  playing: false, // 播放状态
  fullScreen: false, // 全屏还是底部
  playlist: [], // 播放列表 可能是顺序也可以是随机顺序
  sequenceList: [], // 顺序播放列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1 // 当前播放的列表中序号
}
