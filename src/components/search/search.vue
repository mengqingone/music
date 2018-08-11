<template>
  <div class="search-page">
    <div class='search-input'>
      <search-box @setQuery="setQuery"></search-box>
    </div>
    <div class='search-hot' v-show="this.query === ''">
      <search-hot ref="searchHot"></search-hot>
    </div>
    <div class='search-result' v-show="this.query !== ''">
      <result :query="query" ref="result" @saveQuery="saveQuery"></result>
    </div>
  </div>
</template>

<script>
import searchBox from '@/base/search-box/search-box'
import searchHot from '@/base/search-hot/search-Hot'
import result from '@/base/result/result'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      name: 'search',
      query: ''
    }
  },
  components: {
    searchBox,
    searchHot,
    result
  },
  methods: {
    ...mapActions([
      'storeHistory'
    ]),
    setQuery(query) {
      this.query = query
    },
    saveQuery() {
      this.storeHistory(this.query)
    }
  },
  watch: {
    query(val) {
      if (val === '') {
        setTimeout(() => { this.$refs.searchHot.refresh() }, 400)
      } else if (val !== '') {
        setTimeout(() => { this.$refs.result.refresh() }, 400)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-page
  position fixed
  left 0
  right 0
  top 88px
  bottom 0
  .search-input
    margin: 20px
</style>
