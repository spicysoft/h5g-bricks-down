function rand(){return globalRandom.v()}function randF(t,e){return globalRandom.f(t,e)}function randI(t,e){return globalRandom.i(t,e)}function randBool(t){return void 0===t&&(t=.5),globalRandom.bool(t)}var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);i.prototype=e.prototype,t.prototype=new i},GameObject=function(){function t(){this.display=null,t.objects.push(this)}return Object.defineProperty(t.prototype,"X",{get:function(){return this.display.x},set:function(t){this.display.x=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"Y",{get:function(){return this.display.y},set:function(t){this.display.y=t},enumerable:!0,configurable:!0}),t.prototype.destroy=function(){this.deleteFlag=!0},t.prototype.onDestroy=function(){},t.initial=function(e){t.baseDisplay=e,t.gameDisplay=new egret.DisplayObjectContainer,t.baseDisplay.addChild(t.gameDisplay)},t.process=function(){t.objects.forEach(function(t){return t.update()}),t.objects=t.objects.filter(function(t){return t.deleteFlag&&t._delete(),!t.deleteFlag}),t.transit&&(t.dispose(),t.transit(),t.transit=null)},t.dispose=function(){t.objects=t.objects.filter(function(t){return t.destroy(),t._delete(),!1})},t.prototype._delete=function(){this.onDestroy(),this.display&&(this.display.parent.removeChild(this.display),this.display=null)},t.objects=[],t}();__reflect(GameObject.prototype,"GameObject");var PhysicsObject=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype._delete=function(){this.onDestroy(),this.body&&(e.world.removeBody(this.body),this.body.displays=[],this.body=null),this.display&&(this.display.parent.removeChild(this.display),this.display=null)},e.prototype.update=function(){if(this.display){var t=this.body,e=this.display;e.x=this.px,e.y=this.py,e.rotation=180*t.angle/Math.PI}this.fixedUpdate()},e.prepare=function(t){e.pixelPerMeter=t,e.meterPerPixel=1/t,e.width=e.pixelToMeter(Util.width),e.height=e.pixelToMeter(Util.height),e.world=new p2.World,e.world.gravity=[0,.08*e.height],e.world.defaultContactMaterial.friction=1,e.lastTime=Date.now(),e.deltaScale=1},e.progress=function(){var t=Date.now(),i=(t-this.lastTime)*this.deltaScale;this.lastTime=t,i>0&&e.world.step(1/60*this.deltaScale,i,4)},e.pixelToMeter=function(t){return t*e.meterPerPixel},e.meterToPixel=function(t){return t*e.pixelPerMeter},e.prototype.m2p=function(t){return e.meterToPixel(t)},e.prototype.p2m=function(t){return e.pixelToMeter(t)},Object.defineProperty(e.prototype,"px",{get:function(){return e.meterToPixel(this.mx)},set:function(t){this.mx=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"py",{get:function(){return e.meterToPixel(this.my)},set:function(t){this.my=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"mx",{get:function(){return this.body.position[0]},set:function(t){this.body.position[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"my",{get:function(){return this.body.position[1]},set:function(t){this.body.position[1]=t},enumerable:!0,configurable:!0}),e.deltaScale=1,e}(GameObject);__reflect(PhysicsObject.prototype,"PhysicsObject");var Camera2D=function(){function t(){}return t.initial=function(){t.x=0,t.y=0,t.localX=0,t.localY=0,t.scale=1,t.rotation=0},t.process=function(){GameObject.gameDisplay.anchorOffsetX=t.x,GameObject.gameDisplay.anchorOffsetY=t.y,GameObject.gameDisplay.x=this.localX,GameObject.gameDisplay.y=this.localY,GameObject.gameDisplay.scaleX=GameObject.gameDisplay.scaleY=t.scale,GameObject.gameDisplay.rotation=t.rotation},t}();__reflect(Camera2D.prototype,"Camera2D");var Block=function(t){function e(i,s,o){var a=t.call(this)||this;switch(a.scale=1,e.blocks.push(a),a.sizeW=BLOCK_SIZE_PER_H*Util.height*.995,a.sizeH=a.sizeW,o){case 0:a.color=BLOCK_COLOR;break;case 1:a.color=BLOCK_COLOR2;break;case 2:a.color=BLOCK_COLOR3}return a.setDisplay(i,s,o),a.setBody(i,s,o),a.display.touchEnabled=!0,a.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,a.touchBegin,a),a.display.addEventListener(egret.TouchEvent.TOUCH_TAP,a.touchBegin,a),a}return __extends(e,t),e.prototype.onDestroy=function(){var t=this;this.display.parent.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this),e.blocks=e.blocks.filter(function(e){return e!=t})},e.prototype.touchBegin=function(t){new EffectCircle(this.display.x,this.display.y,this.sizeW,this.color),this.destroy()},e.prototype.setDisplay=function(t,e,i){this.display&&this.display.parent.removeChild(this.display);var s=new egret.Shape;switch(this.display=s,GameObject.gameDisplay.addChild(this.display),s.x=t,s.y=e,s.graphics.lineStyle(3,BLOCK_LINE_COLOR),s.graphics.beginFill(this.color),i){case 0:s.graphics.drawRect(-.5*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH);break;case 1:s.graphics.drawRect(-1*this.sizeW,-.5*this.sizeH,2*this.sizeW,this.sizeH);break;case 2:s.graphics.drawRect(-1.5*this.sizeW,-.5*this.sizeH,3*this.sizeW,this.sizeH)}s.graphics.endFill()},e.prototype.setBody=function(t,e,i){switch(i){case 0:this.body=new p2.Body({gravityScale:1,mass:1,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Box({width:this.sizeW,height:this.sizeH}),[0,0],0);break;case 1:this.body=new p2.Body({gravityScale:1,mass:2,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Box({width:2*this.sizeW,height:this.sizeH}),[-0*this.sizeW,0],0);break;case 2:this.body=new p2.Body({gravityScale:1,mass:3,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Box({width:3*this.sizeW,height:this.sizeH}),[0*this.sizeW,0],0)}this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.fixedUpdate=function(){return this.scale+=.1*(1-this.scale),this.py>Player.I.ground.Y+Util.h(.25)?(null==GameOver.I&&Score.I.addPoint(),void this.destroy()):void 0},e.blocks=[],e}(PhysicsObject);__reflect(Block.prototype,"Block");var PIXEL_PER_METER=1,BLOCK_SIZE_PER_H=.1,BLOCKS=5,SAVE_KEY_BESTSCORE="bricks-down-bestScore",BACK_COLOR=24800,FONT_COLOR=16777215,BLOCK_COLOR=14205861,BLOCK_COLOR2=15302772,BLOCK_COLOR3=9342346,KEY_BLOCK_COLOR=16711680,BLOCK_LINE_COLOR=14737632,Game=function(){function t(){}return t.loadSceneGamePlay=function(){PhysicsObject.deltaScale=1,Camera2D.initial(),new Score,new Player,new StartMessage},t}();__reflect(Game.prototype,"Game");var Ground=function(t){function e(){var e=t.call(this)||this;e.sizeH=Util.h(BLOCK_SIZE_PER_H),e.sizeW=5*e.sizeH;var i=Util.w(0),s=10*e.sizeH;return e.setDisplay(i,s),e.setBody(i,s),e}return __extends(e,t),e.prototype.setDisplay=function(t,e){this.display&&this.display.parent.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.gameDisplay.addChild(this.display),i.x=t,i.y=e,i.graphics.beginFill(BLOCK_COLOR3),i.graphics.drawRect(-.5*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH),i.graphics.endFill()},e.prototype.setBody=function(t,e){this.body=new p2.Body({position:[this.p2m(t),this.p2m(e)],type:p2.Body.STATIC});var i=new p2.Box({width:this.sizeW,height:this.sizeH});this.body.addShape(i),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.fixedUpdate=function(){},e}(PhysicsObject);__reflect(Ground.prototype,"Ground");var KeyBlock=function(t){function e(e,i,s){var o=t.call(this)||this;return o.scale=1,o.sizeW=BLOCK_SIZE_PER_H*Util.height*.75,o.sizeH=o.sizeW,o.color=KEY_BLOCK_COLOR,o.setDisplay(e,i,s),o.setBody(e,i,s),o.display.touchEnabled=!1,o}return __extends(e,t),e.prototype.onDestroy=function(){},e.prototype.setDisplay=function(t,e,i){this.display&&this.display.parent.removeChild(this.display);var s=new egret.Shape;switch(this.display=s,GameObject.gameDisplay.addChild(this.display),s.x=t,s.y=e,s.graphics.lineStyle(3,BLOCK_LINE_COLOR),s.graphics.beginFill(this.color),i){case 0:s.graphics.drawRect(-.5*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH);break;case 1:s.graphics.drawRect(-1*this.sizeW,-.5*this.sizeH,2*this.sizeW,this.sizeH);break;case 2:s.graphics.drawRect(-1*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH),s.graphics.drawRect(0*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH),s.graphics.drawRect(-1*this.sizeW,-1.5*this.sizeH,this.sizeW,this.sizeH)}s.graphics.endFill()},e.prototype.setBody=function(t,e,i){switch(i){case 0:this.body=new p2.Body({gravityScale:1,mass:1,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Box({width:this.sizeW,height:this.sizeH}),[0,0],0);break;case 1:this.body=new p2.Body({gravityScale:1,mass:2,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Box({width:2*this.sizeW,height:this.sizeH}),[-0*this.sizeW,0],0);break;case 2:this.body=new p2.Body({gravityScale:1,mass:3,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Box({width:2*this.sizeW,height:this.sizeH}),[-0*this.sizeW,0],0),this.body.addShape(new p2.Box({width:this.sizeW,height:this.sizeH}),[-.5*this.sizeW,-1*this.sizeH],0)}this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.fixedUpdate=function(){if(this.scale+=.1*(1-this.scale),this.py>Camera2D.y+Util.height&&null==GameOver.I){new GameOver,Player.I.setStateNone(),PhysicsObject.deltaScale=.1;for(var t=this.sizeH*Camera2D.scale,e=0;4>e;e++){var i=rand()*Math.PI,s=Math.cos(i),o=-Math.sin(i),a=t*(2+.5*e);new EffectLine(this.display.x+s*t,this.display.y+o*t,s*a,o*a,this.color)}return void new EffectCircle(this.display.x,this.display.y,t,this.color)}},e}(PhysicsObject);__reflect(KeyBlock.prototype,"KeyBlock");var Player=function(t){function e(){var i=t.call(this)||this;i.line=0,i.state=i.stateNone,i.step=0,i.ground=null,i.keyBlock=null,e.I=i,i.x=.5*Util.width,i.y=.2*Util.height,i.ground=new Ground;var s=(Util.h(BLOCK_SIZE_PER_H),0),o=0;return i.keyBlock=new KeyBlock(s,o,2),Camera2D.x=-Util.w(.5),i}return __extends(e,t),e.prototype.onDestroy=function(){e.I=null},e.prototype.update=function(){this.state(),this.processBricksLine(),this.processCamera()},e.prototype.setStateNone=function(){this.state=this.stateNone,this.step=0},e.prototype.stateNone=function(){},e.prototype.processBricksLine=function(){var t=(Camera2D.y+Util.h(1))/Util.h(BLOCK_SIZE_PER_H);if(this.line<t){this.line++;var e=Util.h(BLOCK_SIZE_PER_H),i=randBool()?1:-1,s=BLOCKS,o=(e*(-s/2)+.5*e)*i,a=e*this.line;for(this.ground.my=e*(this.line+1);s>0;)s>=3&&randBool(.3)?(o+=e*i,new Block(o,a,2),o+=2*e*i,s-=3):s>=2&&randBool(.4)?(o+=.5*e*i,new Block(o,a,1),o+=1.5*e*i,s-=2):(new Block(o,a,0),o+=e*i,s-=1)}},e.prototype.processCamera=function(){var t=this.keyBlock.body.velocity[1];if(t<=Util.h(.01)){var e=this.keyBlock.Y-Util.h(.3);Camera2D.y=Util.lerp(Camera2D.y,e,1/32)}},e.I=null,e}(GameObject);__reflect(Player.prototype,"Player");var Button=function(t){function e(e,i,s,o,a,r,n,h,l,c){var p=t.call(this)||this;p.text=null,p.onTap=null,p.press=!1,p.touch=!1,p.x=0,p.y=0;var d=new egret.Shape;GameObject.baseDisplay.addChild(d),d.graphics.beginFill(h,l);var y=r*Util.width,u=n*Util.height;return d.graphics.drawRoundRect(-.5*y,-.5*u,y,u,.2*y),d.graphics.endFill(),d.touchEnabled=!0,d.x=o*Util.width,d.y=a*Util.height,p.display=d,e&&(p.text=Util.newTextField(e,i,s,o,a,!0,!1),GameObject.baseDisplay.addChild(p.text)),p.onTap=c,p.onTap&&p.display.addEventListener(egret.TouchEvent.TOUCH_TAP,p.onTap,p),p.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,p.touchBegin,p),p.display.addEventListener(egret.TouchEvent.TOUCH_MOVE,p.touchMove,p),p.display.addEventListener(egret.TouchEvent.TOUCH_END,p.touchEnd,p),p}return __extends(e,t),e.prototype.onDestroy=function(){this.onTap&&this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this),GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this),GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this),GameObject.baseDisplay.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this),this.text&&GameObject.baseDisplay.removeChild(this.text)},e.prototype.update=function(){var t=this.touch?1.1:1;this.display.scaleX=this.display.scaleY=this.display.scaleX+.25*(t-this.display.scaleX),this.press=!1},e.prototype.touchBegin=function(t){this.x=t.stageX,this.y=t.stageY,this.press=!0,this.touch=!0},e.prototype.touchMove=function(t){this.x=t.stageX,this.y=t.stageY,this.touch=!0},e.prototype.touchEnd=function(t){this.touch=!1},e}(GameObject);__reflect(Button.prototype,"Button");var EffectCircle=function(t){function e(i,s,o,a){void 0===a&&(a=16760832);var r=t.call(this)||this;return r.frame=e.maxFrame,r.radius=o,r.color=a,r.setShape(i,s,r.radius),r}return __extends(e,t),e.prototype.setShape=function(t,i,s){var o=new egret.Shape;this.display&&this.display.parent.removeChild(this.display),this.display=o,GameObject.gameDisplay.addChild(this.display),o.x=t,o.y=i,o.graphics.lineStyle(3+10*(this.frame/e.maxFrame),this.color),o.graphics.drawCircle(0,0,s)},e.prototype.update=function(){return--this.frame<=0?void this.destroy():(this.radius*=1.03,void this.setShape(this.display.x,this.display.y,this.radius))},e.maxFrame=30,e}(GameObject);__reflect(EffectCircle.prototype,"EffectCircle");var Main=function(t){function e(){var e=t.call(this)||this;return e.once(egret.Event.ADDED_TO_STAGE,e.addToStage,e),e}return __extends(e,t),e.prototype.addToStage=function(){Util.initial(this),GameObject.initial(this.stage),PhysicsObject.prepare(PIXEL_PER_METER),Camera2D.initial(),Game.loadSceneGamePlay(),egret.startTick(this.tickLoop,this)},e.prototype.tickLoop=function(t){return PhysicsObject.progress(),GameObject.process(),Camera2D.process(),!1},e}(eui.UILayer);__reflect(Main.prototype,"Main");var EffectLine=function(t){function e(e,i,s,o,a){void 0===a&&(a=16760832);var r=t.call(this)||this;return r.frame=0,r.x=e,r.y=i,r.vx=s,r.vy=o,r.color=a,r.setShape(.01),r}return __extends(e,t),e.create=function(t,i,s,o,a){void 0===a&&(a=4);for(var r=0;a>r;r++){var n=rand()*Math.PI*2,h=Math.cos(n),l=Math.sin(n),c=s*(2+r);new e(t+h*s,i+l*s,h*c,l*c,o)}},e.prototype.setShape=function(t){var e=new egret.Shape;this.display&&this.display.parent.removeChild(this.display),this.display=e,GameObject.gameDisplay.addChild(this.display),t=t*Math.PI*.5;var i=Math.sin(t),s=1-Math.cos(t);e.graphics.lineStyle(6,this.color),e.graphics.moveTo(this.x+this.vx*i,this.y+this.vy*i),e.graphics.lineTo(this.x+this.vx*s,this.y+this.vy*s)},e.prototype.update=function(){if(++this.frame>=e.maxFrame)return void this.destroy();var t=this.frame/e.maxFrame;this.setShape(t)},e.maxFrame=30,e}(GameObject);__reflect(EffectLine.prototype,"EffectLine");var Random=function(){function t(e){void 0===e&&(e=Math.floor(Math.random()*t.max)),this.x=123456789,this.y=362436069,this.z=521288629,this.w=e}return t.prototype.v=function(){return(this.next()&t.max)/(t.max+1)},t.prototype.f=function(t,e){return t+this.v()*(e-t)},t.prototype.i=function(t,e){return Math.floor(this.f(t,e))},t.prototype.bool=function(t){return void 0===t&&(t=.5),this.v()<t},t.prototype.next=function(){var t;return t=this.x^this.x<<11,this.x=this.y,this.y=this.z,this.z=this.w,this.w=this.w^this.w>>>19^(t^t>>>8)},t.max=1073741823,t}();__reflect(Random.prototype,"Random");var globalRandom=new Random,Rect=function(t){function e(e,i,s,o,a,r,n){void 0===r&&(r=!1),void 0===n&&(n=!1);var h=t.call(this)||this,l=new egret.Shape;h.display=l;var c=r?GameObject.gameDisplay:GameObject.baseDisplay;return n?c.addChild(h.display):c.addChildAt(h.display,1),l.graphics.beginFill(a,1),l.graphics.drawRect(e,i,s,o),l.graphics.endFill(),h}return __extends(e,t),e.prototype.update=function(){},e}(GameObject);__reflect(Rect.prototype,"Rect");var Util=function(){function t(){}return t.w=function(e){return e*t.width},t.h=function(e){return e*t.height},t.initial=function(t){this.width=t.stage.stageWidth,this.height=t.stage.stageHeight},t.clamp=function(t,e,i){return e>t&&(t=e),t>i&&(t=i),t},t.clamp01=function(e){return t.clamp(e,0,1)},t.lerp=function(t,e,i){return t+(e-t)*i},t.deltaAngle=function(t){var e=(t+Math.PI)/(2*Math.PI);return e=65536*e&65535,e=e/65536*Math.PI*2-Math.PI},t.color=function(t,e,i){return 65536*Math.floor(255*t)+256*Math.floor(255*e)+Math.floor(255*i)},t.colorLerp=function(t,e,i){var s=1-i,o=((16711680&t)*s+(16711680&e)*i&16711680)+((65280&t)*s+(65280&e)*i&65280)+((255&t)*s+(255&e)*i&255);return o},t.newTextField=function(e,i,s,o,a,r,n){var h=new egret.TextField;return h.text=e,h.bold=r,h.size=i,h.textColor=s,n?(h.x=(t.width-h.width)*o,h.y=(t.height-h.height)*a):(h.x=t.width*o-.5*h.width,h.y=t.height*a-.5*h.height),h},t}();__reflect(Util.prototype,"Util");var GameOver=function(t){function e(){var i=t.call(this)||this;return i.texts=[],i.retryButton=null,i.step=0,i.fadeInFrame=64,e.I=i,i.texts[0]=Util.newTextField("SCORE : "+Score.I.point.toFixed(),Util.width/12,FONT_COLOR,.5,.3,!0,!1),egret.Tween.get(i.texts[0],{loop:!1}).to({alpha:0},0).to({alpha:1},1e3),GameObject.baseDisplay.addChild(i.texts[0]),i}return __extends(e,t),e.prototype.onDestroy=function(){this.texts.forEach(function(t){GameObject.baseDisplay.removeChild(t)}),this.texts=null,e.I=null},e.prototype.update=function(){this.step++,this.step==this.fadeInFrame&&(this.retryButton=new Button("リトライ",Util.width/16,BACK_COLOR,.5,.55,.4,.1,FONT_COLOR,1,this.onTapRetry),Score.I.point>Score.I.bestScore&&(egret.localStorage.setItem(SAVE_KEY_BESTSCORE,Score.I.point.toFixed()),this.texts[1]=Util.newTextField("NEW RECORD!",Util.width/13,FONT_COLOR,.5,.4,!0,!1),egret.Tween.get(this.texts[1],{loop:!0}).to({alpha:0},500).to({alpha:1},500),GameObject.baseDisplay.addChild(this.texts[1])))},e.prototype.onTapRetry=function(){GameObject.transit=Game.loadSceneGamePlay,this.destroy()},e.I=null,e}(GameObject);__reflect(GameOver.prototype,"GameOver");var Score=function(t){function e(){var i=t.call(this)||this;i.point=0,i.bestScore=0,i.text=null,i.textBest=null,e.I=i,i.point=0,i.text=Util.newTextField("0",Util.width/22,FONT_COLOR,.5,0,!0,!0),GameObject.baseDisplay.addChild(i.text);var s=egret.localStorage.getItem(SAVE_KEY_BESTSCORE);return null==s&&(s="20",egret.localStorage.setItem(SAVE_KEY_BESTSCORE,s)),i.bestScore=parseInt(s),i.textBest=Util.newTextField("BEST:"+s,Util.width/22,FONT_COLOR,0,0,!0,!0),GameObject.baseDisplay.addChild(i.textBest),i}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.baseDisplay.removeChild(this.text),this.text=null,GameObject.baseDisplay.removeChild(this.textBest),this.textBest=null,e.I=null},e.prototype.update=function(){},e.prototype.addPoint=function(t){void 0===t&&(t=1),this.setPoint(this.point+t)},e.prototype.setPoint=function(t){this.point=t,this.text.text=""+this.point.toFixed(),this.bestScore<this.point&&(this.textBest.text="BEST:"+this.point.toFixed())},e.I=null,e}(GameObject);__reflect(Score.prototype,"Score");var StartMessage=function(t){function e(){var i=t.call(this)||this;return i.rectFilter=null,i.texts=[],i.button=null,e.I=i,i.rectFilter=new Rect(0,Util.h(.325),Util.width,Util.h(.3),0,!1,!0),i.rectFilter.display.alpha=.4,i.texts[0]=Util.newTextField("レンガくずし",Util.width/12,FONT_COLOR,.5,.4,!0,!1),i.texts[1]=Util.newTextField("レンガをタップして破壊",Util.width/20,FONT_COLOR,.5,.5,!0,!1),i.texts[2]=Util.newTextField("赤いブロックを落とさないように",Util.width/20,FONT_COLOR,.5,.55,!0,!1),i.texts.forEach(function(t){GameObject.baseDisplay.addChild(t)}),i.button=new Button(null,0,0,.5,.5,1,1,0,0,i.onTap),PhysicsObject.deltaScale=0,i}return __extends(e,t),e.prototype.onDestroy=function(){this.rectFilter.destroy(),this.rectFilter=null,this.texts.forEach(function(t){t.parent.removeChild(t)}),this.texts=null,this.button.destroy(),e.I=null},e.prototype.update=function(){PhysicsObject.deltaScale>0&&this.destroy()},e.prototype.onTap=function(){PhysicsObject.deltaScale=1},e.I=null,e}(GameObject);__reflect(StartMessage.prototype,"StartMessage");