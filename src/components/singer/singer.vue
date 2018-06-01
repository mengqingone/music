<template>
  <div class="singer-page">
    <scroll ref='scroll' class='wrapper' :listLength="singerList.length">
      <div class='content'>
        <ul class='singer-group' v-for="(item, index) in singerList" :key="index">
          <li class='prefix'>{{item.title === 'hot' ? '热门': item.title}}</li>
          <li class='singer-detail' v-for="value in item.items" :key="value.id">
            <div class='singer-url'>
              <img :src="value.imgUrl">
            </div>
            <div class='singer-name'>{{value.singerName}}</div>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer.js'
import { ERROR_OK } from '@/api/config.js'
import Singer from '@/common/js/singer.js'
import scroll from '@/base/scroll'
export default {
  data() {
    return {
      name: 'singer',
      singerList: [],
      HOTLENGTH: 10,
      HOTDESC: 'hot'
    }
  },
  created() {
    this.restSinger = []
    this.hotSinger = []
    this.prefixList = []
    this._getSingerList()
  },
  components: {
    scroll
  },
  methods: {
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
    creatListObject(title) {
      return {
        title: `${title}`,
        items: []
      }
    },
    createList(list) {
      this.hotSinger.push(this.creatListObject(this.HOTDESC))
      list.forEach((element, index) => {
        if (index < this.HOTLENGTH) {
          this.hotSinger[0].items.push(new Singer(list[index]))
        }
        let prefix = list[index].Findex.replace(/\s+/g, '')
        if (this.prefixList.indexOf(prefix) === -1) {
          if (prefix.search(/[0-9]/) >= 0) {
            prefix = '#'
          }
          this.prefixList.push(prefix)
          this.restSinger.push(this.creatListObject(prefix))
        }
        let idx = this.prefixList.indexOf(prefix)
        this.restSinger[idx].items.push(new Singer(list[index]))
      })
    },
    adjustOrder() {
      this.restSinger.sort(function(a, b) {
        return (a.title.charCodeAt(0)) - (b.title.charCodeAt(0))
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
.singer-page
  position fixed
  width: 100%
  top: 88px;
  bottom: 0
  overflow hidden
  .wrapper
    height 100%
    .singer-group
      padding-bottom: 30px;
      .prefix
        height: 30px
        line-height 30px
        font-size: $font-size-small-s
        background-color: $color-highlight-background
        padding-left: 20px;
      .singer-detail
        box-sizing border-box
        height: 70px
        padding: 20px 0 0 30px;
        display flex
        align-items: center;
        .singer-name
          flex:1
          margin-left: 20px
          font-size: $font-size-small-s
        .singer-url
          width: 50px
          height: 50px
          border-radius 50px
          overflow hidden
          img
            width: 100%
            height: 100%
</style>
