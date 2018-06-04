<template>
  <div>
    <list-view :singerList='singerList' ></list-view>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer.js'
import { ERROR_OK } from '@/api/config.js'
import Singer from '@/common/js/singer.js'
import listView from '@/base/listView.vue'
export default {
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
        if (prefixList.indexOf(prefix) === -1) {
          if (prefix.search(/[0-9]/) >= 0) {
            prefix = '#'
          }
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
    }
  }
}

// this.prefixList.sort(function(a, b) {
//   if (a === '#') {
//     return 35 - b.toString().charCodeAt()
//   } else {
//     return (a.toString().charCodeAt()) - (b.toString().charCodeAt())
//   }
// })
// this.prefixList.unshift(this.HOTDESC)
</script>

<style lang="stylus" scoped>
</style>
