webpackJsonp([3],{72:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(96),a=r(i);t["default"]=function(e,t,n){return t in e?(0,a["default"])(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},146:function(e,t,n){"use strict";var r=n(151),i={getChildMapping:function(e,t){return e?r(e):e},mergeChildMappings:function(e,t){function n(n){return t.hasOwnProperty(n)?t[n]:e[n]}e=e||{},t=t||{};var r={},i=[];for(var a in e)t.hasOwnProperty(a)?i.length&&(r[a]=i,i=[]):i.push(a);var s,o={};for(var l in t){if(r.hasOwnProperty(l))for(s=0;s<r[l].length;s++){var u=r[l][s];o[r[l][s]]=n(u)}o[l]=n(l)}for(s=0;s<i.length;s++)o[i[s]]=n(i[s]);return o}};e.exports=i},147:function(e,t,n){"use strict";var r=n(12),i=n(69),a=(n(46),n(146)),s=n(20),o=i.createClass({displayName:"ReactTransitionGroup",propTypes:{component:i.PropTypes.any,childFactory:i.PropTypes.func},getDefaultProps:function(){return{component:"span",childFactory:s.thatReturnsArgument}},getInitialState:function(){return{children:a.getChildMapping(this.props.children)}},componentWillMount:function(){this.currentlyTransitioningKeys={},this.keysToEnter=[],this.keysToLeave=[]},componentDidMount:function(){var e=this.state.children;for(var t in e)e[t]&&this.performAppear(t)},componentWillReceiveProps:function(e){var t;t=a.getChildMapping(e.children);var n=this.state.children;this.setState({children:a.mergeChildMappings(n,t)});var r;for(r in t){var i=n&&n.hasOwnProperty(r);!t[r]||i||this.currentlyTransitioningKeys[r]||this.keysToEnter.push(r)}for(r in n){var s=t&&t.hasOwnProperty(r);!n[r]||s||this.currentlyTransitioningKeys[r]||this.keysToLeave.push(r)}},componentDidUpdate:function(){var e=this.keysToEnter;this.keysToEnter=[],e.forEach(this.performEnter);var t=this.keysToLeave;this.keysToLeave=[],t.forEach(this.performLeave)},performAppear:function(e){this.currentlyTransitioningKeys[e]=!0;var t=this.refs[e];t.componentWillAppear?t.componentWillAppear(this._handleDoneAppearing.bind(this,e)):this._handleDoneAppearing(e)},_handleDoneAppearing:function(e){var t=this.refs[e];t.componentDidAppear&&t.componentDidAppear(),delete this.currentlyTransitioningKeys[e];var n;n=a.getChildMapping(this.props.children),n&&n.hasOwnProperty(e)||this.performLeave(e)},performEnter:function(e){this.currentlyTransitioningKeys[e]=!0;var t=this.refs[e];t.componentWillEnter?t.componentWillEnter(this._handleDoneEntering.bind(this,e)):this._handleDoneEntering(e)},_handleDoneEntering:function(e){var t=this.refs[e];t.componentDidEnter&&t.componentDidEnter(),delete this.currentlyTransitioningKeys[e];var n;n=a.getChildMapping(this.props.children),n&&n.hasOwnProperty(e)||this.performLeave(e)},performLeave:function(e){this.currentlyTransitioningKeys[e]=!0;var t=this.refs[e];t.componentWillLeave?t.componentWillLeave(this._handleDoneLeaving.bind(this,e)):this._handleDoneLeaving(e)},_handleDoneLeaving:function(e){var t=this.refs[e];t.componentDidLeave&&t.componentDidLeave(),delete this.currentlyTransitioningKeys[e];var n;n=a.getChildMapping(this.props.children),n&&n.hasOwnProperty(e)?this.performEnter(e):this.setState(function(t){var n=r({},t.children);return delete n[e],{children:n}})},render:function(){var e=[];for(var t in this.state.children){var n=this.state.children[t];n&&e.push(i.cloneElement(this.props.childFactory(n),{ref:t,key:t}))}var a=r({},this.props);return delete a.transitionLeave,delete a.transitionName,delete a.transitionAppear,delete a.transitionEnter,delete a.childFactory,delete a.transitionLeaveTimeout,delete a.transitionEnterTimeout,delete a.transitionAppearTimeout,delete a.component,i.createElement(this.props.component,a,e)}});e.exports=o},159:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){return{type:l,payload:{playerName:e,playerColor:t,text:n}}}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments[1],n=u[t.type];return n?n(e,t):e}Object.defineProperty(t,"__esModule",{value:!0}),t.actions=t.SEND_MESSAGE=void 0;var s=n(72),o=r(s);t.sendMessage=i,t["default"]=a;var l=t.SEND_MESSAGE="SEND_MESSAGE",u=(t.actions={sendMessage:i},(0,o["default"])({},l,function(e,t){return e.push(t.payload),e.slice(0)})),p=[]},161:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){return{type:d,payload:{x:e,y:t}}}function a(e,t,n){var r=e.length,i=e[0].length;return t>=0&&t<i&&n>=0&&n<r}function s(e,t,n){var r=e[n][t];if(!r)return[];for(var i=[],s=-1;s<=1;s+=2)if((1!=s||1!=r.player||r["double"])&&(s!=-1||0!=r.player||r["double"]))for(var o=-1;o<=1;o+=2)a(e,t+o,n+s)&&!e[n+s][t+o]&&i.push({x:t+o,y:n+s,movement:"WALK",from:{x:t,y:n}}),a(e,t+o,n+s)&&a(e,t+2*o,n+2*s)&&e[n+s][t+o]&&e[n+s][t+o].player!=r.player&&!e[n+2*s][t+2*o]&&i.push({movement:"EAT",x:t+2*o,y:n+2*s,eaten:{x:t+o,y:n+s},from:{x:t,y:n}});return i}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments[1],n=f[t.type];return n?n(e,t):e}Object.defineProperty(t,"__esModule",{value:!0}),t.actions=t.CLICK=void 0;var l=n(72),u=r(l),p=n(11),c=r(p);t.sendClick=i,t["default"]=o;var d=t.CLICK="CLICK",f=(t.actions={sendClick:i},(0,u["default"])({},d,function(e,t){var n=t.payload.x,r=t.payload.y;if(e.feasible){for(var i=0;i<e.feasible.length;i++){var a=e.feasible[i];if(a.x==n&&a.y==r){"WALK"==a.movement?(new Audio("/move2.mp3").play(),e.board[r][n]=e.board[a.from.y][a.from.x],e.board[a.from.y][a.from.x]=null):(a.movement="EAT")&&(new Audio("/move.wav").play(),e.board[r][n]=e.board[a.from.y][a.from.x],e.board[a.from.y][a.from.x]=null,e.board[a.eaten.y][a.eaten.x]=null),0!=r&&r!=e.board.length-1||e.board[r][n]["double"]||(new Audio("/success.wav").play(),e.board[r][n]["double"]=!0);break}}return(0,c["default"])({},e,{selected:null,feasible:null})}if(e.selected&&e.selected.x==n&&e.selected.y==r)return(0,c["default"])({},e,{selected:null,feasible:null});var o=s(e.board,n,r);return o.length>0?(0,c["default"])({},e,{feasible:o,selected:{x:n,y:r}}):e})),h={board:[[{player:0,key:0},null,{player:0,key:1},null,{player:0,key:2},null,{player:0,key:3},null],[null,{player:0,key:4},null,{player:0,key:5},null,{player:0,key:6},null,{player:0,key:7}],[{player:0,key:8},null,{player:0,key:9},null,{player:0,key:10},null,{player:0,key:11},null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,{player:1,key:12},null,{player:1,key:13},null,{player:1,key:14},null,{player:1,key:15}],[{player:1,key:16},null,{player:1,key:17},null,{player:1,key:18},null,{player:1,key:19},null],[null,{player:1,key:20},null,{player:1,key:21},null,{player:1,key:22},null,{player:1,key:23}]],selected:null,feasible:null}},240:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.TurnHUD=void 0;var i=n(1),a=r(i),s=t.TurnHUD=function(e){for(var t=e.playerName,n=void 0===t?"test":t,r=e.playerColor,i=void 0===r?"red":r,s=e.action,o=void 0===s?"PLAY":s,l=(e.isUserTurn,e.messages),u=e.sendMessage,p=function(){var e=prompt("Say something");e&&(u("vini","red",e),console.log(e))},c=[],d=0;d<l.length;d++){var f=l[d];c.push(a["default"].createElement("p",{style:{color:"white"}},a["default"].createElement("span",{style:{color:f.playerColor}},a["default"].createElement("b",null,f.playerName)),": ",f.text))}return a["default"].createElement("div",{style:{width:"100%",position:"fixed",left:"0px",right:"0px",top:"0px",maxWidth:"500px",marginLeft:"auto",marginRight:"auto",zIndex:999,pointerEvents:"none"}},a["default"].createElement("svg",{viewBox:"0 0 80 10"},a["default"].createElement("g",null,a["default"].createElement("rect",{height:"10",width:"80",y:"0",x:"0",fill:"white"}),a["default"].createElement("rect",{height:"10",width:"13.9",y:"0",x:"0",fill:"white",onClick:p,style:{pointerEvents:"all"}}),a["default"].createElement("rect",{fillOpacity:".1",height:"8.5",width:".1",y:".75",x:"14"}),a["default"].createElement("g",{transform:"matrix(.4 0 0 .4 69 .5)"},a["default"].createElement("path",{d:"m9 16.2-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4-10.6 10.6z",fillOpacity:1})),a["default"].createElement("g",{transform:"matrix(.4 0 0 .4 2 .5)",onClick:p,style:{pointerEvents:"all"}},a["default"].createElement("path",{d:"m21.99 4c0-1.1-0.89-2-1.99-2h-16c-1.1 0-2 0.9-2 2v12c0 1.1 0.9 2 2 2h14l4 4-0.01-18zm-3.99 10h-12v-2h12v2zm0-3h-12v-2h12v2zm0-3h-12v-2h12v2z"})),a["default"].createElement("rect",{fillOpacity:".1",height:"8.5",width:".1",y:".75",x:"67"}),a["default"].createElement("text",{fontFamily:"sans-serif",style:{textAnchor:"middle",textAlign:"center"}},a["default"].createElement("tspan",{fontSize:"4px",x:"40",y:"9"},o)),a["default"].createElement("text",{x:"40",fill:i,fontFamily:"sans-serif",style:{textAnchor:"middle",textAlign:"center"}},a["default"].createElement("tspan",{fontSize:"4px",y:"4px",x:"40"},n)))),c)};s.propTypes={messages:a["default"].PropTypes.array.isRequired,sendMessage:a["default"].PropTypes.func.isRequired},t["default"]=s},241:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(67),a=n(159),s=n(240),o=r(s),l={sendMessage:a.sendMessage},u=function(e){return{messages:e.messages}};t["default"]=(0,i.connect)(u,l)(o["default"])},243:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),a=r(i),s=n(5),o=r(s),l=n(7),u=r(l),p=n(9),c=r(p),d=n(8),f=r(d),h=n(1),m=r(h),y=n(422),v=r(y);n(318);var g=function(e){function t(){return(0,o["default"])(this,t),(0,c["default"])(this,(t.__proto__||(0,a["default"])(t)).apply(this,arguments))}return(0,f["default"])(t,e),(0,u["default"])(t,[{key:"render",value:function(){for(var e=[],t=0,n=0;n<this.props.height;n++)for(var r=0;r<this.props.width;r++){var i=this.props.secondaryColor;(r+n)%2==0&&(i=this.props.primaryColor);for(var a in this.props.feasible){var s=this.props.feasible[a];s.x==r&&s.y==n&&(i=this.props.feasibleColor)}this.props.selected&&this.props.selected.x==r&&this.props.selected.y==n&&(i=this.props.selectedColor),e.push(m["default"].createElement("rect",{height:"1",style:{fill:i},width:"1",x:r,y:n,key:t,onClick:this.props.onClick(r,n)})),t++}return m["default"].createElement("svg",{style:{width:"100%",position:"fixed",left:"0px",right:"0px",bottom:"0px",maxWidth:"500px",marginLeft:"auto",marginRight:"auto"},viewBox:"0 0 8 8",id:"CheckerBoard"},m["default"].createElement("g",null,e),m["default"].createElement(v["default"],{transitionName:"example",transitionEnterTimeout:500,transitionLeaveTimeout:200,component:"g"},this.props.children))}}]),t}(m["default"].Component);g.defaultProps={width:8,height:8,primaryColor:"sienna",secondaryColor:"tan",feasibleColor:"palegreen",feasible:{},selected:null,selectedColor:"green"},t["default"]=g},244:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.CheckerGame=void 0;var i=n(1),a=r(i),s=n(243),o=r(s),l=n(245),u=r(l);n(319);var p=n(241),c=r(p),d=t.CheckerGame=function(e){for(var t=e.state,n=e.sendClick,r=function(e,t){return function(){n(e,t)}},i=[],s=0,l=0;l<t.board.length;l++)for(var p=t.board[l],d=0;d<p.length;d++)if(p[d]){var f=p[d],h="yellow";0==f.player&&(h="white"),i.push(a["default"].createElement(u["default"],{color:h,"double":f["double"],x:d,y:l,key:f.key,onClick:r})),s++}return a["default"].createElement("div",null,a["default"].createElement(c["default"],null),a["default"].createElement(o["default"],{feasible:t.feasible,selected:t.selected,onClick:r,key:"999"},i))};t["default"]=d},245:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(11),a=r(i),s=n(1),o=r(s),l=750,u=o["default"].createClass({displayName:"CheckerPiece",componentWillMount:function(){this.setState({x:this.props.x,y:this.props.y,lastFrame:null,stepX:0,stepY:0,animate:null})},componentWillReceiveProps:function(e){e.x==this.props.x&&e.y==this.props.y||(this.setState((0,a["default"])({},this.state,{originTime:Date.now(),originX:this.props.x,originY:this.props.y})),requestAnimationFrame(this.animate))},easeInOutCubic:function(e,t,n,r){return e/=r/2,e<1?n/2*e*e*e+t:(e-=2,n/2*(e*e*e+2)+t)},animate:function(){var e=Date.now()-this.state.originTime;if(e<l){var t=this.easeInOutCubic(e,0,1,l);this.setState((0,a["default"])({},this.state,{x:(this.props.x-this.state.originX)*t+this.state.originX,y:(this.props.y-this.state.originY)*t+this.state.originY})),requestAnimationFrame(this.animate)}else this.setState((0,a["default"])({},this.state,{x:this.props.x,y:this.props.y}))},render:function(){var e=null;return 1==this.props["double"]&&(e=o["default"].createElement("polygon",{stroke:"#000000",points:"50,33.034549713134766 53.87126159667969,44.171669006347656 65.65957641601562,44.411895751953125 56.263832092285156,51.535240173339844 59.67815017700195,62.820831298828125 50,56.086181640625 40.32184982299805,62.820831298828125 43.736167907714844,51.535240173339844 34.340423583984375,44.411895751953125 46.12873840332031,44.171669006347656 50,33.034549713134766 53.87126159667969,44.171669006347656 ",strokeWidth:"3",fill:"#000000",orient:"point",r:"16.465452",shape:"star",cy:"48.5",cx:"49"})),o["default"].createElement("g",{transform:"translate("+this.state.x+","+this.state.y+")",onClick:this.props.onClick(this.props.x,this.props.y)},o["default"].createElement("g",{transform:"scale(.01,.01)"},o["default"].createElement("ellipse",{ry:"45",rx:"45",cy:"50",cx:"50",strokeWidth:"0",stroke:"#000000",fill:this.props.color}),o["default"].createElement("ellipse",{ry:"35",rx:"35",cy:"50",cx:"50",strokeWidth:"5",stroke:"#000000",fill:this.props.color}),o["default"].createElement("ellipse",{ry:"20",rx:"20",cy:"50",cx:"50",strokeWidth:"3",stroke:"#000000",fill:this.props.color}),e))}});t["default"]=u},246:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(67),a=n(161),s=n(244),o=r(s),l={sendClick:a.sendClick},u=function(e){return{state:e.checkerGameState}};t["default"]=(0,i.connect)(u,l)(o["default"])},318:320,319:320,322:function(e,t,n){"use strict";function r(e,t){for(var n=e;n.parentNode;)n=n.parentNode;var r=n.querySelectorAll(t);return Array.prototype.indexOf.call(r,e)!==-1}var i=n(2),a={addClass:function(e,t){return/\s/.test(t)?i(!1):void 0,t&&(e.classList?e.classList.add(t):a.hasClass(e,t)||(e.className=e.className+" "+t)),e},removeClass:function(e,t){return/\s/.test(t)?i(!1):void 0,t&&(e.classList?e.classList.remove(t):a.hasClass(e,t)&&(e.className=e.className.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,""))),e},conditionClass:function(e,t,n){return(n?a.addClass:a.removeClass)(e,t)},hasClass:function(e,t){return/\s/.test(t)?i(!1):void 0,e.classList?!!t&&e.classList.contains(t):(" "+e.className+" ").indexOf(" "+t+" ")>-1},matchesSelector:function(e,t){var n=e.matches||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||function(t){return r(e,t)};return n.call(e,t)}};e.exports=a},422:function(e,t,n){e.exports=n(465)},465:function(e,t,n){"use strict";function r(e){var t="transition"+e+"Timeout",n="transition"+e;return function(e){if(e[n]){if(null==e[t])return new Error(t+" wasn't supplied to ReactCSSTransitionGroup: this can cause unreliable animations and won't be supported in a future version of React. See https://fb.me/react-animation-transition-group-timeout for more information.");if("number"!=typeof e[t])return new Error(t+" must be a number (in milliseconds)")}}}var i=n(12),a=n(69),s=n(147),o=n(466),l=a.createClass({displayName:"ReactCSSTransitionGroup",propTypes:{transitionName:o.propTypes.name,transitionAppear:a.PropTypes.bool,transitionEnter:a.PropTypes.bool,transitionLeave:a.PropTypes.bool,transitionAppearTimeout:r("Appear"),transitionEnterTimeout:r("Enter"),transitionLeaveTimeout:r("Leave")},getDefaultProps:function(){return{transitionAppear:!1,transitionEnter:!0,transitionLeave:!0}},_wrapChild:function(e){return a.createElement(o,{name:this.props.transitionName,appear:this.props.transitionAppear,enter:this.props.transitionEnter,leave:this.props.transitionLeave,appearTimeout:this.props.transitionAppearTimeout,enterTimeout:this.props.transitionEnterTimeout,leaveTimeout:this.props.transitionLeaveTimeout},e)},render:function(){return a.createElement(s,i({},this.props,{childFactory:this._wrapChild}))}});e.exports=l},466:function(e,t,n){"use strict";var r=n(69),i=n(212),a=n(322),s=n(497),o=n(233),l=17,u=r.createClass({displayName:"ReactCSSTransitionGroupChild",propTypes:{name:r.PropTypes.oneOfType([r.PropTypes.string,r.PropTypes.shape({enter:r.PropTypes.string,leave:r.PropTypes.string,active:r.PropTypes.string}),r.PropTypes.shape({enter:r.PropTypes.string,enterActive:r.PropTypes.string,leave:r.PropTypes.string,leaveActive:r.PropTypes.string,appear:r.PropTypes.string,appearActive:r.PropTypes.string})]).isRequired,appear:r.PropTypes.bool,enter:r.PropTypes.bool,leave:r.PropTypes.bool,appearTimeout:r.PropTypes.number,enterTimeout:r.PropTypes.number,leaveTimeout:r.PropTypes.number},transition:function(e,t,n){var r=i.findDOMNode(this);if(!r)return void(t&&t());var o=this.props.name[e]||this.props.name+"-"+e,l=this.props.name[e+"Active"]||o+"-active",u=null,p=function(e){e&&e.target!==r||(clearTimeout(u),a.removeClass(r,o),a.removeClass(r,l),s.removeEndEventListener(r,p),t&&t())};a.addClass(r,o),this.queueClassAndNode(l,r),n?(u=setTimeout(p,n),this.transitionTimeouts.push(u)):s.addEndEventListener(r,p)},queueClassAndNode:function(e,t){this.classNameAndNodeQueue.push({className:e,node:t}),this.timeout||(this.timeout=setTimeout(this.flushClassNameAndNodeQueue,l))},flushClassNameAndNodeQueue:function(){this.isMounted()&&this.classNameAndNodeQueue.forEach(function(e){a.addClass(e.node,e.className)}),this.classNameAndNodeQueue.length=0,this.timeout=null},componentWillMount:function(){this.classNameAndNodeQueue=[],this.transitionTimeouts=[]},componentWillUnmount:function(){this.timeout&&clearTimeout(this.timeout),this.transitionTimeouts.forEach(function(e){clearTimeout(e)}),this.classNameAndNodeQueue.length=0},componentWillAppear:function(e){this.props.appear?this.transition("appear",e,this.props.appearTimeout):e()},componentWillEnter:function(e){this.props.enter?this.transition("enter",e,this.props.enterTimeout):e()},componentWillLeave:function(e){this.props.leave?this.transition("leave",e,this.props.leaveTimeout):e()},render:function(){return o(this.props.children)}});e.exports=u},497:function(e,t,n){"use strict";function r(){var e=o("animationend"),t=o("transitionend");e&&l.push(e),t&&l.push(t)}function i(e,t,n){e.addEventListener(t,n,!1)}function a(e,t,n){e.removeEventListener(t,n,!1)}var s=n(19),o=n(230),l=[];s.canUseDOM&&r();var u={addEndEventListener:function(e,t){return 0===l.length?void window.setTimeout(t,0):void l.forEach(function(n){i(e,n,t)})},removeEndEventListener:function(e,t){0!==l.length&&l.forEach(function(n){a(e,n,t)})}};e.exports=u}});