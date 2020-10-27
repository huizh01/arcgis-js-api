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

define(["require","exports","tslib","../../request","../../geometry/support/jsonUtils","../utils","../../tasks/operations/offset","../../tasks/support/OffsetParameters"],(function(e,t,s,r,o,n,i,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.offset=void 0,t.offset=function(e,t,f){return s.__awaiter(this,void 0,void 0,(function(){var u,p,_,c,l;return s.__generator(this,(function(d){return t=a.from(t),u=i.offsetToRESTParameters(t),p=n.parseUrl(e),_=s.__assign(s.__assign(s.__assign({},p.query),{f:"json"}),u),c=t.geometries[0].spatialReference,l=n.asValidOptions(_,f),[2,r(p.path+"/offset",l).then((function(e){return(e.data.geometries||[]).map((function(e){return o.fromJSON(e).set({spatialReference:c})}))}))]}))}))}}));