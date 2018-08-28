<template>
  <div class="history-page">
    <transition-group tag="ul" name='lists'>
      <li class='item' v-show="isSearchPage" :key="title">
        <span class='title'>{{title}}</span>
        <span class='icon-clear' @click.stop="remove"></span>
      </li>
      <li class='item' v-for="(item) in list" :key="item">
        <span class='title'  @click.stop="query(item)">{{item}}</span>
        <span class='icon-delete' @click.stop="deleteHistory(item)"></span>
      </li>
    </transition-group>
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
    },
    isSearchPage: {
      default: false,
      type: Boolean
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
.history-page
  padding: 20px
  .item
    height: 40px
    display flex
    justify-content space-between
    align-items center
    color: hsla(0,0%,100%,.5);
    &.lists-enter-active, &.lists-leave-active
      transition: all 0.1s linear
    &.lists-enter, &.lists-leave-to
      height: 0
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
