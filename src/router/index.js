import Vue from 'vue'
import Router from 'vue-router'
// import recommend from 'components/recommend/recommend'
// import search from 'components/search/search'
// import rank from 'components/rank/rank'
// import singer from 'components/singer/singer'
// import singerDetail from 'components/singer-detail/singer-detail'
// import disc from 'components/disc/disc'
// import rankSongs from 'components/rank-songs/rank-songs'
Vue.use(Router)
// 使用懒加载
const recommend = () => import('components/recommend/recommend')
const search = () => import('components/search/search')
const rank = () => import('components/rank/rank')
const singer = () => import('components/singer/singer')
const singerDetail = () => import('components/singer-detail/singer-detail')
const disc = () => import('components/disc/disc')
const rankSongs = () => import('components/rank-songs/rank-songs')
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
      children: [{
        path: ':id',
        name: 'disc',
        component: disc
      }]
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      children: [{
        path: ':id',
        name: 'rankSongs',
        component: rankSongs
      }]
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children: [{
        path: ':id',
        name: 'singerDetail',
        component: singerDetail
      }]
    }
  ]
})
