webpackJsonp([4],{165:function(o,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),n.d(i,"AsInfowindow",function(){return t});var e=n(44),t=function(){function o(){}return o.prototype.render=function(){return!this.element.innerHTML&&this.src?this._renderImageInfoWindow():this._renderStandarInfowindow()},o.prototype.componentDidLoad=function(){this.src&&this._setupHook()},o.prototype._renderStandarInfowindow=function(){return e.b("div",{class:"as-infowindow"},this.src&&e.b("img",{src:this.src}),e.b("div",{class:"as-infowindow__content"},e.b("slot",null)),e.b("div",{class:"as-infowindow__hook"}))},o.prototype._renderImageInfoWindow=function(){return e.b("div",{class:"as-infowindow"},e.b("div",{class:"as-infowindow__media"},e.b("img",{src:this.src})),e.b("div",{class:"as-infowindow__imageHook"},e.b("div",{class:"as-infowindow__imageHook--inner"},e.b("img",{src:this.src}))))},o.prototype._setupHook=function(){var o=this,i=this.element.querySelector(".as-infowindow__media img");i&&(i.onload=function(){var n=i.offsetHeight,e=o.element.querySelector(".as-infowindow__media"),t=o.element.querySelector(".as-infowindow__imageHook img"),r=n-18;e.style.height=r+"px",t.style.marginTop="-"+r+"px"})},Object.defineProperty(o,"is",{get:function(){return"as-infowindow"},enumerable:!0,configurable:!0}),Object.defineProperty(o,"properties",{get:function(){return{element:{elementRef:!0},src:{type:String,attr:"src"}}},enumerable:!0,configurable:!0}),Object.defineProperty(o,"style",{get:function(){return"@import url(https://fonts.googleapis.com/css?family=Overpass+Mono|Roboto:300,400,500,700);@import url(https://fonts.googleapis.com/css?family=Overpass+Mono|Roboto:300,400,500,700);as-infowindow{--infowindow--shadow-color:rgba(44, 44, 44, 0.16);--infowindow--bg-color:var(--as-color-ui-01, #FFF);display:inline-block}as-infowindow .as-infowindow{display:inline-block;position:relative;width:260px;border-radius:4px;background:var(--infowindow--bg-color);-webkit-box-shadow:0 4px 16px 0 var(--infowindow--shadow-color);box-shadow:0 4px 16px 0 var(--infowindow--shadow-color)}as-infowindow .as-infowindow img{display:block;width:100%;border-top-left-radius:4px;border-top-right-radius:4px}as-infowindow .as-infowindow__media{overflow:hidden;border-radius:4px 4px 4px 0}as-infowindow .as-infowindow__content{height:100%;padding:16px;overflow:auto}as-infowindow .as-infowindow__hook{position:absolute;z-index:10;bottom:1px;left:0;background:var(--infowindow--bg-color)}as-infowindow .as-infowindow__hook::before{content:'';position:absolute;z-index:3;top:0;left:0;width:0;height:0;border-top:12px solid var(--infowindow--bg-color);border-right:18px solid transparent;border-radius:0 0 0 4px}as-infowindow .as-infowindow__hook::after{content:'';position:absolute;z-index:2;top:3px;left:0;width:0;height:0;border-top:12px solid var(--infowindow--shadow-color);border-right:18px solid transparent;-webkit-filter:blur(2px);filter:blur(2px)}as-infowindow .as-infowindow__imageHook{position:absolute;z-index:10;bottom:0}as-infowindow .as-infowindow__imageHook::after{content:'';position:absolute;z-index:1;top:3px;left:0;width:0;height:0;border-top:12px solid var(--infowindow--shadow-color);border-right:18px solid transparent;-webkit-filter:blur(2px);filter:blur(2px)}as-infowindow .as-infowindow__imageHook--inner{position:absolute;z-index:3;top:-1px;width:18px;height:12px;overflow:hidden;-webkit-clip-path:polygon(0 0,0 100%,100% 0);clip-path:polygon(0 0,0 100%,100% 0)}as-infowindow .as-infowindow__imageHook--inner>img{width:260px}"},enumerable:!0,configurable:!0}),o}()}});
//# sourceMappingURL=4.bundle.js.map