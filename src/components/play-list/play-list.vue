<template>
  <transition name='playlist'>
    <div class='playlist-page' v-show="showlist" @click.self="close()">
      <div class='list-wrapper'>
        <div class="list-header">
          <h1 class="title">
            <i  class="icon" :class="currentMode" @click="changeMode"></i>
            <span class="text">{{modeDesc}}</span>
            <span class="clear">
              <i class="icon-clear" @click.stop="showDialog = true"></i>
            </span>
          </h1>
        </div>
        <list-content class='list-content'
                      ref="listContent"
                      :list="sequenceList"
                      @selectItem="selectSong"
                      @deleteItem="deleteSong"
                      :currentId="currentId"></list-content>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
              <span  class="text" @click.stop="addSong">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click.stop="close"><span>关闭</span></div>
      </div>
      <prompt prompt='确定要全部删除'
              v-show="showDialog"
              @cancel="closeDialog"
              @makeSure='deleteAll'></prompt>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>

<script>
import listContent from '@/base/list-content/list-content'
import prompt from '@/base/prompt/prompt'
import {mapActions} from 'vuex'
import {playMixin} from '@/api/mixin'
import playMode from '@/common/js/config.js'
import addSong from '@/components/add-song/add-song'
export default {
  mixins: [playMixin],
  data() {
    return {
      name: 'playlist',
      showlist: false,
      showDialog: false
    }
  },
  components: {
    listContent,
    prompt,
    addSong
  },
  computed: {
    currentId() {
      return this.currentSong.songid
    },
    modeDesc() {
      return this.mode === playMode.loop ? '循环播放' : this.mode === playMode.random ? '随机播放' : '顺序播放'
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong !== oldSong) {
        this.scrollToCurrentSong()
      }
    }
  },
  methods: {
    ...mapActions([
      'deleteAllSongs',
      'deleteOneSong'
    ]),
    close() {
      this.showlist = false
    },
    open() {
      this.showlist = true
      setTimeout(() => {
        this.$refs.listContent.refresh()
        this.scrollToCurrentSong()
      }, 20)
    },
    closeDialog() {
      this.showDialog = false
    },
    deleteAll() {
      this.deleteAllSongs()
    },
    selectSong(item) {
      let findId = this.playList.findIndex((content) => {
        return content.songid === item.songid
      })
      if (findId !== -1) {
        this.setCurrentIndex(findId)
        this.setPlayingState(true)
        this.scrollToCurrentSong()
      }
    },
    deleteSong(item) {
      this.deleteOneSong(item)
    },
    scrollToCurrentSong() {
      const scrolltime = 500
      let findId = this.sequenceList.findIndex((content) => {
        return content.songid === this.currentSong.songid
      })
      this.$refs.listContent.scrollToElement(findId, scrolltime)
    },
    addSong() {
      this.$refs.addSong.show()
    }
  }
}
</script>

<style lang="stylus" scoped>
.playlist-enter-active, .playlist-leave-active
  transition: opacity .8s
  .list-wrapper
    transition: all .8s
.playlist-enter, .playlist-leave-to
  opacity: 0
  .list-wrapper
    transform: translate3d(0, 100%, 0)
.playlist-page
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: rgba(0,0,0,.3);
  .list-wrapper
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #333;
    .list-header
      position: relative
      padding: 20px 30px 10px 20px
      .title
        display: flex;
        align-items: center;
        .icon
          margin-right: 10px;
          font-size: 30px;
          color: rgba(255,205,49,.5);
        .text
          flex: 1;
          font-size: 14px;
          color: hsla(0,0%,100%,.5);
    .list-content
      max-height: 240px;
      overflow: hidden;
    .list-close
      text-align: center;
      line-height: 50px;
      background: #222;
      font-size: 16px;
      color: hsla(0,0%,100%,.5);
    .list-operate
      width: 140px;
      margin: 20px auto 30px;
      .add
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid hsla(0,0%,100%,.5);
        border-radius: 100px;
        color: hsla(0,0%,100%,.5);
        .icon-add
          margin-right: 5px;
          font-size: 10px;
        .text
          font-size 12px
</style>
