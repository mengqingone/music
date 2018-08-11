<template>
  <div class="history-page">
    <ul>
      <li class='item'>
        <span class='title'>{{title}}</span>
        <span class='icon-clear' @click.stop="remove"></span>
      </li>
      <li class='item' v-for="(item, index) in list" :key="index">
        <span class='title'  @click.stop="query(item)">{{item}}</span>
        <span class='icon-delete' @click.stop="deleteHistory(item)"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    title: {
      default: '',
      type: String
    },
    list: {
      default: () => {
        return []
      },
      type: Array
    }
  },
  data() {
    return {
      name: 'history'
    }
  },
  methods: {
    ...mapActions([
      'deleteHistory',
      'removeHistory'
    ]),
    remove() {
      this.$emit('openPrompt')
    },
    query(item) {
      this.$bus.$emit('setQuery', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
.item
  height: 40px
  display flex
  justify-content space-between
  align-items center
  color: hsla(0,0%,100%,.5);
  .title
    font-size 16px
    text-align center
  .icon-delete
    width: 32px
    line-height: 40px
    font-size 12px
    text-align center
  .icon-clear
    width: 32px
    line-height: 40px
    text-align center
</style>
