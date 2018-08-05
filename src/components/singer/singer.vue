<template>
  <div class="singer-page">
    <list-view :singerList='singerList' @detail="singerdetail" ref="singerListView"></list-view>
    <transition name="slider">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer.js'
import { ERROR_OK } from '@/api/config.js'
import Singer from '@/common/js/singer.js'
import listView from '@/base/list-view.vue'
import { mapMutations } from 'vuex'
import mixin from '@/api/mixin'
export default {
  mixins: [mixin],
  data() {
    return {
      name: 'singer',
      singerList: []
    }
  },
  created() {
    this.restSinger = []
    this.hotSinger = []
    this.HOTLENGTH = 10
    this.HOTDESC = 'hot'
    this._getSingerList()
  },
  components: {
    listView
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    _getSingerList() {
      let _this = this
      getSingerList().then(function(res) {
        if (res.code === ERROR_OK) {
          _this.adjustdata(res.data.list)
        }
      })
    },
    adjustdata(list) {
      this.createList(list)
      this.adjustOrder()
      this.singerList = this.hotSinger.concat(this.restSinger)
    },
    createList(list) {
      let prefixList = []
      this.hotSinger.push(this.creatListObject(this.HOTDESC))
      list.forEach((element, index) => {
        if (index < this.HOTLENGTH) {
          this.hotSinger[0].items.push(new Singer(list[index]))
        }
        let prefix = list[index].Findex.replace(/\s+/g, '')
        let isNumber = prefix.search(/[0-9]/) >= 0 ? 1 : 0
        prefix = isNumber ? '#' : prefix
        if (prefixList.indexOf(prefix) === -1) {
          prefixList.push(prefix)
          this.restSinger.push(this.creatListObject(prefix))
        }
        let idx = prefixList.indexOf(prefix)
        this.restSinger[idx].items.push(new Singer(list[index]))
      })
    },
    creatListObject(title) {
      return {
        title: `${title}`,
        items: []
      }
    },
    adjustOrder() {
      this.restSinger.sort(function(a, b) {
        return (a.title.charCodeAt(0)) - (b.title.charCodeAt(0))
      })
    },
    singerdetail(Singer) {
      this.setSinger(Singer)
      this.$router.push({path: `/singer/${Singer.id}`})
    },
    handlePlayList(list) {
      if (list.length > 0) {
        this.$refs.singerListView.$el.style.bottom = '60px'
        this.$refs.singerListView.refresh()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider-enter,
.slider-leave-to {
  transform translateX(100%)
}
.slider-enter-active,
.slider-leave-active{
  transition all 3s
}
</style>
