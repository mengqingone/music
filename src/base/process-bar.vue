<template>
  <div class='process-bar'
    ref="processbar"
    @click="progressClick">
    <div class='process-track' ref="processtrack" >
      <div class='process-btn'
            ref="processbtn"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd">
        <div class='btn-center' ref="btncenter"></div>
      </div>
      <div class='played-progress' ref="playedprogress"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      name: 'process-bar',
      drag: {
        dragStart: false,
        startX: 0
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.$processbar = this.$refs.processbar
      this.$processTrack = this.$refs.processtrack
      this.$processbtn = this.$refs.processbtn
      this.$playedprogress = this.$refs.playedprogress
      this.processTrackWidth = parseFloat(this.$processTrack.clientWidth)
    })
  },
  watch: {
    percent(val) {
      const BTN_LEN = 16
      if (!this.drag.dragStart && val >= 0) {
        let progress = val * (this.processTrackWidth - BTN_LEN)
        this._offset(progress)
      }
    }
  },
  methods: {
    _offset(offsetWidth) {
      this.$playedprogress.style.width = `${offsetWidth}px`
      this.$processbtn.style.left = `${offsetWidth}px`
    },
    touchMove(e) {
      const BTN_LEN = 16
      if (this.drag.dragStart) {
        let currentPosition = e.targetTouches[0].pageX
        let distance = currentPosition - this.drag.startX + this.drag.startLeft
        distance = Math.min(this.processTrackWidth - BTN_LEN, Math.max(0, distance))
        this._offset(distance)
      }
    },
    touchStart(e) {
      this.drag.dragStart = true
      this.drag.startX = e.targetTouches[0].pageX
      this.drag.startLeft = parseFloat(this.$playedprogress.clientWidth)
    },
    touchEnd() {
      this.$bus.$emit('jumpTo', this._getPercent())
      this.drag.dragStart = false
    },
    _getPercent() {
      const BTN_LEN = 16
      let playeddistance = parseFloat(this.$playedprogress.clientWidth)
      return playeddistance / (this.processTrackWidth - BTN_LEN)
    },
    progressClick(e) {
      let BTN_LEN = 16
      let pageX = e.pageX
      let left = this.$processbar.getBoundingClientRect().left
      let _offsetWidth = Math.min(this.processTrackWidth - BTN_LEN, Math.max(0, pageX - left - BTN_LEN))
      this._offset(_offsetWidth)
      this.$bus.$emit('jumpTo', this._getPercent())
    }
  }
}
</script>

<style lang="stylus" scoped>
.process-bar
    position relative
    width: 80%
    height: 30px
    .process-track
      position absolute
      top: 50%
      left: 5%
      z-index 1
      margin-top: -2px
      width: 90%
      height: 4px
      background-color rgba(0,0,0,.3);
  .process-btn
    position: absolute
    z-index 10
    left: 0
    top: 50%
    margin-top: -8px
    width: 16px
    height: 16px
    border-radius 16px
    background-color white
    .btn-center
      position absolute
      width: 10px
      height: 10px
      top:50%
      left:50%
      margin-left: -5px
      margin-top: -5px
      border-radius 10px
      background-color yellow
  .played-progress
      width:0
      height:100%
      background-color:#ffcd32
</style>
