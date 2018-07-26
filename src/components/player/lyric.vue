<template>
  <div class="page">
    hello
  </div>
</template>

<script>
import {getSongLyric} from '@/api/song'
import {mapMutations} from 'vuex'
export default {
  props: {
    song: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      name: 'lyric'
    }
  },
  watch: {
    song(val) {
      if (val.lyric === '') {
        this.setLyric()
      }
    }
  },
  mounted() {
    if (this.song.lyric === '') {
      this.setLyric()
    }
  },
  methods: {
    ...mapMutations({
      setCurrentLyric: 'SET_CURRENTLYRIC',
      setFullScreen: 'SET_FULLSCREEN'
    }),
    setLyric() {
      getSongLyric(this.song.songmid).then(function(res) {
        this.setCurrentLyric(res.lyric)
        console.log(res.lyric)
      }, function(err) {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
