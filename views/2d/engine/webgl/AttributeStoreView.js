// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.17/esri/copyright.txt for details.

define(["require","exports","tslib","../../../../core/Error","../../../../core/has","../../../../core/Logger","../../../../core/maybe","../../../../core/promiseUtils","../../../webgl","./definitions","./Utils","./util/debug","../../../webgl/FramebufferObject"],(function(t,e,i,r,n,a,o,s,u,d,h,p,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeStoreView=void 0;var f=a.getLogger("esri.views.2d.engine.webgl.AttributeStoreView"),T=p.createDebugLogger(p.DEBUG_ATTR_UPDATES,f),_=function(t){return 2147483647&t},c=!1,x=function(){function t(t,e,i){this._texture=null,this._lastTexture=null,this._fbos={},this.texelSize=4;var r=t.buffer,n=t.pixelType,a=t.textureOnly,s=h.getPixelArrayCtor(n);this.shared=i,this.pixelType=n,this.size=e,this.textureOnly=a,a||(this.data=new s(o.unwrap(r))),this._resetRange()}return t.prototype.destroy=function(){o.andThen(this._texture,(function(t){return t.dispose()}));var t=function(t){o.andThen(e._fbos[t],(function(e){"0"===t&&e.detachColorTexture(),e.dispose()})),e._fbos[t]=null},e=this;for(var i in this._fbos)t(i);this._texture=null},Object.defineProperty(t.prototype,"_textureDesc",{get:function(){return{target:3553,wrapMode:33071,pixelFormat:6408,dataType:this.pixelType,samplingMode:9728,width:this.size,height:this.size}},enumerable:!1,configurable:!0}),t.prototype.setData=function(t,e,i){var a=_(t),s=o.unwrap(this.data),u=a*this.texelSize+e;!s||u>=s.length?n("esri-2d-debug")&&!c&&(f.error(new r("mapview-attributeStore","Attempted to set out of bounds index")),c=!0):(s[u]=i,this.dirtyStart=Math.min(this.dirtyStart,a),this.dirtyEnd=Math.max(this.dirtyEnd,a))},t.prototype.getData=function(t,e){if(o.isNone(this.data))return null;var i=_(t)*this.texelSize+e;return!this.data||i>=this.data.length?(n("esri-2d-debug")&&!c&&(f.error(new r("mapview-attributeStore","Attempted to read out of bounds index")),c=!0),null):this.data[i]},t.prototype.getTexture=function(t){var e=this;return o.unwrapOr(this._texture,(function(){return e._initTexture(t)}))},t.prototype.getFBO=function(t,e){if(void 0===e&&(e=0),o.isNone(this._fbos[e])){var i=0===e?this.getTexture(t):this._textureDesc;this._fbos[e]=new l(t,{colorTarget:0,depthStencilTarget:0},i)}return this._fbos[e]},Object.defineProperty(t.prototype,"locked",{get:function(){return!(5121!==this.pixelType||!this.shared||this.textureOnly||!n("esri-atomics")||!this.data)&&1===Atomics.load(this.data,0)},enumerable:!1,configurable:!0}),t.prototype.updateTexture=function(t){if(!this.locked)try{var e=this.dirtyStart,i=this.dirtyEnd;if(e>i)return;this._resetRange();var n=o.unwrap(this.data).buffer,a=this.getTexture(t),s=(e-e%this.size)/this.size,u=(i-i%this.size)/this.size,d=s,p=this.size,l=u,T=s*this.size*4,_=4*(p+l*this.size)-T,c=h.getPixelArrayCtor(this.pixelType),x=c.BYTES_PER_ELEMENT;try{new c(n,T*x,_)}catch(t){console.debug(t)}var g=new c(n,T*x,_),y=this.size,b=l-d+1;if(b>this.size)return void f.error(new r("mapview-webgl","Out-of-bounds index when updating AttributeData"));a.updateData(0,0,d,y,b,g)}catch(t){console.debug(t)}},t.prototype.update=function(t){var e=t.data,i=t.start,r=t.end;if(o.isSome(e))for(var n=this.data,a=i*this.texelSize,s=0;s<e.length;s++){var u=1<<s%this.texelSize;t.layout&u&&(n[a+s]=e[s])}this.dirtyStart=Math.min(this.dirtyStart,i),this.dirtyEnd=Math.max(this.dirtyEnd,r)},t.prototype.resize=function(t,e){var i=this.size;if(this.size=e,this.textureOnly)i!==this.size&&(this._lastTexture=this._texture,this._texture=null);else{var r=h.getPixelArrayCtor(this.pixelType);this.destroy(),this.data=new r(o.unwrap(t.buffer))}},t.prototype._resetRange=function(){this.dirtyStart=2147483647,this.dirtyEnd=0},t.prototype._initTexture=function(t){var e=new u.Texture(t,this._textureDesc,o.unwrapOr(this.data,void 0));if(o.isSome(this._lastTexture)&&this._fbos[0]){var i=this._lastTexture.descriptor.width,r=this._lastTexture.descriptor.height,n=this._lastTexture.descriptor.dataType,a=this._lastTexture.descriptor.pixelFormat,s=this.getFBO(t),d=h.getPixelBytes(n),p=new(h.getPixelArrayCtor(n))(new ArrayBuffer(i*r*d*this.texelSize)),l=t.getBoundFramebufferObject(),f=t.getViewport(),T=f.x,_=f.y,c=f.width,x=f.height;t.bindFramebuffer(s),s.readPixels(0,0,i,r,a,n,p),e.updateData(0,0,0,2*i,r/2,p),t.setViewport(T,_,c,x),t.bindFramebuffer(l)}return this.destroy(),this._texture=e,this._texture},t}(),g=function(){function t(){this._initialized=!1,this._forceNextUpload=!1,this._locked=!1}return t.prototype.initialize=function(t){var e=t.blocks,i=t.shared,r=t.size;if(this.shared=i,this.size=r,T("Initializing AttributeStoreView",t),o.isNone(this._data))this._data=o.mapMany(e,(function(t){return new x(t,r,i)}));else for(var n=0;n<this._data.length;n++){var a=this._data[n],s=e[n];o.isSome(s)&&(o.isNone(a)?this._data[n]=new x(s,r,i):a.resize(s,r))}this._initialized=!0},t.prototype.destroy=function(){o.andThen(this._data,(function(t){return o.mapMany(t,(function(t){return t.destroy()}))})),o.andThen(this._defaultTexture,(function(t){return t.dispose()}))},t.prototype.getBlock=function(t){return o.isNone(this._data)?null:this._data[t]},t.prototype.setLabelMinZoom=function(t,e){this.setData(t,0,1,e)},t.prototype.getLabelMinZoom=function(t){return this.getData(t,0,1,255)},t.prototype.getFilterFlags=function(t){return this.getData(t,0,0,0)},t.prototype.getVVSize=function(t){return this.getData(t,d.ATTRIBUTE_DATA_VV,0,0)},t.prototype.getData=function(t,e,i,r){if(!this._data)return 0;var n=o.unwrap(this._data)[e];if(o.isNone(n))return 0;var a=n.getData(t,i);return o.isSome(a)?a:r},t.prototype.setData=function(t,e,i,r){var n=o.unwrap(this._data)[e];o.unwrap(n).setData(t,i,r)},t.prototype.lockTextureUpload=function(){this._locked=!0},t.prototype.unlockTextureUpload=function(){this._locked=!1},t.prototype.forceTextureUpload=function(){this._forceNextUpload=!0},t.prototype.requestUpdate=function(t){return i.__awaiter(this,void 0,void 0,(function(){var e;return i.__generator(this,(function(i){return this._pendingAttributeUpdate?(f.error(new r("mapview-webgl","Tried to update attribute data with a pending update")),[2]):(e=s.createResolver(),T("AttributeStoreView Update Requested",t),this._pendingAttributeUpdate={data:t,resolver:e},[2,e.promise])}))}))},t.prototype.update=function(){if(this._initialized&&o.isSome(this._pendingAttributeUpdate)){for(var t=this._pendingAttributeUpdate,e=t.data,i=t.resolver,r=o.unwrap(this._data),n=function(t){var i=e.blocks[t],n=r[t];o.andThen(n,(function(e){return o.andThen(i,(function(i){T("Updating block "+t,i),e.update(i)}))}))},a=0;a<e.blocks.length;a++)n(a);this._pendingAttributeUpdate=null,i()}},t.prototype.bindTextures=function(t){this.update();var e=this._getDefaultTexture(t);if(!this._initialized)return t.bindTexture(e,d.TEXTURE_BINDING_ATTRIBUTE_DATA_0),t.bindTexture(e,d.TEXTURE_BINDING_ATTRIBUTE_DATA_1),t.bindTexture(e,d.TEXTURE_BINDING_ATTRIBUTE_DATA_2),void t.bindTexture(e,d.TEXTURE_BINDING_ATTRIBUTE_DATA_3);var i=o.unwrap(this._data);this._locked&&!this._forceNextUpload||(o.forEachSome(i,(function(e){return e.updateTexture(t)})),this._forceNextUpload=!1),t.bindTexture(o.mapOr(i[0],e,(function(e){return e.getTexture(t)})),d.TEXTURE_BINDING_ATTRIBUTE_DATA_0),t.bindTexture(o.mapOr(i[1],e,(function(e){return e.getTexture(t)})),d.TEXTURE_BINDING_ATTRIBUTE_DATA_1),t.bindTexture(o.mapOr(i[2],e,(function(e){return e.getTexture(t)})),d.TEXTURE_BINDING_ATTRIBUTE_DATA_2),t.bindTexture(o.mapOr(i[3],e,(function(e){return e.getTexture(t)})),d.TEXTURE_BINDING_ATTRIBUTE_DATA_3)},t.prototype._getDefaultTexture=function(t){if(o.isNone(this._defaultTexture)){this._defaultTexture=new u.Texture(t,{wrapMode:33071,pixelFormat:6408,dataType:5121,samplingMode:9728,width:1,height:1},new Uint8Array(4))}return this._defaultTexture},t}();e.AttributeStoreView=g}));