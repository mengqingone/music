<template>
  <music-list :songs="songList"
              :title="title"
              :bg-image="bgImage"
              >
  </music-list>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSongList} from '@/api/singer.js'
import {createSong, setUrl} from '@/common/js/song.js'
import musicList from '@/components/music-list/music-list'
export default {
  data() {
    return {
      name: 'singerDetail',
      LEN: 50,
      songList: []
    }
  },
  watch: {
    songList(val) {
      if (val.length === this.LEN) {
        this.adjustList(val, 0)
      }
    }
  },
  components: {
    musicList
  },
  computed: {
    title () {
      return this.singer.singerName
    },
    bgImage() {
      return this.singer.imgUrl
    },
    ...mapGetters({
      singer: 'getSinger'
    })
  },
  created() {
    if (!this.singer || !this.singer.id) {
      this.$router.push('/singer')
      return
    }
    getSongList(this.singer.id).then(
      (res) => {
        let songsList = res.data.data.list
        if (songsList && songsList.length > 0) {
          this.buildList(songsList)
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
        })
      }
    },
    buildList(list) {
      list.forEach(element => {
        this.songList.push(createSong(element.musicData))
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>