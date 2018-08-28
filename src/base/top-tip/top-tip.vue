<template>
  <transition name="tip" @after-enter="transitionComplete">
    <div class="top-tip" v-show="showFlag">
      <div  class="tip-title">
        <i  class="icon-ok"></i>
        <span class="text">1首歌曲已经添加到播放列表</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      name: 'topTip',
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    transitionComplete() {
      this.hide()
    }
  }
}
</script>

<style lang="stylus" scoped>
.tip-enter-active, &.tip-leave-active
  transition: all .3s linear
.tip-enter, .tip-leave-to
  transform: translate3d(0, -100%, 0)
.top-tip
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
  background-color: #666;
  .tip-title
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok
      font-size: 14px;
      color: #ffcd32;
      margin-right: 4px;
    .text
      font-size: 14px;
      color: #fff;
</style>
