// COPYRIGHT © 2019 Esri
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
// See http://js.arcgis.com/next/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/assignHelper","../../request","../../core/arrayUtils","../../core/Error","../../core/lang","../../core/promiseUtils"],function(t,i,e,a,n,o,l,r){function h(t){return t.level+"/"+t.row+"/"+t.col+"/"+t.width+"/"+t.height}function s(t){var i;if("vector-tile"===t.service.type)i=t.service.url+"/tilemap/"+t.level+"/"+t.row+"/"+t.col+"/"+t.width+"/"+t.height;else{var e=t.service.tileServers;i=(e&&e.length?e[t.row%e.length]:t.service.url)+"/tilemap/"+t.level+"/"+t.row+"/"+t.col+"/"+t.width+"/"+t.height}var a=t.service.query;return a&&(i=i+"?"+a),i}Object.defineProperty(i,"__esModule",{value:!0});var c=function(){function t(){this.location={left:0,top:0,width:0,height:0},this._allAvailability="unknown",this.byteSize=40}return t.prototype.getAvailability=function(t,i){if("unknown"!==this._allAvailability)return this._allAvailability;var e=(t-this.location.top)*this.location.width+(i-this.location.left),a=e%8,n=e>>3,o=this._tileAvailabilityBitSet;return n<0||n>o.length?"unknown":o[n]&1<<a?"available":"unavailable"},t.prototype._updateFromData=function(t){for(var i=this.location.width,e=this.location.height,a=!0,n=!0,o=Math.ceil(i*e/8),l=new Uint8Array(o),r=0,h=0;h<t.length;h++){var s=h%8;t[h]?(n=!1,l[r]|=1<<s):a=!1,7===s&&++r}n?this._allAvailability="unavailable":a?this._allAvailability="available":(this._allAvailability="unknown",this._tileAvailabilityBitSet=l,this.byteSize+=l.length)},t.fromDefinition=function(i,l){var h=i.service.request||a,c=i.row,f=i.col,u=i.width,d=i.height,m={query:{f:"json"}};return l=l?e({},m,l):m,h(s(i),l).then(function(t){return t.data}).catch(function(t){return t&&t.details&&422===t.details.httpStatus?{location:{top:c,left:f,width:u,height:d},valid:!0,data:function(){return n.constant(u*d,0)}()}:r.reject(t)}).then(function(i){if(i.location&&(i.location.top!==c||i.location.left!==f||i.location.width!==u||i.location.height!==d))throw new o("tilemap:location-mismatch","Tilemap response for different location than requested",{response:i,definition:{top:c,left:f,width:u,height:d}});return t.fromJSON(i)})},t.fromJSON=function(i){t.validateJSON(i);var e=new t;return e.location=Object.freeze(l.clone(i.location)),e._updateFromData(i.data),Object.freeze(e)},t.validateJSON=function(t){if(!t||!t.location)throw new o("tilemap:missing-location","Location missing from tilemap response");if(!1===t.valid)throw new o("tilemap:invalid","Tilemap response was marked as invalid");if(!t.data)throw new o("tilemap:missing-data","Data missing from tilemap response");if(!Array.isArray(t.data))throw new o("tilemap:data-mismatch","Data must be an array of numbers");if(t.data.length!==t.location.width*t.location.height)throw new o("tilemap:data-mismatch","Number of data items does not match width/height of tilemap")},t}();i.Tilemap=c,i.tilemapDefinitionId=h,i.tilemapDefinitionUrl=s,i.default=c});