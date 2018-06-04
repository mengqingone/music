<template>
  <div class="detail">
    <p>hello detail</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      name: 'singerDetail'
    }
  },
  components: {

  },
  computed: {
    ...mapGetters({
      singer: 'getSinger'
    })
  },
  created() {
    console.log(this.singer)
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.detail
  position fixed
  width: 100%
  top: 0;
  bottom: 0
  overflow hidden
  z-index: 2
  background: $color-background
</style>
