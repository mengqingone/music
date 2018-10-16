<template>
  <div id="app" @touchmove.prevent>
    <home-header></home-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <music-player ref="musicplayer"></music-player>
  </div>
</template>

<script>
import homeHeader from 'components/home/header'
import tab from 'components/tab/tab'
import musicPlayer from 'components/player/player'
export default {
  name: 'App',
  components: {
    homeHeader,
    tab,
    musicPlayer
  },
  // hack方法解决无法自动播放 需要人为事件触发  播放事件
  // 方法1
  mounted() {
    this.$nextTick(() => {
      document.addEventListener('touchend', this.$refs.musicplayer.activePlay)
    })
  }
}
</script>