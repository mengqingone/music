<template>
  <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
</template>

<script>
import {mapGetters} from 'vuex'
import {getTopSongs} from '@/api/rank.js'
import {createSong, setUrl} from '@/common/js/song.js'
import musicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      name: 'rankSongs',
      songs: [],
      rank: true
    }
  },
  computed: {
    title () {
      return this.rankItem.ListName
    },
    bgImage() {
      if (this.songs && this.songs.length) {
        return this.songs[0].image
      }
    },
    ...mapGetters({
      rankItem: 'getRankItem'
    })
  },
  components: {
    musicList
  },
  watch: {
    songs(val) {
      if (val.length > 0) {
        this.adjustList(val, 0)
      }
    }
  },
  created() {
    this.requireNum = 0
    if (!this.rankItem || !this.rankItem.id) {
      this.$router.push('/rank')
      return
    }
    this.getSongs()
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
        if (element.data.pay.payplay === 0) { // 过滤付费音乐
          this.songs.push(createSong(element.data))
        }
      })
    },
    getSongs() {
      getTopSongs(this.rankItem.id).then((res) => {
        if (res.songlist && res.songlist.length > 0) {
          this.buildList(res.songlist)
        }
      }).catch((err) => {
        // 再次请求
        if (this.requireNum < 2) {
          this.getSongs()
          this.requireNum++
        }
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
