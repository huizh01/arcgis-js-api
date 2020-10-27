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

define(["require","exports","tslib","../../Color","../../core/maybe","../../core/accessorSupport/decorators","../../renderers/visualVariables/SizeVariable","../../renderers/visualVariables/support/SizeStop","./SmartMappingSliderBase","./SizeSlider/SizeSliderViewModel","./support/utils","./../support/widget"],(function(e,i,t,a,s,r,o,l,n,d,p,u){"use strict";var m="esri-size-slider",v="esri-size-slider__ramp",c="esri-size-slider__slider-container",h="esri-size-slider__histogram-container",g="esri-widget",f="esri-widget--panel",z="esri-disabled",_={trackFillColor:new a([149,149,149]),trackBackgroundColor:new a([224,224,224])};return function(e){function i(i,a){var s=e.call(this,i,a)||this;return s._maxRampFillWidth=1,s._minRampFillWidth=.2,s._rampNode=null,s.label=void 0,s.messages=null,s.stops=null,s.style=t.__assign({},_),s.viewModel=new d,s.zoomOptions=null,s}var a;return t.__extends(i,e),a=i,i.prototype.castStyle=function(e){return t.__assign(t.__assign({},_),e)},i.fromRendererResult=function(e,i){var t=e.visualVariables,s=e.statistics,r=s.avg,o=s.stddev,l=t[0],n=p.getSizesFromVariable(l),d=n[0],u=n[1],m=e.renderer.authoringInfo.visualVariables[0],v=m.minSliderValue,c=m.maxSliderValue;return new a({max:c,min:v,stops:[{value:l.minDataValue,size:u},{value:l.maxDataValue,size:d}],histogramConfig:{average:r,standardDeviation:o,bins:i?i.bins:[]}})},i.prototype.updateFromRendererResult=function(e,i){var t=e.visualVariables,a=e.statistics,s=a.avg,r=a.stddev,o=t[0],l=p.getSizesFromVariable(o),n=l[0],d=l[1],u=e.renderer.authoringInfo.visualVariables[0],m=u.minSliderValue,v=u.maxSliderValue;this.set({max:v,min:m,stops:[{value:o.minDataValue,size:d},{value:o.maxDataValue,size:n}],histogramConfig:{average:s,standardDeviation:r,bins:i?i.bins:[]}})},i.prototype.updateVisualVariable=function(e){var i=e.clone(),t=this.stops;if(!e||!t)return null;if(i.stops)return i.stops=t,i;var a=t[0],s=t[t.length-1],r=i.maxSize,l=i.minSize;if(r instanceof o){var n=r.stops,d=s.size/n[0].size,p=n.map((function(e){return e.size*=d,e}));r.stops=p}else r=s.size;if(l instanceof o){var u=l.stops,m=a.size/u[0].size;p=u.map((function(e){return e.size*=m,e}));l.stops=p}else l=a.size;return i.set({maxDataValue:s.value,minDataValue:a.value,maxSize:r,minSize:l}),i},i.prototype.updateFromVisualVariable=function(e){if(e){var i=e.maxDataValue,t=e.minDataValue,a=e.stops;if(a)this.stops=a;else{var s=p.getSizesFromVariable(e),r=s[0],o=s[1];this.stops=[new l({value:t,size:o}),new l({value:i,size:r})]}}},i.prototype.render=function(){var e,i=this.state,t=this.label,a="disabled"===i,s=this.classes(m,g,f,((e={})[z]=a,e));return u.tsx("div",{"aria-label":t,class:s},a?null:this.renderContent(this.renderRamp(),c,h))},i.prototype.renderRamp=function(){var e=this.style.trackBackgroundColor,i=this.zoomOptions;return u.tsx("div",{afterCreate:u.storeNode,bind:this,class:v,"data-node-ref":"_rampNode"},u.tsx("svg",{key:"ramp-svg",xmlns:"http://www.w3.org/2000/svg"},u.tsx("rect",{x:"0",y:"0",fill:p.getFillFromColor(e),height:"100%",width:"100%"}),this.renderPath()),i?this.renderZoomCaps():null)},i.prototype.renderPath=function(){if(this._rampNode){var e=this._rampNode,i=e.offsetHeight,t=void 0===i?0:i,a=e.offsetWidth,r=void 0===a?0:a;if(s.isSome(t)&&s.isSome(r)){var o=this,l=o.stops,n=o.style.trackFillColor,d=o.values,m=o.viewModel,v=m.max,c=m.min,h=[o._maxRampFillWidth,o._minRampFillWidth];l[0].size<l[l.length-1].size&&h.reverse();var g=h[0],f=h[1],z=d[0],_=d[1],S=p.getPathForSizeStops({bottomValue:z,bottomWidth:g,max:v,min:c,pathHeight:t,pathWidth:r,topValue:_,topWidth:f});return u.tsx("path",{d:S,fill:p.getFillFromColor(n)})}}},t.__decorate([r.property({aliasOf:{source:"messages.widgetLabel",overridable:!0}})],i.prototype,"label",void 0),t.__decorate([r.property(),u.renderable(),u.messageBundle("esri/widgets/smartMapping/SizeSlider/t9n/SizeSlider")],i.prototype,"messages",void 0),t.__decorate([r.aliasOf("viewModel.stops")],i.prototype,"stops",void 0),t.__decorate([r.property(),u.renderable()],i.prototype,"style",void 0),t.__decorate([r.cast("style")],i.prototype,"castStyle",null),t.__decorate([r.property(),u.renderable(["viewModel.hasTimeData","viewModel.inputFormatFunction","viewModel.inputParseFunction","viewModel.labelFormatFunction","viewModel.max","viewModel.min","viewModel.stops","viewModel.values","viewModel.zoomOptions"])],i.prototype,"viewModel",void 0),t.__decorate([r.aliasOf("viewModel.zoomOptions")],i.prototype,"zoomOptions",void 0),i=a=t.__decorate([r.subclass("esri.widgets.smartMapping.SizeSlider")],i)}(n.SmartMappingSliderBase)}));