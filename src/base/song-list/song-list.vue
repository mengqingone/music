<template>
  <div class="page">
    <ul class='container'>
      <li v-for="(item, index) in sList"
        :key="index"
        @click="clickItem(item,index)"
        :class="[{'item':rank}]">
        <div v-if="rank" class='rank'>
          <span :class="getClass(index)">{{ index >= 2 ?  index+1 : ''}}</span>
        </div>
        <div :class="[{'content':rank}]">
          <h2>{{item.songname}}</h2>
          <p>{{item.singer + "." + item.albumname}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    sList: Array,
    rank: Boolean
  },
  data() {
    return {
      name: 'song-list'
    }
  },
  components: {

  },
  methods: {
    clickItem(item, index) {
      this.$emit('clickItem', item, index)
    },
    getClass(index) {
      return index >= 2 ? 'text' : 'icon' + index + ' icon'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.container
  width: 100%
  height: auto
  padding 20px 30px
  li
    display flex
    align-items: flex-start
    box-sizing: border-box
    height: 64px
    font-size: 14px
    flex-direction column
    justify-content center
    &.item
      display flex
      align-items center
      flex-direction row
    h2
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #fff;
    p
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-top: 4px;
      color: hsla(0,0%,100%,.3)
    .rank
      flex: 0 0 25px;
      width: 25px;
      margin-right: 30px;
      text-align: center;
    .content
      flex: 1;
      line-height: 20px;
      overflow: hidden;
.icon0
  bg-image('first')
.icon1
  bg-image('second')
.icon
  display: inline-block;
  width: 25px;
  height: 24px;
  background-size: 25px 24px;
.text
  color: #ffcd32;
  font-size: 18px;
</style>
