<template>
  <div class="page">
    <ul class='container'>
      <li v-for="(item, index) in sList" :key="index">
        <h2>{{item.songname}}</h2>
        <p>{{item.singer + "." + item.albumname}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    sList: Array
  },
  data() {
    return {
      name: 'song-list'
    }
  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>
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

</style>
