import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend'
import search from 'components/search/search'
import rank from 'components/rank/rank'
import singer from 'components/singer/singer'
import singerDetail from 'components/singer-detail/singer-detail'
import disc from 'components/disc/disc'
Vue.use(Router)

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
      component: rank
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
