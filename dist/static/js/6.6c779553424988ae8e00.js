webpackJsonp([6],{BRgg:function(t,e,s){"use strict";e.a=function(){return Object(i.a)("/apis/v8/fcg-bin/fcg_myqq_toplist.fcg","",r.c)},e.b=function(t){var e=n()({},r.b,{topid:t,needNewCode:1,uin:0,tpl:3,page:"detail",type:"top",platform:"h5",song_begin:0,song_num:100});return Object(i.a)("/apis/v8/fcg-bin/fcg_v8_toplist_cp.fcg",e,r.c)};var a=s("woOf"),n=s.n(a),i=s("Gak4"),r=s("T452")},Kjo5:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Dd8w"),n=s.n(a),i=s("BRgg"),r=s("Ewld"),o=s("40da"),l=s("UNFc"),c=s("NYxO"),p={mixins:[o.a],data:function(){return{name:"rank",topList:[]}},components:{scroll:r.a,loading:l.a},created:function(){this.getlist()},methods:n()({},Object(c.d)({setRankItem:"SET_RANK"}),{getlist:function(){var t=this;Object(i.a)().then(function(e){0===e.code&&e.data.topList&&e.data.topList.length>0&&(t.topList=e.data.topList.concat())}).catch(function(t){console.log(t)})},handlePlayList:function(t){t.length>0&&this.$refs.rankPage&&(this.$refs.rankPage.style.bottom="60px",this.$refs.scroll.refresh())},openDetail:function(t){this.setRankItem(t),this.$router.push({path:"/rank/"+t.id})}})},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"rankPage",staticClass:"rank-page"},[s("scroll",{directives:[{name:"show",rawName:"v-show",value:t.topList.length>0,expression:"topList.length > 0"}],ref:"scroll",staticClass:"wrapper",attrs:{listLength:t.topList.length}},[s("ul",{staticClass:"rank-list"},t._l(t.topList,function(e,a){return s("li",{key:a,staticClass:"rank-item",on:{click:function(s){s.preventDefault(),t.openDetail(e)}}},[s("div",{staticClass:"rank-left"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.picUrl,expression:"item.picUrl"}],staticClass:"rank-image"})]),t._v(" "),s("ul",{staticClass:"rank-right"},t._l(e.songList,function(e,a){return a<3?s("li",{key:a,staticClass:"rank-right-item"},[s("span",{staticClass:"item-num"},[t._v(t._s(a))]),t._v(" "),s("span",{staticClass:"item-info"},[t._v(t._s(e.songname+"-"+e.singername))])]):t._e()}))])}))]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.topList.length<=0,expression:"topList.length <= 0"}],staticClass:"loading"},[s("loading",{staticClass:"loading-inner"})],1),t._v(" "),s("transition",{attrs:{name:"slider"}},[s("router-view")],1)],1)},staticRenderFns:[]};var g=s("VU/8")(p,u,!1,function(t){s("P+vY")},"data-v-98d10fe2",null);e.default=g.exports},"P+vY":function(t,e){}});
//# sourceMappingURL=6.6c779553424988ae8e00.js.map