<template>
  <div id="app">
    <home-header></home-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <music-player></music-player>
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
  }
}
</script>