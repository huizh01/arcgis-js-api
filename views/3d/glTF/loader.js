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

define(["require","exports","../../../core/tsSupport/awaiterHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/assignHelper","../../../core/maybe","../../../core/promiseUtils","../../../core/libs/gl-matrix-2/mat4f64","./DefaultErrorContext","./LoaderResult","./internal/Resource"],function(e,t,r,s,a,o,n,i,l,u,c){function d(e,t,a){return void 0===a&&(a={}),r(this,void 0,void 0,function(){var n,l,u,d,h=this;return s(this,function(f){switch(f.label){case 0:return[4,c.Resource.load(e,T,t,a)];case 1:return n=f.sent(),l="gltf_"+v++,u={lods:[],materials:new Map,textures:new Map},d=!(!n.json.asset.extras||"symbolResource"!==n.json.asset.extras.ESRI_type),[4,p(n,function(e,t,c,d){return r(h,void 0,void 0,function(){var r,p,h,f,v,g,S,M,_,w;return s(this,function(s){switch(s.label){case 0:return r=void 0!==e.mode?e.mode:4,p=m(r),o.isNone(p)?(T.warnUnsupported("Unsupported primitive mode ("+b[r]+"). Skipping primitive."),[2]):n.hasPositions(e)?[4,n.getMaterial(e,a)]:(T.warn("Skipping primitive without POSITION vertex attribute."),[2]);case 1:return h=s.sent(),v={transform:i.mat4f64.clone(t)},g={},[4,n.getPositionData(e,a)];case 2:return v.attributes=(g.position=s.sent(),g.normal=null,g.texCoord0=null,g.color=null,g.tangent=null,g),[4,n.getIndexData(e,a)];case 3:return v.indices=s.sent(),(v.primitiveType=p,v.material=x(u,h,l),f=v,n.hasNormals(e))?(S=f.attributes,[4,n.getNormalData(e,a)]):[3,5];case 4:S.normal=s.sent(),s.label=5;case 5:return n.hasTangents(e)?(M=f.attributes,[4,n.getTangentData(e,a)]):[3,7];case 6:M.tangent=s.sent(),s.label=7;case 7:return n.hasTextureCoordinates(e)?(_=f.attributes,[4,n.getTextureCoordinates(e,a)]):[3,9];case 8:_.texCoord0=s.sent(),s.label=9;case 9:return n.hasVertexColors(e)?(w=f.attributes,[4,n.getVertexColors(e,a)]):[3,11];case 10:w.color=s.sent(),s.label=11;case 11:return u.lods[c]=u.lods[c]||{parts:[],name:d,lodThreshold:null},u.lods[c].parts.push(f),[2]}})})})];case 2:return f.sent(),[2,{model:u,meta:{isEsriSymbolResource:d,uri:n.uri},customMeta:{}}]}})})}function m(e){switch(e){case 4:case 5:case 6:return e;default:return null}}function p(e,t){return r(this,void 0,void 0,function(){function a(n,i){return r(this,void 0,void 0,function(){var r,l,u,c,d,m,p,h,x;return s(this,function(s){switch(s.label){case 0:if(r=o.nodes[n],l=e.getNodeTransform(n),T.warnUnsupportedIf(null!=r.weights,"Morph targets are not supported."),null==r.mesh)return[3,4];u=o.meshes[r.mesh],c=0,d=u.primitives,s.label=1;case 1:return c<d.length?(m=d[c],[4,t(m,l,i,u.name)]):[3,4];case 2:s.sent(),s.label=3;case 3:return c++,[3,1];case 4:p=0,h=r.children||[],s.label=5;case 5:return p<h.length?(x=h[p],[4,a(x,i)]):[3,8];case 6:s.sent(),s.label=7;case 7:return p++,[3,5];case 8:return[2]}})})}var o,i,l,u,c,d,m,p,x,f;return s(this,function(t){switch(t.label){case 0:o=e.json,i=o.scenes[o.scene||0],l=i.nodes,u=l.length>1,c=0,d=l,t.label=1;case 1:return c<d.length?(m=d[c],p=o.nodes[m],x=[a(m,0)],h(p)&&!u&&(f=p.extensions.MSFT_lod.ids,x.push.apply(x,f.map(function(e,t){return a(e,t+1)}))),[4,n.all(x)]):[3,4];case 2:t.sent(),t.label=3;case 3:return c++,[3,1];case 4:return[2]}})})}function h(e){return e.extensions&&e.extensions.MSFT_lod&&Array.isArray(e.extensions.MSFT_lod.ids)}function x(e,t,r){var s=function(t){var s=r+"_tex_"+(t&&t.id)+(t&&t.name?"_"+t.name:"");if(t&&!e.textures.has(s)){var a=u.makeTextureSource(t.data,{wrap:{s:f(t.wrapS),t:f(t.wrapT)},mipmap:g.some(function(e){return e===t.minFilter}),noUnpackFlip:!0});e.textures.set(s,a)}return s},a=r+"_mat_"+t.id+"_"+t.name;if(!e.materials.has(a)){var o=u.makeMaterialParameters({color:[t.color[0],t.color[1],t.color[2]],opacity:t.color[3],alphaMode:t.alphaMode,alphaCutoff:t.alphaCutoff,doubleSided:t.doubleSided,colorMixMode:t.ESRI_externalColorMixMode,textureColor:t.colorTexture?s(t.colorTexture):void 0,textureNormal:t.normalTexture?s(t.normalTexture):void 0,textureOcclusion:t.occlusionTexture?s(t.occlusionTexture):void 0,textureEmissive:t.emissiveTexture?s(t.emissiveTexture):void 0,textureMetallicRoughness:t.metallicRoughnessTexture?s(t.metallicRoughnessTexture):void 0,emissiveFactor:[t.emissiveFactor[0],t.emissiveFactor[1],t.emissiveFactor[2]],metallicFactor:t.metallicFactor,roughnessFactor:t.roughnessFactor});e.materials.set(a,o)}return a}function f(e){if(33071===e||33648===e||10497===e)return e;T.error("Unexpected TextureSampler WrapMode: "+e)}Object.defineProperty(t,"__esModule",{value:!0});var v=0;t.load=d;var T=new l.DefaultErrorContext,g=[9987,9985],b=["POINTS","LINES","LINE_LOOP","LINE_STRIP","TRIANGLES","TRIANGLE_STRIP","TRIANGLE_FAN"]});