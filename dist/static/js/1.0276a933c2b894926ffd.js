webpackJsonp([1],{"JT9/":function(t,e){},MeLx:function(t,e){},"W1+L":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("Dd8w"),s=i.n(n),o=i("//Fk"),a=i.n(o),r=i("woOf"),l=i.n(r),c=i("mvHQ"),u=i.n(c),d=i("Gak4"),h=i("T452"),m=i("mtWM"),f=i.n(m);var g=i("GQaK"),p={props:{imageList:Array,loop:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!0},interval:{type:Number,default:3500},speed:{type:Number,default:400},showDots:{type:Boolean,default:!0},threshold:{type:Number,default:.3}},data:function(){return{name:"slider",scroll:null,timer:null,pageNum:0}},methods:{initSliderSize:function(){var t=document.body.clientWidth;if(void 0!==this.$refs.wrapper_inner&&null!==this.$refs.wrapper_inner){this.$refs.wrapper_inner.style.width=t*(this.imageList.length+2)+"px";for(var e=this.$refs.wrapper_inner.children,i=0;i<e.length;i++)e[i].style.width=t+"px"}},onEnter:function(){null!==this.timer&&(clearTimeout(this.timer),this.timer=null)},initBScroll:function(){var t=this;this.$nextTick(function(){t.scroll=new g.a(t.$refs.wrapper,{scrollX:!0,scrollY:!1,click:!0,momentum:!1,snap:{loop:t.loop,threshold:t.threshold,speed:t.speed}}),t.scroll.on("scrollEnd",t._play),t.scroll.on("touchEnd",t._play)})},_play:function(){var t=this;null!==this.timer&&clearTimeout(this.timer),this.scroll&&(this.pageNum=this.scroll.getCurrentPage().pageX),this.timer=setTimeout(function(){t.scroll.next()},this.interval)},resizeFrame:function(){var t=this;setTimeout(function(){t.initSliderSize(),t.scroll&&t.scroll.refresh(),t.autoPlay&&t._play()},20)}},created:function(){var t=this;this.$nextTick(function(){t.initSliderSize(),t.initBScroll(),t.autoPlay&&t._play()})},mounted:function(){window.addEventListener("resize",this.resizeFrame,!1)},destroyed:function(){window.removeEventListener("resize",function(){console.log("remove resize event")})},beforeDestroy:function(){this.scroll.disable(),clearTimeout(this.timer),this.timer=null}},v={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"wrapper",staticClass:"wrapper-frame"},[i("ul",{ref:"wrapper_inner",staticClass:"inner-frame",on:{mouseenter:t.onEnter,touchstart:t.onEnter,mouseleave:t._play}},[t._t("default")],2),t._v(" "),this.showDots?i("div",{staticClass:"dots"},t._l(t.imageList,function(e,n){return i("span",{key:n,class:[{current:n==t.pageNum},"dot"]})})):t._e()])},staticRenderFns:[]};var _=i("VU/8")(p,v,!1,function(t){i("MeLx")},"data-v-5c1f1876",null).exports,y=i("Ewld"),w=i("UNFc"),L=i("40da"),S=i("NYxO"),C={mixins:[L.a],data:function(){return{name:"recommend",imageList:[],hotSongList:[],loadOK:!1,isloading:!0}},watch:{loadOK:function(t,e){t&&this.$refs.scroll.refresh()},hotSongList:function(t,e){this.isloading=!t.length}},computed:{hostSongListLength:function(){return this.hotSongList.length}},created:function(){this._getRecommend(),this._getRecommendList()},methods:s()({},Object(S.d)({setDisc:"SET_CURRENTDISC"}),{imageLoad:function(){this.loadOK=!0},_getRecommendList:function(){var t,e=this;(t=l()({},h.b,{sin:0,ein:29,sortId:5,categoryId:1e7,rnd:Math.random(),format:"json"}),new a.a(function(e,i){f.a.get("/apis/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg",{params:t}).then(function(t){e(t)}).catch(function(t){i(t)})})).then(function(t){e.hotSongList=t.data.data.list},function(t){console.log(t)})},_getRecommend:function(){var t,e,i=this;(t=u()({focus:{module:"QQMusic.MusichallServer",method:"GetFocus",param:{}}}),e=l()({},h.b,{data:""+t,callback:"getData"}),Object(d.a)("https://u.y.qq.com/cgi-bin/musicu.fcg",e,h.c)).then(function(t){t.code===h.a&&t.focus&&(i.imageList=t.focus.data.content)},function(t){console.log(t)})},handlePlayList:function(t){t.length>0&&(this.$refs.recommendPage.style.bottom="60px",this.$refs.scroll.refresh())},getHotSong:function(t){this.setDisc(t),this.$router.push({path:"/recommend/"+t.dissid})}}),components:{slider:_,scroll:y.a,loading:w.a}},b={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"recommendPage",staticClass:"recommend-page"},[i("scroll",{ref:"scroll",staticClass:"wrapper",attrs:{listLength:t.hotSongList.length}},[i("div",{class:[{"content-height":t.isloading},"content"]},[i("div",{staticClass:"music-frame"},[this.imageList.length>0?i("slider",{attrs:{imageList:t.imageList}},t._l(t.imageList,function(e,n){return i("li",{key:n,staticClass:"list-item"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.pic_info.url,expression:"item.pic_info.url"}],staticClass:"slider-img needsclick",on:{load:t.imageLoad}})])})):t._e()],1),t._v(" "),i("div",{staticClass:"hot-song"},[i("div",{staticClass:"hot-title"},[t._v("热门歌曲推荐")]),t._v(" "),t._l(t.hotSongList,function(e,n){return i("div",{key:n,staticClass:"hot-detail",on:{click:function(i){i.stopPropagation(),i.preventDefault(),t.getHotSong(e)}}},[i("div",{staticClass:"hot-list"},[i("div",{staticClass:"hot-image"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.imgurl,expression:"item.imgurl"}]})]),t._v(" "),i("div",{staticClass:"list-detail"},[i("div",{staticClass:"hotlist-title"},[t._v(t._s(e.creator.name))]),t._v(" "),i("div",{staticClass:"hotlist-info"},[t._v(t._s(e.dissname))])])])])})],2),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0==t.hotSongList.length,expression:"hotSongList.length == 0"}],staticClass:"loading"},[i("loading",{staticClass:"loading-inner"})],1)])]),t._v(" "),i("router-view")],1)},staticRenderFns:[]};var x=i("VU/8")(C,b,!1,function(t){i("JT9/")},"data-v-d388a244",null);e.default=x.exports},mvHQ:function(t,e,i){t.exports={default:i("qkKv"),__esModule:!0}},qkKv:function(t,e,i){var n=i("FeBl"),s=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(t){return s.stringify.apply(s,arguments)}}});
//# sourceMappingURL=1.0276a933c2b894926ffd.js.map