<template>
  <div class="xieyicontent"
       @click="closeruleflag">
    <!--背景图层开始-->
    <div class="zhezhaocontent"></div>
    <!--背景图层结束-->
    <!--居中显示开始-->
    <div class="contentall">
      <!--卡槽开始-->
      <slot name="logincontent"></slot>
      <slot name="dialogcontent"></slot>
      <slot name="xieyicontent"></slot>
      <!--卡槽结束-->
    </div>
    <!--居中显示结束-->
  </div>
</template>

<script>

export default {
  data () {
    return {
      mesage: '协议'
    }
  },
  methods: {
    closeruleflag () {
      this.$emit('closeflag', false)
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
.xieyicontent {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: hidden;
  .zhezhaocontent {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  .contentall {
    text-align: center;
    font-size: 14px;
    color: white;
    position: absolute;
    left: 20%;
    top: 50%;
    transform: translate(0, -50%);
    width: 60%;
    z-index: 12;
    line-height: 20px;
  }
}
</style>
