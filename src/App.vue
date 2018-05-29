<template>
  <div id="app">
    <home-header></home-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import homeHeader from 'components/home/header'
import tab from 'components/tab/tab'
export default {
  name: 'App',
  components: {
    homeHeader,
    tab
  }
}
</script>