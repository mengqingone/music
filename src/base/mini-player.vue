<template>
  <div @click="turnFullScreen"><!---->
    <div class='mini-image' ref='miniImage'><img :src="currentSong.image" class='image'></div>
    <div class='mini-info'>
      <div class='mini-songname'>{{currentSong.songname}}</div>
      <div class='mini-singer'>{{currentSong.singer}}</div>
    </div>
    <div class='mini-control'>
      <process-circle :percent="percent"
                      :circleDiameter="diameter"
                      @controlToggle="controlToggle">
        <div class='play-mini' :class="playingState? 'icon-pause-mini': 'icon-play-mini'" ></div>
      </process-circle>
      <div class='icon-playlist'></div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import processCircle from '@/base/process-circle'
export default {
  props: ['percent'],
  data() {
    return {
      name: 'mini-player',
      diameter: 34,
      currentTime: 0
    }
  },
  computed: {
    ...mapGetters({
      currentSong: 'getCurrentSong',
      playingState: 'getPlaying',
      fullgreen: 'getFullScreen'
    })
  },
  components: {
    processCircle
  },
  methods: {
    ...mapMutations({
      setPlayingState: 'SET_PLAYINGSTATE',
      setFullScreen: 'SET_FULLSCREEN'
    }),
    controlToggle() {
      this.setPlayingState(!this.playingState)
    },
    turnFullScreen() {
      this.setFullScreen(true)
    }
  }
}
</script>

<style lang="stylus" scoped>
.mini-image
  width: 40px
  height: 40px
  padding: 0 10px 0 20px
  .image
    width: 100%
    height: 100%
    border-radius: 50%
.mini-info
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  line-height: 20px;
  overflow: hidden;
  .mini-songname
    margin-bottom: 2px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
    color: #fff;
  .mini-singer
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    color: hsla(0,0%,100%,.3);
.mini-control
  display flex
  width: 100px
  flex-direction row
  align-items center
  justify-content space-around
  font-size 30px
  color rgba(255,205,49,.5)
</style>
