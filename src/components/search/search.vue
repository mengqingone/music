<template>
  <div class="search-page">
    <div class='search-input'>
      <search-box @setQuery="setQuery"></search-box>
    </div>
    <div class='search-hot' v-show="!searching">
      <search-hot ref="searchHot"></search-hot>
      <!-- <history></history> -->
    </div>
    <div class='search-result' v-show="searching">
      <result :query="query"></result>
    </div>
  </div>
</template>

<script>
import searchBox from '@/base/search-box/search-box'
import searchHot from '@/base/search-hot/search-Hot'
import result from '@/base/result/result'
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
  computed: {
    searching() {
      return this.query !== ''
    }
  },
  methods: {
    setQuery(query) {
      this.query = query
    }
  },
  watch: {
    searching(val) {
      if (!val) {
        setTimeout(() => { this.$refs.searchHot.refresh() }, 400)
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
