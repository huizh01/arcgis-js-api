// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","dojo/string","dojo/i18n!../../nls/jsapi","dojo/dom-style","dojo/dom-class","dojo/dom-construct","dojo/store/Memory","dojo/data/ObjectStore","dojo/json","../../lang","../../kernel","../../layers/RasterFunction","dojo/text!../../layers/support/rasterFunctionSchema.json","dojo/text!../../layers/support/rasterFunctionResources.json","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/form/TextBox","dijit/form/CheckBox","dijit/form/NumberTextBox","dijit/form/Select","dijit/TitlePane","dijit/Tooltip","./RFxArgSlider","./RFxBandMatrix","./RFxRasterArrayEditor","./RFxStatisticsGrid","./RFxBandIndexPicker","./utils","../ColorRampSelector","../../renderers/colorRampUtils"],function(e,t,i,r,a,n,s,o,u,l,c,d,g,h,f,p,m,_,v,y,b,R,A,T,x,w,F,E,S,I,j,C,L){var O,k,W,N,D={argsTable:"esriRFxArgsEditor__table",argTableRow:"esriRFxArgsEditor__tr",argNameTableRow:"esriRFxArgsEditor__tr--arg-name",argWidgetTableRow:"esriRFxArgsEditor__tr--arg-widget",fxDesc:"esriRFxArgsEditor__label--fx-desc",warningIcon:"esriRFxArgsEditor__icon--warning"},B="RasterFunctionTemplate",P="type",V="RasterFunctionVariable",U="list",H="range",M=e([_,v],{declaredClass:"esri.dijit.RasterFunctionEditor.RFxArgsEditor",widgetsInTemplate:!0,templateString:"<div class='esriRFxArgsEditor'><div data-dojo-attach-point='_argsContainterNode'></div></div>",_inputWidgets:[],_supportedDataTypes:["raster","long","double","string","longarray","stringarray","doublearray","rasterarray","colorramp","boolean","rasterstatisticsarray","arrayofrasterstatistics","cellsize"],constructor:function(i){e.safeMixin(this,i),this._i18n=n.widgets.rasterFunctionEditor.rfxArgsEditor,this._rfxTemplate=t.clone(this.rfxTemplate),O=d.parse(a.substitute(p,n,t.hitch(this,this._substituteString))),k=d.parse(a.substitute(m,n,t.hitch(this,this._substituteString))),W=k&&k.enums,N=k&&k.dataTypes},startup:function(e){this.inherited(arguments)},postCreate:function(e){this.inherited(arguments),this.rfxTemplate&&(this._honorIsPublic=this._getHonorIsPublic(this.rfxTemplate),this._populateUI())},destroy:function(){this._destroyInputWidgets(),this.inherited(arguments)},reset:function(){},getName:function(){return this._rfxTemplate&&this._rfxTemplate.name},getRFT:function(e){e=e||this._rfxTemplate;var t,r,a,n=e.arguments;if(n)if(a=this._getArgRFT(n))n.type===V?n.value=this.getRFT(a):e.arguments=this.getRFT(a);else if(this._hasRFTElements(n))i.forEach(n.value.elements,function(e,t){r=this._getArgRFT(e),r?n.value.elements[t]=this.getRFT(r):e.value=this._getArgumentValue({Raster:e})},this);else if(n.type===V)n.value=this._getArgumentValue({Raster:n},e["function"]);else for(var s in n)if(n.hasOwnProperty(s)&&s!==P){var o=n[s];t={},t[s]=o,o&&(r=this._getArgRFT(o),r?o.type===V?o.value=this.getRFT(r):n[s]=this.getRFT(r):this._hasRasterElements(o)?i.forEach(o.value.elements,function(e,t){r=this._getArgRFT(e),r?o.value.elements[t]=this.getRFT(r):e.value=this._getArgumentValue(e)},this):o.type!==V||this._isColorRamp(o)?this._isColorRamp(o)&&(n[s]=this._getArgumentValue(t,e["function"])):o.value=this._getArgumentValue(t,e["function"]))}return this._cloneRFT(e,["input","uxBlocks"])},getFunctionArguments:function(){return j.getFunctionArguments(this._rfxTemplate,t.hitch(this,this._getArgumentValue))},_substituteString:function(e,t){if("undefined"==typeof e)throw new Error(" RFxArgsEditor: "+t);return null===e?"":this._escapeValue(String(e))},_getHonorIsPublic:function(e){var t=e&&e.arguments;return e&&t?e.aliases?!0:i.some(Object.keys(t),function(e){var r=t[e];return r?this._hasRasterElements(r)?i.some(r.value&&r.value.elements,this._getHonorIsPublic,this):this._getHonorIsPublic(this._getArgRFT(r)):!1},this):!1},_hasRFTElements:function(e){return e&&e.value&&e.value.elements?i.some(e.value.elements,function(e){return e&&e.type===B}):void 0},_hasRasterElements:function(e){if(e&&e.value&&e.value.elements){var t=e.value.elements[0];return t&&(t.isDataset||t.type===B)}},_isColorRamp:function(e){return e?e.type&&e.type.toLowerCase().indexOf("colorramp")>=0?!0:e.value&&e.value.type&&e.value.type.toLowerCase().indexOf("colorramp")>=0?!0:void 0:!1},_getArgRFT:function(e){return e?e.type===B?e:e.value&&e.value.type===B?e.value:void 0:void 0},_cloneRFT:function(e,r){var a={};if("object"==typeof e&&!(e instanceof Array)&&null!==e){for(var n in e)e.hasOwnProperty(n)&&i.indexOf(r,n)<0&&(a[n]=this._cloneRFT(e[n],r));return a}return t.clone(e)},_populateUI:function(){this._destroyInputWidgets(),u.empty(this._argsContainterNode),this._buildRFxTemplateUI(this._rfxTemplate)},_buildRFxTemplateUI:function(e){var t,r,a,n=e.arguments;e["function"]&&e.name&&n&&this._buildRFxUI(e),a=this._getArgRFT(n),a?this._buildRFxTemplateUI(a):this._hasRasterElements(n)&&i.forEach(n.value.elements,function(e){t=this._getArgRFT(e),t&&this._buildRFxTemplateUI(t)},this);for(var s in n)n.hasOwnProperty(s)&&s!==P&&(r=n[s],t=this._getArgRFT(r),t?this._buildRFxTemplateUI(t):this._hasRasterElements(r)&&i.forEach(r.value.elements,function(e){t=this._getArgRFT(e),t&&this._buildRFxTemplateUI(t)},this))},_getFunctionSchema:function(e){if(e&&e["function"]&&e["function"].type){var t,i,r=e["function"].type;return"gpadapterfunction"===r.toLowerCase()?(t=e&&e.arguments&&e.arguments.ToolName,t=t.value&&t.value.replace("_sa",""),O[t]):"pythonadapterfunction"===r.toLowerCase()?(i=e&&e.arguments&&e.arguments.ClassName,O[i]):O[r]}},_getSchemaArgKey:function(e,t){if(e){var r,a=Object.keys(e);return void 0===t&&1===a.length?a[0]:(i.some(a,function(e){e.toLowerCase()===(t&&t.toLowerCase())&&(r=e)}),r)}},_buildRFxUI:function(e){var t,r,a,n=e.arguments,s=[],o=[],l=[],c=this._getFunctionSchema(e),d=c&&c.rasterFunctionArguments,g=c&&c.editorArgumentOverride&&c.editorArgumentOverride.active?c.editorArgumentOverride.overrides:null,h=u.create("table",{"class":D.argsTable}),f=u.create("tbody",null,h),p=u.create("div",null,this._argsContainterNode,"first");if(!n||n.type!==B){if(n.type&&n.type===V)d&&(a=this._getSchemaArgKey(d),r=d[a]),this._isShown(n,r)&&this._buildRFxArgLayout(n,f,r);else{for(var m in n)n.hasOwnProperty(m)&&(d&&(a=this._getSchemaArgKey(d,m),r=d[a]),t=n[m],t&&(g&&i.some(g,function(e){i.indexOf(e.argumentNames,a)>=0&&this._isOverrideWidgetShown(e.argumentNames,n)&&i.indexOf(o,a)<0&&(o=o.concat(e.argumentNames),this._buildOverrideWidgetLayout(e,n,f,d))},this),i.indexOf(o,a)<0&&t.type&&t.type!==B&&this._isShown(t,r)&&(r&&i.indexOf(this._supportedDataTypes,r.dataType)<0?l.push(t.name||r.displayName):this._hasRasterElements(t)?i.forEach(t.value.elements,function(e){!this._getArgRFT(e)&&this._isShown(e,r)&&this._buildRFxArgLayout(e,f,r,n)},this):this._buildRFxArgLayout(t,f,r,n)),r&&r.editorStateTrigger&&r.editorStateTrigger.active&&s.push({rfxArg:t,schemaArgDef:r})));i.forEach(s,function(e){var i=t&&t.value;t=e.rfxArg,this._handleEditorStateTriggers(n,i,e.schemaArgDef)},this)}f.childNodes&&f.childNodes.length&&this._buildTitlePane(h,p,e["function"],l)}},_isOverrideWidgetShown:function(e,t){var r;return i.some(e,function(e){return r=this._getCaseInsenstitiveArg(e,t),this._isShown(r)?!0:void 0},this)},_isShown:function(e,t){return e?this._honorIsPublic&&!e.isPublic?!1:t&&t.hidden?!1:!0:!1},_buildTitlePane:function(e,i,r,a){var n=new T({title:r&&r.name,content:e},i);n.startup();var s=t.hitch(this,function(e,t){this.own(new x({connectId:[e],label:"<div class='"+D.fxDesc+"'>"+t+"</div>"})),e.onclick=function(e){e.stopPropagation()}});if(n.titleNode){var o=u.create("a",{"class":"esriFloatTrailing helpIcon",style:"float: right; margin-right: -6px;"},n.titleNode);if(s(o,r&&r.description),a&&a.length){var l=u.create("a",{"class":D.warningIcon},n.titleNode),c=this._i18n.unsupportedDataTypeWarning+"<br><br><strong>"+a.join(",")+"</strong>";s(l,c)}}},_buildRFxArgLayout:function(e,t,i,r){var a,n,s;if(!(e.type===B||e.value&&e.value.type===B))return n=(i&&i.dataType)===N["boolean"],s=this._useRFxArgWidget(i),(s||n)&&(a=u.create("tr",{"class":D.argTableRow},t),e.uxBlocks=[a]),s?this._buildRFxWidgetLayout(a,e,i,r):n?this._buildBooleanLayout(a,e,i,r):this._buildStdTwoRowLayout(t,e,i,r)},_useRFxArgWidget:function(e){return e&&e.domain&&e.domain.type===H},_createInputWidget:function(e,t,i,r){var a=this._getWidget(e,t,i,r);a.startup(),e.input=a,this._inputWidgets.push(a)},_createOverrideWidget:function(e,r,a){var n=new e(r,a),s=r&&r.inputArgs;n.startup(),this._inputWidgets.push(n),n.on("drawtool-activate",t.hitch(this,function(e){this.emit("drawtool-activate",e)})),n.on("drawtool-deactivate",t.hitch(this,function(e){this.emit("drawtool-deactivate",e)})),n.domNode&&s&&i.forEach(Object.keys(s),function(e){var t=s[e];t&&(t.uxBlocks=[n.domNode])})},_buildOverrideWidgetLayout:function(e,r,a,n){if(e){var s,o,l={},c={};i.forEach(e.argumentNames,function(e){s=this._getCaseInsenstitiveArg(e,r),s&&(c[e]=s)},this),i.forEach(Object.keys(n),function(e){o=n[e],o.dataType===N.raster&&(s=this._getCaseInsenstitiveArg(e,r),s&&(l[e]=s))},this);try{require([e.widget.path],t.hitch(this,function(e){var t,i,r=u.create("tr",{"class":D.argTableRow},a);t=u.create("td",null,r),i=u.create("div",null,t),this._createOverrideWidget(e,{rasterFunctionEnums:W,rasterFunctions:O,rasterArgs:l,inputArgs:c,inputLayers:this.inputLayers,map:this.map},i)}))}catch(d){console.error(d),i.forEach(Object.keys(c),function(e){s=c[e],o=this._getCaseInsenstitiveArg(e,n),this._buildRFxArgLayout(s,a,o,r)},this)}}},_buildBooleanLayout:function(e,t,i,r){var a,n;a=u.create("td",{innerHTML:t.name},e),n=u.create("div",null,a,"first"),this._createInputWidget(t,n,i,r)},_buildStdTwoRowLayout:function(e,t,i,r){var a,n,s,o,l;a=u.create("tr",{"class":D.argNameTableRow},e),o=u.create("td",{innerHTML:t.name||i&&i.displayName},a),n=u.create("tr",{"class":D.argWidgetTableRow},e),l=u.create("td",null,n),s=u.create("div",null,l),t.uxBlocks=[a,n],this._createInputWidget(t,s,i,r)},_buildRFxWidgetLayout:function(e,t,i,r){var a,n;a=u.create("td",null,e),n=u.create("div",null,a),this._createInputWidget(t,n,i,r)},_getDatasetOptions:function(){return this.inputLayers?(this._inputLayerStore=new c(new l({data:this.inputLayers})),this._inputLayerStore):void 0},_destroyInputWidgets:function(){var e=this._inputWidgets;i.forEach(e,function(e){if(e&&e.destroy)try{e.destroy()}catch(t){console.log(t)}}),this._inputWidgets=[]},_getWidget:function(e,i,r,a){if(e){var n,s=e.value,o=r&&r.dataType,u=r&&r.domain,l=r&&r.dataTypeAttributes;return!e.isDataset||s&&s.arguments||(s&&s.type&&"scalar"===s.type.toLowerCase()?n=new R({value:s.value},i):(n=new A({store:this._getDatasetOptions(),labelAttr:"name"},i),g.isDefined(s)&&this._selectInputDataset(n,s))),n||(!u&&!l||u&&"fields"===u.type?n=this._getDataTypeBasedWidget(o,e,i):u?n=this._getDomainBasedWidget(u,e,a,i):l&&(n=this._getDataTypeAttributeBasedWidget(o,l,e,a,i))),n&&n.on("change",t.partial(t.hitch(this,this._onArgumentValueChange),e,r,a)),n}},_getDataTypeBasedWidget:function(e,t,i){var r,a=t.value;switch(e){case N.rasterArray:r=new E({inputLayers:this.inputLayers},i);break;case"undefined":case N.string:r=new y({value:a},i);break;case N["double"]:r=new R({value:a},i);break;case N["long"]:r=new R({constraints:{places:0},value:a},i);break;case N.colorRamp:r=new C({style:"text-indent: 0; height: 2.2em;",maxHeight:200,includeDefault:!1},i),this._setColorRampValue(r,t);break;case N["boolean"]:r=new b({checked:a},i);break;case N.stringArray:case N.doubleArray:case N.longArray:a&&a.length&&(a=a.join(",")),r=new y({value:a},i);break;case N.rasterStatisticsArray:case N.arrayOfRasterStatistics:r=new S({value:a},i);break;case N.cellSize:r=new y({},i);try{r.set("value",d.stringify(a))}catch(n){r.set("value",a)}break;default:r=new y({value:a},i)}return r},_getDomainBasedWidget:function(e,t,i,r){if(e&&t){var a,n=e&&e.type,s=t.value;if("numlist"===n){var o=new c(new l({idProperty:"key",data:this._getNumListData(e)}));a=new A({store:o,labelAttr:"key"},r),g.isDefined(s)&&a.set("value",s.toString())}else if(n===U){var u=this._getEnumData(W[e["enum"]]),d=new c(new l({idProperty:"key",data:u}));a=new A({store:d,labelAttr:"label",maxHeight:200},r),g.isDefined(s)&&a.set("value",s.toString())}else if("range"===n)a=new w({min:e.min,max:e.max,label:t.name,value:s},r);else if("bandIndex"===n){var h=this._getCaseInsenstitiveArg(e.argumentName,i);a=new I({nBandsArg:h,value:s},r)}return a}},_getDataTypeAttributeBasedWidget:function(e,t,i,r,a){var n;if("bandmatrix"===t.type){var s=this._getCaseInsenstitiveArg(t.nBands,r);n=new F({nBandsArg:s,nCols:t.cols,displayNames:t.displayNames,value:i.value},a)}return n},_getNumListData:function(e){if(e){for(var t=[],i=e.start,r=0;r<e.count;i+=e.inc,r++)t.push({key:i.toString()});return t}},_getEnumData:function(e){return i.forEach(e,function(e){e.key=e.key.toString()}),e},_onArgumentValueChange:function(e,t,i,r){var a=e&&e.input;a instanceof A&&t&&t.dataType===N["long"]&&(r=parseInt(r,10)),this._handleEditorStateTriggers(i,r,t)},_handleEditorStateTriggers:function(e,t,r){r&&r.editorStateTrigger&&r.editorStateTrigger.active&&e&&i.forEach(r.editorStateTrigger.triggers,function(r){var a,n,o,u,l,c,d=r.autoRevert;for(var g in e)e.hasOwnProperty(g)&&(a=e[g],l=a.uxBlocks,l&&(n=i.indexOf(r.values,t)>=0,o=this._containsArgName(r.active,g),u=this._containsArgName(r.inactive,g),(o&&n||u&&!n&&d)&&(c=l&&l[0]&&"TR"===l[0].tagName?"table-row":"block"),(u&&n||o&&!n&&d)&&(c="none"),i.forEach(l,function(e){e&&c&&s.set(e,"display",c)}),c=null))},this)},_containsArgName:function(e,t){if(!e||!t)return!1;var r=t.toLowerCase();return i.some(e,function(e){return e.toLowerCase()===r})},_getArgumentValue:function(e,t){function r(e){return i.some(e,function(e){return h instanceof e?!0:void 0})}if(e&&t){var a=Object.keys(e)[0];if(a&&e[a]){e=e[a];var n,s,o,u,l,c,g,h=e.input,f=O&&O[t.type];if(u=this._getCaseInsenstitiveArg(a,f&&f.rasterFunctionArguments),l=u&&u.dataType,!h)return e.value;var p=[R,A,y],m=[b],_=[w,F,E,S],v=[C];if(e.isDataset)return e.value&&e.value.type&&"scalar"===e.value.type.toLowerCase()?h.value:(s=this._inputLayerStore.get(h.value),j.getRasterJsonFromLayer(s));if(r(v))return j.getRFxArgColorRampValue(h.colorRamp);if(r(_))return h.value;if(r(p))switch(o=h.value,l&&l.indexOf("array")>=0&&o&&"string"==typeof o&&(n=o.indexOf(",")>=0?o.split(","):o.split(" ")),l){case N.longArray:return i.forEach(n,function(e,t){n[t]=parseInt(e,10)}),n;case N.doubleArray:return i.forEach(n,function(e,t){n[t]=parseFloat(e)}),n;case N.stringArray:case N.rasterArray:return i.forEach(n,function(e,t){n[t]=e.trim()}),n;case N["long"]:return parseInt(o,10);case N.cellSize:try{return d.parse(o)}catch(T){return o}return o;case void 0:return o=o&&o.trim(),c=/^[+-]?(\d+)?(\.\d+)?$/.test(o),g=i.indexOf(["true","false"],o)>=0,c?parseFloat(o):g?"true"===o:o;default:return o}else if(r(m))return h.checked}}},_getCaseInsenstitiveArg:function(e,t){return e&&t?(i.some(Object.keys(t),function(t){return t.toLowerCase()===e.toLowerCase()?(e=t,!0):void 0}),t[e]):void 0},_selectInputDataset:function(e,t){if(e&&e.options.length&&t){var r=t,a=null;"object"==typeof t&&(r=t.url,a=t.name);var n=g.isDefined(a);i.forEach(e.options,function(e){e.selected=e.item.url===r&&(!n||n&&a===e.item.name)},this)}},_setColorRampValue:function(e,t){var i=j.getColorRampFromArg(t);if(e&&i){var r=e.setSelected(i);r||(e.addColorRamp(i),e.setSelected(i))}}});return r("extend-esri")&&t.setObject("dijit.RasterFunctionEditor.RFxArgsEditor",M,h),M});