<template>
  <transition name="disc">
    <music-list :songs="songList"
              :title="currentDisc.dissname"
              :bg-image="currentDisc.imgurl">
    </music-list>
  </transition>
</template>

<script>
import musicList from '@/components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getDiscList} from '@/api/disc'
import {createSong, setUrl} from '@/common/js/song.js'
export default {
  data() {
    return {
      name: 'disc',
      songList: []
    }
  },
  components: {
    musicList
  },
  computed: {
    ...mapGetters({
      currentDisc: 'getCurrentDisc'
    })
  },
  watch: {
    songList(val) {
      if (val.length > 0) {
        this.adjustList(val, 0)
      }
    }
  },
  created() {
    if (!this.currentDisc || !this.currentDisc.dissid) {
      this.$router.push('/recommend')
      return
    }
    getDiscList(this.currentDisc.dissid).then(
      (res) => {
        let list = res.data.cdlist[0].songlist
        if (list && list.length > 0) {
          this.buildList(list)
        }
      },
      (err) => {
        console.log(err)
      }
    )
  },
  methods: {
    adjustList(list, i) {
      if (i < list.length) {
        setUrl(list[i]).then(() => {
          this.adjustList(list, i + 1)
        }, err => console.log(err)
        )
      }
    },
    buildList(list) {
      list.forEach(element => {
        if (element.albumid !== 0 && element.pay.payplay === 0) { // 过滤付费播放音乐
          this.songList.push(createSong(element))
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.disc-page
  position fixed
  left: 0
  right: 0
  bottom: 0
  top: 0
.disc-enter, .disc-leave-to {
  transform translateX(100%)
}
.disc-enter-active,.disc-leave-active{
  transition all .4s
}

</style>
