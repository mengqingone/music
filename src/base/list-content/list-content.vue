<template>
  <scroll :listLength="list.length" ref="scroll">
    <div>
      <transition-group name="lists" tag="ul">
        <li class="item"
          v-for="item in list"
          :key="item.songid"
          @click.stop="selectItem(item)"
          ref="listItem">
          <i class='current' :class="getCurrentIcon(item.songid)"></i>
          <span class="text">{{item.songname}}</span>
          <span class="like"><i class="icon-not-favorite"></i></span>
          <span class="delete" @click.stop="deleteOne(item)"><i class="icon-delete"></i></span>
        </li>
      </transition-group>
    </div>
  </scroll>
</template>

<script>
import scroll from '@/base/scroll'
export default {
  props: {
    list: {
      default: () => {
        return []
      },
      type: Array
    },
    currentId: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      name: 'list-content'
    }
  },
  components: {
    scroll
  },
  methods: {
    getCurrentIcon(id) {
      if (this.currentId === id) {
        return 'icon-play'
      }
    },
    refresh() {
      this.$refs.scroll.refresh()
    },
    selectItem(item) {
      this.$emit('selectItem', item)
    },
    deleteOne(item) {
      this.$emit('deleteItem', item)
    },
    scrollToElement(elementId, time) {
      this.$refs.scroll.scrollToElement(this.$refs.listItem[elementId], time)
    }
  }
}
</script>

<style lang="stylus" scoped>
.item
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  height: 40px;
  padding: 0 30px 0 20px;
  overflow: hidden;
  &.lists-enter-active, &.lists-leave-active
    transition: all 0.1s linear
  &.lists-enter, &.lists-leave-to
    height: 0
  .current
    flex: 0 0 20px;
    width: 20px;
    font-size: 12px;
    color: rgba(255,205,49,.5);
  .text
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
    color: hsla(0,0%,100%,.3);
  .like
    position: relative;
    margin-right: 15px;
    font-size: 12px;
    color: #ffcd32;
  .delete
    position: relative;
    font-size: 12px;
    color: #ffcd32;

</style>
