// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.10/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","dojo/errors/CancelError","../../../Color","../../../Graphic","../../../core/arrayUtils","../../../core/asyncUtils","../../../core/Collection","../../../core/compilerUtils","../../../core/Evented","../../../core/HandleOwner","../../../core/has","../../../core/iteratorUtils","../../../core/lang","../../../core/Logger","../../../core/Promise","../../../core/promiseUtils","../../../core/requireUtils","../../../core/scheduling","../../../core/watchUtils","../../../core/workers","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/gl-matrix","../../../geometry/support/aaBoundingBox","../../../geometry/support/scaleUtils","../../../layers/graphics/controllers/I3SOnDemandController","../../../symbols/Symbol3D","../../../symbols/support/unitConversionUtils","./SceneLayerWorker","./graphics/graphicUtils","./i3s/Highlights","./i3s/I3SElevationProvider","./i3s/I3SProjectionUtil","./i3s/I3SUtil","./i3s/IDBCache","./support/attributeUtils","./support/edgeUtils","./support/layerViewUpdatingProperties","./support/symbolColorUtils","../support/mathUtils","../support/orientedBoundingBox","../support/projectionUtils","../support/buffer/glUtil","../support/buffer/typedArrayUtil","../webgl-engine/Stage","../webgl-engine/lib/Geometry","../webgl-engine/lib/Layer","../webgl-engine/lib/Object3D","../webgl-engine/lib/PreinterleavedGeometryData","../webgl-engine/lib/Texture","../webgl-engine/lib/Util","../webgl-engine/lib/TextureBackedBuffer/BufferManager","../webgl-engine/materials/DefaultMaterial","module"],function(e,t,r,i,n,a,o,s,l,d,h,u,c,p,g,f,y,m,_,b,v,x,I,C,E,M,w,O,S,D,T,j,V,A,R,P,F,G,B,N,U,L,k,H,q,K,z,J,W,X,Y,Q,Z,$,ee,te,re){function ie(e,t,r,i,n){var a,o=!1;t.encoding===F.DDS_ENCODING_STRING?a=Z.DDS_ENCODING:o=!(k.isPowerOfTwo(e.width)&&k.isPowerOfTwo(e.height));var s=t.usedByEngineMats.some(function(e){return e.getParams().atlasRegions}),l=s||t.atlas,d=(l?i:r)&&!o,h=l||!t.wrap,u=l&&d&&n;return{mipmap:d,wrap:h?{s:33071,t:33071}:{s:10497,t:10497},disableAnisotropy:u,encoding:a,noUnpackFlip:!0}}function ne(e,t){for(var r=0,i=e;r<i.length;r++){var n=i[r];if(n.i3sTexId===t)return n.data}return null}function ae(e){return z.isArrayBuffer(e.data)}function oe(e,t){for(var r=1024,i=0,n=e;i<n.length;i++){var a=n[i];r+=a.interleavedVertexData.byteLength+(a.indices?a.indices.byteLength:0),r+=a.positionData.data.byteLength+a.positionData.indices.byteLength}for(var o=0,s=t;o<s.length;o++){var l=s[o];z.isArrayBuffer(l.data)&&(r+=l.data.byteLength)}return r}function se(e,t){return!(t.byteSize>ye)||(he.warn("Node is too big to store in IndexedDB cache: "+e.baseUrl+" ("+t.byteSize+" bytes)"),!1)}function le(e,t){return(0|e)+(0|t)|0}var de=J.ModelContentType,he=m.getLogger("esri.views.3d.layers.SceneLayerView3D"),ue=[1,1,1,1],ce=[.8,.8,.8],pe=[.5,.5,.5],ge=function(){function e(){}return e}(),fe=10,ye=104857600,me=function(t){function o(){var e=null!==t&&t.apply(this,arguments)||this;return e._layerUid="",e._highlights=new A(e),e._elevationProvider=null,e._worker=new j,e._workerThread=null,e._texId2Meta=new Map,e._nodeId2Meta=new Map,e._addTasks=new Map,e._rendererVersion=0,e._rendererFields=null,e._colorVariable=null,e._opacityVariable=null,e._symbolInfos=new Map,e._idbCache=new G.IDBCache("esri-scenelayer-cache","geometries",fe),e._cancelCount=0,e._hasColors=!1,e._hasTextures=!1,e._hasData=!1,e.slicePlaneEnabled=!1,e.alwaysLoadEverythingModeEnabled=!1,e._cacheKeySuffix=null,e._definitionExpressionErrors=0,e._maxDefinitionExpressionErrors=20,e._tmpAttributeOnlyGraphic=new s(null,null,{}),e}i(o,t),c=o,Object.defineProperty(o.prototype,"hasTexturesOrVertexColors",{get:function(){return this._hasData?this._hasTextures||this._hasColors?"yes":"probably-not":"unknown"},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"rendererNeedsTextures",{get:function(){return F.rendererNeedsTextures(this.layer.renderer)},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"elevationOffset",{get:function(){var e=null!=this.layer?this.layer.elevationInfo:null;if(null!=e&&"absolute-height"===e.mode){var t=O.getMetersPerVerticalUnitForSR(this.layer.spatialReference),r=T.getMetersPerUnit(e.unit);return(e.offset||0)*r/t}return 0},enumerable:!0,configurable:!0}),o.prototype._enableSecretAlwayLoadMode=function(){this.layer.store.lodModel&&"always-load"===this.layer.store.lodModel&&(this.alwaysLoadEverythingModeEnabled=!0)},Object.defineProperty(o.prototype,"uncompressedTextureDownsamplingEnabled",{get:function(){return this.view.qualitySettings.sceneService.uncompressedTextureDownsamplingEnabled&&!this.useCompressedTextures},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"useCompressedTextures",{get:function(){var e=this.layer.version,t=!g("trident")||e.major>1||1===e.major&&e.minor>3;return this.view._stage.has("s3tc")&&t},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"_enableMipMaps",{get:function(){return!this.uncompressedTextureDownsamplingEnabled},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"_enableAtlasMipMaps",{get:function(){return this._enableMipMaps},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"_atlasBiasCompensationEnabled",{get:function(){return this.view&&this.view._stage&&!this.view._stage.has("shaderTextureLOD")&&this._enableAtlasMipMaps},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"_disableAtlasAnisotropy",{get:function(){return this._atlasBiasCompensationEnabled},enumerable:!0,configurable:!0}),o.prototype.initialize=function(){var t=this;if(C.open(v.getAbsMid("./SceneLayerWorker",e,re)).then(function(e){t.destroyed?e.close():t._workerThread=e}),F.checkSceneLayerValid(this.layer),F.checkSceneLayerCompatibleWithView(this.layer,this.view),this._layerUid=this.layer.uid,this._controller=new S({layerView:this}),this.gpuMemoryEstimate=0,this.texMemoryEstimate=0,this.geoMemoryEstimate=0,this._stage=this.view._stage,this._isIntegratedMesh||!this.layer.store.defaultGeometrySchema)this._hasSymbolColors=!1;else{var r=this.layer.store.defaultGeometrySchema.featureAttributes;this._hasSymbolColors=!!(r&&r.faceRange&&r.id)}this._hasVertexColors=null!=this.layer.store.defaultGeometrySchema.vertexAttributes.color&&(null==this.layer.cachedDrawingInfo||!this.layer.cachedDrawingInfo.color),this._isIntegratedMesh||(this._edgeView=this._stage.view.getEdgeView()),this._memCache=this.view.resourceController.getMemCache(this.layer.uid,function(e){return t._deleteNodeStageData(e)}),this._addThisLayerToStage(),this._elevationProvider=new R({layerView:this,stageLayer:this._stageLayer}),this.handles.add([I.init(this.view,"clippingArea",function(){return t._clippingAreaChanged()}),I.init(this.layer,"renderer",function(e){return t._rendererChange(e)}),I.init(this.layer,"objectIdFilter",function(){return t._filterChange()}),I.init(this,"_controller.parsedDefinitionExpression",function(){return t._filterChange()}),I.watch(this,"fullOpacity",function(e){return t._opacityChange(e)}),I.watch(this,"slicePlaneEnabled",function(e){return t._slicePlaneEnabledChange(e)}),I.watch(this,"elevationOffset",function(e,r){return t._reloadAll(r)}),I.watch(this,["rendererNeedsTextures","uncompressedTextureDownsamplingEnabled"],function(){t._reloadAll(),t._memCache.clear()}),I.init(this,"suspended",function(e){return t._suspendedChange(e)})],"sceneLayerHandles"),g("disable-feature:single-idb-cache")&&(this._idbCache=new G.IDBCache("esri-scenelayer-cache-v"+fe,"geometries",fe)),this._idbCache.init().catch(function(e){he.warn("Failed to initialize IndexedDB cache: "+e)}),this._cacheKeySuffix=F.getCacheKeySuffix(this.layer.spatialReference,this.view.renderSpatialReference),this._componentColorManager=this._hasSymbolColors?new ee.BufferManager(this._stage.view.renderingContext):null,this._enableSecretAlwayLoadMode()},o.prototype.destroy=function(){this.handles.remove("sceneLayerHandles"),this._workerThread&&(this._workerThread.close(),this._workerThread=null),this._removeAllNodeDataFromStage(),this._memCache.destroy(),this._memCache=null,this._removeThisLayerFromStage(),this._stage=null,this._idbCache&&(this._idbCache.destroy(),this._idbCache=null),null!=this._controller&&(this._controller.destroy(),this._controller=null),this._highlights.destroy(),this._texId2Meta=null,this._nodeId2Meta=null,this.emit("visible-geometry-changed"),this._visibleGeometryChangedSchedulerHandle&&(this._visibleGeometryChangedSchedulerHandle.remove(),this._visibleGeometryChangedSchedulerHandle=null)},o.prototype.memEstimateTextureAdded=function(e){var t=e.getEstimatedTexMemRequired();return this.gpuMemoryEstimate+=t,this.texMemoryEstimate+=t,t},o.prototype.memEstimateTextureRemoved=function(e){var t=e.getEstimatedTexMemRequired();this.gpuMemoryEstimate-=t,this.texMemoryEstimate-=t},o.prototype.memEstimateGeometryAdded=function(e){var t=e.estimateGpuMemoryUsage();return this.gpuMemoryEstimate+=t,this.geoMemoryEstimate+=t,t},o.prototype.memEstimateGeometryRemoved=function(e){var t=e.estimateGpuMemoryUsage();this.gpuMemoryEstimate-=t,this.geoMemoryEstimate-=t},o.prototype.isNodeLoaded=function(e){return this._nodeId2Meta.has(e.id)},o.prototype.getUsedMemory=function(){var e=0;return this._nodeId2Meta.forEach(function(t){return e+=t.node.memory}),e},o.prototype.getUnloadedMemory=function(){return this._controller?this._controller.unloadedMemoryEstimate:0},o.prototype.ignoresMemoryFactor=function(){return!1},o.prototype._suspendedChange=function(e){if(e)this._removeAllNodeDataFromStage(),this.view.elevationProvider.unregister(this._elevationProvider);else{var t=this._elevationContext;this.view.elevationProvider.register(t,this._elevationProvider)}},o.prototype.getStats=function(){var e={index:0,nodes:this._nodeId2Meta.size.toString(),textures:this._texId2Meta.size,"Total GPU Memory Estimate":(this.gpuMemoryEstimate/1048576).toFixed(1)+"MB","Geometry Memory Estimate":(this.geoMemoryEstimate/1048576).toFixed(1)+"MB","Texture Memory Estimate":(this.texMemoryEstimate/1048576).toFixed(1)+"MB"};return this._controller&&(this._cachingEnabled()&&(e.IDBCache=Math.round(100*this._idbCache.getHitRate())+"% hit"),this._controller.updateStats(e)),e},o.prototype._addThisLayerToStage=function(){for(var e=this._stage,t=new Uint8Array(256),r=0;r<t.length;r++)t[r]=255;this._whiteTexture=new Z(t,"white",{width:8,height:8}),e.add(de.TEXTURE,this._whiteTexture);var i=this.layer.id+"",n=new X(i,{},i);this._stageLayer=n,e.add(de.LAYER,n),this._stage.addToViewContent([n.id])},o.prototype._removeThisLayerFromStage=function(){if(null!=this._stageLayer){var e=this._stage;e.remove(de.TEXTURE,this._whiteTexture.id),this._removeAllNodeDataFromStage(),$.assert(0===this._nodeId2Meta.size),$.assert(0===this._texId2Meta.size),e.remove(de.LAYER,this._stageLayer.id),this._stageLayer=void 0,this.gpuMemoryEstimate=0}},o.prototype.getLoadedAttributes=function(e){var t=this._nodeId2Meta.get(e.id);if(t&&t.attributeInfo)return t.attributeInfo.loadedAttributes},o.prototype.getAttributeData=function(e){var t=this._nodeId2Meta.get(e.id);if(t&&t.attributeInfo)return t.attributeInfo.attributeData},o.prototype.setAttributeData=function(e,t){var r=this._nodeId2Meta.get(e.id);r&&(r.attributeInfo=t,r.cachedRendererVersion=this._getInvalidRendererVersion(),this._updateEngineObject(e,r))},o.prototype.getLoadedNodeIDs=function(){return l.keysOfMap(this._nodeId2Meta)},o.prototype._calcEngineMaterialTransparencyParams=function(e,t,r){var i=this.fullOpacity,n=1-k.clamp($.fallbackIfUndefined(t.transparency,0),0,1);return{opacity:n,layerOpacity:i,transparent:n<1||i<1||e&&y.endsWith(e.channels,"a")||!0===t.useVertexColorAlpha||r}},o.prototype._calcEngineMaterialDoubleSidedParams=function(e){return null==e.doubleSided||e.doubleSided},o.prototype._calcEngineMaterialCullFaceParams=function(e){return e.cullFace?e.cullFace:null!=e.doubleSided?e.doubleSided?"none":"back":"none"},o.prototype._getMaterialParameters=function(e,t,r,i){var n;if(null!=e){var a=this._texId2Meta.get(t);n=a&&a.engineTex?a.engineTex.id:this._whiteTexture.id}var o=r.params,s=$.fallbackIfUndefined(o.diffuse,ce);"standard"!==r.type&&he.warn("Unknown material type '"+r.type+"', must be 'standard'");var l=this._isIntegratedMesh,d={ambient:s,diffuse:s,specular:$.fallbackIfUndefined(o.specular,pe),atlasRegions:o.vertexRegions,textureId:n,vertexColors:this._hasVertexColors,componentIndices:this._hasSymbolColors,componentColorBuffer:this._hasSymbolColors&&i?i.textureBuffer:null,flipV:!1,doubleSided:this._calcEngineMaterialDoubleSidedParams(o),cullFace:this._calcEngineMaterialCullFaceParams(o),writeStencil:l,receiveSSAO:!l,groundNormalShading:l,compressedNormals:!l};if(!l){var h=this._calcEngineMaterialTransparencyParams(e,o);y.mixin(d,h)}return d},o.prototype._createEngineMaterial=function(e,t,r,i,n,a,o){var s=null==t?null:this._getI3STexEncoding(t),l=this._getMaterialParameters(t,r,i,o),d=new te(l,n);if(d.metadata={i3sMatId:n,i3sTexId:r,i3sTex:t,i3sMatParams:i.params},null!=t){var h=this._texId2Meta.get(r);h?h.usedByEngineMats.push(d):(h={id:r,usedByEngineMats:[d],images:t.images,encoding:s,atlas:!0===t.atlas,wrap:"none"!==t.wrap[0]||"none"!==t.wrap[1]},this._texId2Meta.set(r,h));var u=ne(a,r);if(null!=u&&null==h.engineTex){var c=ie(u,h,this._enableMipMaps,this._enableAtlasMipMaps,this._disableAtlasAnisotropy);h.engineTex=new Z(u,h.id,c),this._stage.add(de.TEXTURE,h.engineTex),e.memory+=this.memEstimateTextureAdded(h.engineTex)}if(null!=h.engineTex)for(var p=h.engineTex.id,g=0,f=h.usedByEngineMats;g<f.length;g++){var y=f[g];y.setParameterValues({textureId:p})}}return d},o.prototype._getI3STexEncoding=function(e){var t=F.getAppropriateTextureEncoding(e.encoding,this.useCompressedTextures);return t>-1?e.encoding[t]:e.encoding},o.prototype._getVertexBufferLayout=function(e,t){var r=e.params.materialID,i=t.materialDefinitions[r];$.assert(void 0!==i,"geometry wants unknown material "+r);var n,a=e.params.textureID||"none";"none"!==a&&(null!=t.textureDefinitions&&null!=t.textureDefinitions[a]||he.warn("textureDefinitions missing in shared resource"),n=t.textureDefinitions[a]);var o=this._getMaterialParameters(n,a,i);return K.glLayout(te.getVertexBufferLayout(o))},o.prototype._createEngineMat=function(e,t,r,i,n){var a=t.params.materialID,o=r.materialDefinitions[a];$.assert(void 0!==o,"geometry wants unknown material "+a);var s,l=t.params.textureID||"none";return"none"!==l&&(null!=r.textureDefinitions&&null!=r.textureDefinitions[l]||he.warn("textureDefinitions missing in shared resource"),s=r.textureDefinitions[l]),this._createEngineMaterial(e,s,l,o,a,i,n)},o.prototype._getObjectIdField=function(){return this.layer.objectIdField||"OBJECTID"},o.prototype._findGraphicNodeAndIndex=function(e){var t=B.attributeLookup(e.attributes,this._getObjectIdField()),r=null;return f.everyMap(this._nodeId2Meta,function(e,i){var n=e.featureIds.indexOf(t);return-1===n||(r={node:e.node,index:n},!1)}),r},o.prototype._getGraphicIndices=function(e,t){var r=this._nodeId2Meta.get(e.id);if(!r)return[];for(var i=[],n=this._getObjectIdField(),a=0,o=t;a<o.length;a++){var s=o[a],l=B.attributeLookup(s.attributes,n),d=r.featureIds.indexOf(l);-1!==d&&i.push(d)}return i},o.prototype.whenGraphicBounds=function(e){var t=this._findGraphicNodeAndIndex(e);if(!t)return b.reject();var r=this._nodeId2Meta.get(t.node.id).engineObject,i=this._boundingBoxCornerPoints(t.index,r,new Float64Array(24));if(q.bufferToBuffer(i,this.view.renderSpatialReference,0,i,this.view.spatialReference,0,8)){var n=w.empty();return w.expandWithBuffer(n,i,0,8),b.resolve({boundingBox:n,screenSpaceObjects:[]})}},o.prototype.whenGraphicAttributes=function(e,t){var r=this,i=function(e){for(var t=new Map,i=[],n=0,a=e;n<a.length;n++){var o=a[n],s=r._findGraphicNodeAndIndex(o),l=t.get(s.node);l||(l={node:s.node,indices:[],graphics:[]},i.push(l)),l.indices.push(s.index),l.graphics.push(o)}return i};return F.whenGraphicAttributes(this.layer,e,this._getObjectIdField(),t,i,{ignoreUnavailableFields:!0,populateObjectId:!0})},o.prototype.getGraphicFromStageObject=function(e,t){if(this._isIntegratedMesh)return b.reject();var r=this._getMetadata(e),i=e.getComponentFromTriangleNr(0,t);if(null!=i&&null!=r.featureIds&&i<r.featureIds.length){var n=this._createGraphic(i,r);return b.resolve(n)}return b.reject()},o.prototype.hasStageObject=function(e){var t=e.getMetadata(),r=this._nodeId2Meta.get(t.i3sNode);return r&&r.engineObject===e},o.prototype._getMetadata=function(e){var t=e.getMetadata();return this._nodeId2Meta.get(t.i3sNode)},o.prototype._getCacheKey=function(e){return e.baseUrl+this._cacheKeySuffix},o.prototype._getMemCacheKey=function(e,t){return void 0===t&&(t=this.elevationOffset),e+"#"+t},o.prototype._cachingEnabled=function(){return!this._controller.disableIDBCache&&0===this.elevationOffset&&null!=this._cacheKeySuffix},o.prototype.additionalCancelNodeLoadingHandler=function(){this._cancelCount=le(this._cancelCount,1)},o.prototype._handleCancelled=function(e){if(le(this._cancelCount,-e)>0)throw new a},o.prototype.loadCachedGPUData=function(e){return this._memCache.pop(this._getMemCacheKey(e.id))},o.prototype.loadCachedNodeData=function(e,t){var r=this,i=this._cancelCount;return this._cachingEnabled()?this._idbCache.get(this._getCacheKey(e)).then(function(n){if(null==n)return null;if(r._handleCancelled(i),n.nodeVersion!==e.version)return r._idbCache.remove(r._getCacheKey(e)),null;e.obb||(e.obb=H.clone(n.nodeObb),r._controller.updateVisibility(e.id));var a=function(e){if(null==e.data)return!0;var t=n.sharedResource.textureDefinitions[e.i3sTexId],i=r._getI3STexEncoding(t);return e.encoding!==i};return r.rendererNeedsTextures&&n.textureData.some(a)?t(n.allGeometryData,n.sharedResource).then(function(t){return n.textureData=t,n.byteSize=oe(n.transformedGeometries,n.textureData),t.every(ae)&&se(e,n)&&r._idbCache.put(r._getCacheKey(e),n).catch(function(t){t&&"indexedb:not-initialized"===t.name||he.warn("Failed to update node with textures in IndexedDB cache: "+e.id+": "+t)}),r._handleCancelled(i),n}):n}):b.resolve(null)},o.prototype.addNodeData=function(e,t){var i=this;return this._addData(e,t.attributeDataInfo,function(){return i._transformBundle(e,t).then(function(t){return i._controller.reschedule(e.id,t)}).then(function(n){e.obb||(e.obb=n.obb,i._controller.updateVisibility(e.id));var a={allGeometryData:t.allGeometryData,transformedGeometries:n.transformedGeometries,textureData:t.textureData,sharedResource:t.sharedResource,nodeVersion:e.version,nodeObb:e.obb,byteSize:i._cachingEnabled()?oe(n.transformedGeometries,t.textureData):0};if(se(e,a)&&a.byteSize>0){var o=a.textureData.map(function(e){return ae(e)?e:{i3sTexId:e.i3sTexId,encoding:e.encoding,data:null}});i._idbCache.put(i._getCacheKey(e),r({},a,{textureData:o})).catch(function(t){return he.warn("Failed to store node in IndexedDB cache: "+e.id+": "+t)})}return i._addCachedNodeData(e,a)})})},o.prototype._transformBundle=function(e,t){for(var r=this,i=[],n=[t.geometryBuffer],a=0,o=t.allGeometryData;a<o.length;a++)for(var s=o[a].geometries,l=0,d=s;l<d.length;l++){var h=d[l];i.push(this._getVertexBufferLayout(h,t.sharedResource))}var u={geometryBuffer:t.geometryBuffer,geometryData:t.allGeometryData,layouts:i,mbs:e.mbs,obb:e.obb,elevationOffset:this.elevationOffset,needNormals:!this._isIntegratedMesh&&this._controller.isMeshPyramid,normalReferenceFrame:this.layer.normalReferenceFrame||"none",indexSR:this._controller.crsIndex.toJSON(),vertexSR:this._controller.crsVertex.toJSON(),renderSR:this.view.renderSpatialReference.toJSON()};return this._workerThread?this._workerThread.invoke("process",u,{transferList:n}):this._controller.reschedule(e.id,u).then(function(e){return r._worker.transform(e)})},o.prototype.addCachedGPUData=function(e,t){if(!this.alwaysLoadEverythingModeEnabled&&!this._controller.isGeometryVisible(e))return void this._memCache.put(this._getMemCacheKey(e.id),t,e.memory);this._nodeId2Meta.set(e.id,t),t.engineObject.setHidden(t.engineObject.geometryRecords[0],!1);for(var r=0,i=t.engineObject.getGeometryRecords();r<i.length;r++){i[r].material.setParameterValues({slicePlaneEnabled:this.slicePlaneEnabled})}this._updateEngineObject(e,t),this._highlights.objectCreated(t.engineObject)},o.prototype.addCachedNodeData=function(e,t,r){var i=this;return this._addData(e,r,function(){return i._addCachedNodeData(e,t)})},o.prototype._addCachedNodeData=function(e,t){var r=this;if(this.suspended||!this.alwaysLoadEverythingModeEnabled&&!this._controller.isGeometryVisible(e))return b.resolve();var i=t.allGeometryData,n=t.transformedGeometries,a=t.textureData,o=t.sharedResource;if(0===i.length)return b.resolve();if(1!==i.length&&console.warn("Node with",i.length,"geometries is unsupported"),!this.rendererNeedsTextures)for(var s=0,l=a;s<l.length;s++){var d=l[s];d.data=null}var h={};h[de.OBJECT]={},h[de.GEOMETRY]={},h[de.MATERIAL]={};var u=0,c=!1;e.memory=0;var p=i[0],g=p.componentOffsets,f=p.geometries,y=p.featureIds,m=null,_=null;if(this._hasSymbolColors){m=this._componentColorManager.getBuffer(y.length),_=new Uint16Array(y.length);for(var v=0;v<y.length;v++)_[v]=m.aquireIndex()}for(var x,I=e.id+"|"+y[0],C=[],E=[],w=[],O=[],S=0,D=f;S<D.length;S++){var T=D[S],j=this._createEngineMat(e,T,o,a,m),V=n[u++];x=V.corMatrices.globalTrafo,c=c||V.hasColors;var A=new Q(new Float32Array(V.interleavedVertexData),V.layout,V.positionData,g||Q.DefaultOffsets,V.indices||Q.DefaultIndices,!0);this._hasSymbolColors&&this._setComponentIndices(A,_);var R=null!=T.transformation?M.mat4f64.clone(T.transformation):M.mat4f64.create(),F=C.length,G=I+(F>0?"_"+F:""),B=new W(A,G);C.push(B),w.push(R),O.push(j),E.push(P.createOrigin(e.mbs,this.elevationOffset,this._controller.crsIndex,this.view.renderSpatialReference)),e.memory+=this.memEstimateGeometryAdded(B.data),h[de.MATERIAL][j.id]=j,h[de.GEOMETRY][B.id]=B}var N={i3sNode:e.id,layerUid:this._layerUid},U=new Y({idHint:e.id,name:I,geometries:C,materials:O,transformations:w,origins:E,castShadow:!0,metadata:N});U.setObjectTransformation(x),h[de.OBJECT][U.id]=U;var L=this._addTasks.get(e.id),k=new ge;k.node=e,k.engineObject=U,k.featureIds=y,k.componentColorBuffer=m,k.componentIndices=_,k.cachedRendererVersion=this._getInvalidRendererVersion(),k.cachedSymbolInfos=[],k.attributeInfo=L.attributeInfo,!this._hasTextures&&null!=e.textureData&&e.textureData.length>0&&(this._hasTextures=!0),this._hasColors||(this._hasColors=c),this._hasData=!0,this.notifyChange("hasTexturesOrVertexColors");var H=this.slicePlaneEnabled;return this._addOrUpdateEdgeRendering(k).then(function(){var t=r._stageLayer,i=r._stage,n=h[de.OBJECT];for(var a in n)n.hasOwnProperty(a)&&t.addObject(n[a]);for(var o in h)if(h.hasOwnProperty(o)){var s=h[o];for(var l in s)s.hasOwnProperty(l)&&null==i.get(o,l)&&i.add(o,s[l])}if(r._nodeId2Meta.set(e.id,k),r.suspended)return void r._removeNodeStageData(e.id);k.attributeInfo=L.attributeInfo,k.cachedRendererVersion===r._rendererVersion&&H===r.slicePlaneEnabled||r._addOrUpdateEdgeRendering(k),r._setObjectSymbology(k),r._applyFilters(e),r.visibleGeometryChanged(U),r._highlights.objectCreated(U);for(var d=0,u=k.engineObject.getGeometryRecords();d<u.length;d++){u[d].material.setParameterValues({slicePlaneEnabled:r.slicePlaneEnabled})}})},o.prototype._addData=function(e,t,i){var n=this,a=this._addTasks.get(e.id);return a?a.attributeInfo=t:(a=r({},b.createResolver(),{attributeInfo:t}),this._addTasks.set(e.id,a),i().then(a.resolve,a.reject).then(function(){return n._addTasks.delete(e.id)})),a.promise},o.prototype._clippingAreaChanged=function(){var e=w.create();q.extentToBoundingBox(this.view.clippingArea,e,this.view.renderSpatialReference)?this._clippingArea=e:this._clippingArea=null,this._filterChange(),this._controller&&this._controller.updateClippingArea(this.view.clippingArea)},o.prototype._filterChange=function(){var e=this;this._filters=this.getFilters(),this._nodeId2Meta.forEach(function(t){return e._applyFilters(t.node)})},o.prototype.getFilters=function(){var e=this,t=[];if(this.layer.objectIdFilter){var r=new Float64Array(this.layer.objectIdFilter.ids),i="include"===this.layer.objectIdFilter.method;r.sort(),t.push(function(t){return e._objectIdFilter(r,i,t)})}if(this._controller&&this._controller.parsedDefinitionExpression&&this._controller.definitionExpressionFields){this._definitionExpressionErrors=0;var n=this._controller.parsedDefinitionExpression,a=this._controller.definitionExpressionFields;t.push(function(t,r){return e._sqlFilter(t,r,n,a)})}return this._clippingArea&&t.push(function(t,r){return e._boundingboxFilter(t,r,e._clippingArea)}),t},o.prototype._sqlFilter=function(e,t,r,i){var n=this,a={},o=this._createLayerGraphic(a),s=this.layer.objectIdField,l=t.featureIds,d=t.attributeInfo.attributeData;i.every(function(e){return null!=d[e]||e===s})&&c.filterInPlace(e,l,function(e){a[s]=l[e];for(var t=0,h=i;t<h.length;t++){var u=h[t];u!==s&&(a[u]=F.getCachedAttributeValue(d[u],e))}return n._evaluateClause(r,o)})},o.filterInPlace=function(e,t,r){for(var i=0,n=0,a=0;a<t.length&&i<e.length;a++)e[i]===t[a]&&(r(a)&&(e[n]=e[i],n++),i++);e.length=n},o.prototype._evaluateClause=function(e,t){try{return e.testFeature(t)}catch(e){return this._definitionExpressionErrors<this._maxDefinitionExpressionErrors&&he.error("Error while evaluating definitionExpression: "+e),this._definitionExpressionErrors++,this._definitionExpressionErrors===this._maxDefinitionExpressionErrors&&he.error("Further errors are ignored"),!1}},o.prototype._objectIdFilter=function(e,t,r){for(var i=0,n=0;i<r.length;){l.binaryIndexOf(e,r[i])>=0===t&&(r[n]=r[i],n++),i++}r.length=n},o.prototype._boundingboxFilter=function(e,t,r){var i=[0,0,0,0];q.mbsToMbs(t.node.mbs,this._controller.crsIndex,i,this.view.renderSpatialReference);var n=null!=r?F.intersectBoundingBoxWithMbs(r,i):2;if(2!==n){if(0===n)return void(e.length=0);var a=t.engineObject.getObjectTransformation(),o=t.engineObject.getGeometryRecords()[0].getShaderTransformation();if(M.mat4.multiply(a,a,o),0===a[1]&&0===a[2]&&0===a[3]&&0===a[4]&&0===a[6]&&0===a[7]&&0===a[8]&&0===a[9]&&0===a[11]&&1===a[15]){var s=be;s[0]=(r[0]-a[12])/a[0],s[1]=(r[1]-a[13])/a[5],s[2]=(r[2]-a[14])/a[10],s[3]=(r[3]-a[12])/a[0],s[4]=(r[4]-a[13])/a[5],s[5]=(r[5]-a[14])/a[10];var l=t.engineObject.getGeometryRecords()[0].geometry;l.componentCount===t.featureIds.length&&c.filterInPlace(e,t.featureIds,function(e){return w.intersects(s,l.getComponentAABB(e,ve))})}}},o.prototype._addOrUpdateEdgeRendering=function(e,t){if(void 0===t&&(t=!0),!this._edgeView)return b.resolve();var r=e.engineObject,i=this._edgeView.hasObject(r),n=this._extractObjectEdgeMaterials(e),a=n.hasEdges,o=n.perFeatureEdgeMaterials,s={slicePlaneEnabled:this.slicePlaneEnabled};if(a){var l=!r.isHidden(r.geometryRecords[0]);if(i)this._edgeView.updateAllComponentMaterials(r,o,s,t),this._edgeView.updateObjectVisibility(r,l);else if(l)return d.safeCast(this._edgeView.addObject(r,o,s))}else i&&this._edgeView.removeObject(r);return b.resolve()},o.prototype._applyFilters=function(e){var t=this._nodeId2Meta.get(e.id);t&&(this._applyFiltersToObjects(e,t),this._updateEdgeRendering(t))},o.prototype._applyFiltersToObjects=function(e,t){var r=t.engineObject;if(r.unhideAllComponents(),0!==this._filters.length){for(var i=t.featureIds,n=i.slice(),a=0,o=this._filters;a<o.length;a++){(0,o[a])(n,t)}if(n.length!==i.length)for(var s=0,l=r.getGeometryRecords()[0],d=0;d<i.length;d++){var h=i[d];s>=n.length||n[s]!==h?r.setComponentVisibility(l,d,!1):s++}}},o.prototype._removeAllNodeDataFromStage=function(e){var t=this;void 0===e&&(e=this.elevationOffset),this._nodeId2Meta.forEach(function(r,i){return t._removeNodeStageData(i,e)})},o.prototype.removeNodeData=function(e){var t=this;e.forEach(function(e){return t._removeNodeStageData(e.id)})},o.prototype._removeNodeStageData=function(e,t){void 0===t&&(t=this.elevationOffset);var r=this._nodeId2Meta.get(e);if(r){var i=r.engineObject;i.setHidden(i.geometryRecords[0],!0),this.visibleGeometryChanged(i),this._addOrUpdateEdgeRendering(r),this._nodeId2Meta.delete(e),this._highlights.objectDeleted(i),this._memCache.put(this._getMemCacheKey(e,t),r,r.node.memory)}},o.prototype._deleteNodeStageData=function(e){var t=this._stage,r=this._stageLayer,i=e.engineObject;this._edgeView&&this._edgeView.removeObject(i),r.removeObject(i);for(var n=0,a=i.getGeometryRecords();n<a.length;n++){var o=a[n];this.memEstimateGeometryRemoved(o.geometry.data),t.remove(de.GEOMETRY,o.geometry.id),this._removeMaterial(o.material,t)}if(e.componentIndices){for(var s=0;s<e.componentIndices.length;s++)e.componentColorBuffer.releaseIndex(e.componentIndices[s]);this._componentColorManager.garbageCollect()}t.remove(de.OBJECT,i.id)},o.prototype._removeMaterial=function(e,t){t.remove(de.MATERIAL,e.id);var r=e.metadata.i3sTexId;if(r){var i=this._texId2Meta.get(r);if(i){var n=i.usedByEngineMats;if(l.removeUnordered(n,e)||he.error("Missing reference from material to texture"),0===n.length){var a=i.engineTex;a&&a!==this._whiteTexture&&(this.memEstimateTextureRemoved(a),t.remove(de.TEXTURE,i.engineTex.id)),this._texId2Meta.delete(r)}}}},o.prototype.setPolygonOffset=function(e,t){var r=this._nodeId2Meta.get(e.id);if(r)for(var i=0,n=r.engineObject.getGeometryRecords();i<n.length;i++){var a=n[i];a.material.setParameterValues({polygonOffset:t})}},o.prototype._getInvalidRendererVersion=function(){return le(this._rendererVersion,-1)},o.prototype._rendererChange=function(e){if(this._currentRenderer=e,this._rendererVersion=le(this._rendererVersion,1),this._rendererFields=null,this._colorVariable=null,this._opacityVariable=null,e&&e.requiredFields&&(this._rendererFields=F.findFieldsCaseInsensitive(e.requiredFields,this.layer.fields)),e&&"visualVariables"in e&&e.visualVariables)for(var t=0,r=e.visualVariables;t<r.length;t++){var i=r[t];"color"===i.type?this._colorVariable=i:"opacity"===i.type?this._opacityVariable=i:he.warn("Unsupported visual variable type for 3D Object Scene Services: "+i.type)}if(e)for(var n=0,a=e.getSymbols();n<a.length;n++){var o=a[n];"mesh-3d"!==o.type&&he.error("Symbols of type '"+o.type+"' are not supported for 3D Object Scene Services.")}this.view.resourceController.setMemoryDirty()},o.prototype._getSymbolInfos=function(e){return this._hasSymbolColors&&e.cachedRendererVersion!==this._rendererVersion&&this._updateCachedRendererData(e),e.cachedSymbolInfos},o.prototype._getSymbolColors=function(e){return this._hasSymbolColors&&e.cachedRendererVersion!==this._rendererVersion&&this._updateCachedRendererData(e),e.cachedSymbolColors},o.prototype._updateCachedRendererData=function(e){if(e.cachedRendererVersion=this._rendererVersion,this._hasSymbolColors){var t=e.featureIds?e.featureIds.length:1,r={},i=this._tmpAttributeOnlyGraphic;i.attributes=r;for(var n=this._currentRenderer,a=e.attributeInfo.attributeData,o=null!=e.featureIds?this.layer.objectIdField:null,s=null!=a?this._rendererFields:null,l=0;l<t;l++){if(null!=o&&(r[o]=e.featureIds[l]),null!=s)for(var d=0,h=s;d<h.length;d++){var u=h[d];a[u]&&(r[u]=F.getCachedAttributeValue(a[u],l))}var c=n&&n.getSymbol(i),p=null;c instanceof D&&(this._symbolInfos.has(c.id)||this._symbolInfos.set(c.id,F.getSymbolInfo(c)),p=this._symbolInfos.get(c.id)),e.cachedSymbolInfos[l]=p,null==e.cachedSymbolColors&&(e.cachedSymbolColors=new Uint8Array(4*e.featureIds.length));var g=null,f=null;if(n&&"visualVariables"in n){if(this._colorVariable){var y=n.getColor(i,{colorInfo:this._colorVariable,color:Ie});y&&(g=xe,g[0]=y.r/255,g[1]=y.g/255,g[2]=y.b/255,this._opacityVariable||null===y.a||(f=y.a))}this._opacityVariable&&(f=n.getOpacity(i,{opacityInfo:this._opacityVariable}))}if(p&&p.material){var m=p.material;g=null==g||null==f?V.overrideColor(g,f,m.color,m.alpha,ue,xe):V.overrideColor(g,f,null,null,ue,xe),L.encodeSymbolColor(g,m.colorMixMode,e.cachedSymbolColors,4*l)}else L.encodeSymbolColor(null,null,e.cachedSymbolColors,4*l)}}},
o.prototype._extractObjectEdgeMaterials=function(e){for(var t=[],r=e.engineObject,i=e.featureIds?e.featureIds.length:1,n={opacity:this.fullOpacity},a=this._edgeView.createSolidEdgeMaterial({color:[0,0,0,0],opacity:0}),o=!1,s=null,l=null,d=this._getSymbolInfos(e),h=0;h<i;h++){var c=d[h];r.getComponentVisibility(r.getGeometryRecords()[0],h)&&c?(l!==c&&(l=c,(s=N.createMaterialFromEdges(this._edgeView,c.edges,n))&&(o=!0)),t.push(u.isSome(s)?s:a)):t.push(a)}return{hasEdges:o,perFeatureEdgeMaterials:t}},o.prototype._setObjectSymbology=function(e){if(this._hasSymbolColors){for(var t=e.featureIds?e.featureIds.length:1,r=!1,i=this._getSymbolColors(e),n=e.componentColorBuffer.textureBuffer,a=0;a<t;a++){var o=4*a,s=e.componentIndices[a];n.setData(s,0,i[o],i[o+1],i[o+2],i[o+3]),L.isOpaqueSymbolColor(i,o)||(r=!0)}this._updateObjectOpacity(e.engineObject,r)}},o.prototype._setComponentIndices=function(e,t){for(var r=e.getAttribute($.VertexAttrConstants.COMPONENTINDEX),i=r.data,n=r.offsetIdx,a=r.strideIdx,o=e.getIndices($.VertexAttrConstants.COMPONENTINDEX),s=0;s<t.length;s++)for(var l=e.componentOffsets[s],d=e.componentOffsets[s+1],h=l;h<d;h++){var u=n+o[h]*a;i[u]=t[s]}},o.prototype._reloadAll=function(e){void 0===e&&(e=this.elevationOffset),this._removeAllNodeDataFromStage(e),null!=this._controller&&this._controller.restartNodeLoading()},o.prototype._opacityChange=function(e){var t=this;this._nodeId2Meta.forEach(function(e){t._updateObjectOpacity(e.engineObject),t._updateEdgeRendering(e)})},o.prototype._updateObjectOpacity=function(e,t){for(var r=0,i=e.getGeometryRecords();r<i.length;r++){var n=i[r],a=n.material,o=a.metadata;void 0!==t&&(o.symbolIsTransparent=t);var s=a.getParams(),l=this._calcEngineMaterialTransparencyParams(o.i3sTex,o.i3sMatParams,o.symbolIsTransparent);s.transparent===l.transparent&&s.layerOpacity===l.layerOpacity||a.setParameterValues(l)}},o.prototype._updateEngineObject=function(e,t){this._setObjectSymbology(t),this._addOrUpdateEdgeRendering(t),this._applyFilters(e),this.visibleGeometryChanged(t.engineObject)},o.prototype._slicePlaneEnabledChange=function(e){var t=this,r={slicePlaneEnabled:e};this._stageLayer.isSliceable=e,this._nodeId2Meta.forEach(function(e){for(var i=0,n=e.engineObject.getGeometryRecords();i<n.length;i++){n[i].material.setParameterValues(r)}t._updateEdgeRendering(e,!1)})},o.prototype._updateEdgeRendering=function(e,t){void 0===t&&(t=!0),this._edgeView&&this._edgeView.hasObject(e.engineObject)&&this._addOrUpdateEdgeRendering(e,t)},o.prototype._forAllFeatures=function(e,t,r){var i=this;this._nodeId2Meta.forEach(function(n,a){i._forAllFeaturesOfNode(n,e,r),t&&t(n.node)})},o.prototype._forAllFeaturesOfNode=function(e,t,r){for(var i=e.featureIds,n=e.engineObject.getGeometryRecords()[0],a=0;a<i.length;a++)if(r||e.engineObject.getComponentVisibility(n,a)){var o=i[a];t(o,a,e,n)}},o.prototype._createGraphic=function(e,t){var r={};null!=t.featureIds&&(r[this._getObjectIdField()]=t.featureIds[e]);var i=t.attributeInfo.attributeData;if(null!=i)for(var n=0,a=Object.keys(i);n<a.length;n++){var o=a[n];r[o]=F.getCachedAttributeValue(i[o],e)}return this._createLayerGraphic(r)},o.prototype._boundingBoxCornerPoints=function(e,t,r){for(var i=t.geometries[0].getComponentAABB(e,be),n=0;n<8;++n)_e[0]=1&n?i[0]:i[3],_e[1]=2&n?i[1]:i[4],_e[2]=4&n?i[2]:i[5],M.vec3.transformMat4(_e,_e,t.objectTransformation),r[3*n]=_e[0],r[3*n+1]=_e[1],r[3*n+2]=_e[2];return r},o.prototype.highlight=function(e,t){var r=this;void 0===t&&(t={});var i=this._highlights;if("number"==typeof e?e=[e]:e instanceof s?e=[e]:e instanceof h&&(e=e.toArray()),Array.isArray(e)&&e.length>0){if(e[0]instanceof s){var n=e,a=n.map(function(e){return B.attributeLookup(e.attributes,r._getObjectIdField())}),o=i.acquireSet(t),l=o.set,d=o.handle;return i.setFeatureIds(l,a),d}if("number"==typeof e[0]){var a=e,u=i.acquireSet(t),l=u.set,d=u.handle;return i.setFeatureIds(l,a),d}}return{remove:function(){}}},o.prototype.visibleGeometryChanged=function(e){var t=this;e?this._elevationProvider.objectChanged(e):this._elevationProvider.layerChanged(),null==this._visibleGeometryChangedSchedulerHandle&&(this._visibleGeometryChangedSchedulerHandle=x.schedule(function(){t.emit("visible-geometry-changed"),t._visibleGeometryChangedSchedulerHandle=null}))};var c;return n([E.property()],o.prototype,"view",void 0),n([E.property()],o.prototype,"layer",void 0),n([E.property()],o.prototype,"_controller",void 0),n([E.property({dependsOn:["_controller.updating"]})],o.prototype,"updating",void 0),n([E.property({dependsOn:["_controller.rootNodeVisible"]})],o.prototype,"suspended",void 0),n([E.property(U.updatingPercentage)],o.prototype,"updatingPercentage",void 0),n([E.property({readOnly:!0,aliasOf:"_controller.updatingPercentage"})],o.prototype,"updatingPercentageValue",void 0),n([E.property({readOnly:!0})],o.prototype,"hasTexturesOrVertexColors",null),n([E.property({readOnly:!0,dependsOn:["layer.renderer"]})],o.prototype,"rendererNeedsTextures",null),n([E.property({readOnly:!0,dependsOn:["layer.elevationInfo"]})],o.prototype,"elevationOffset",null),n([E.property({type:Boolean})],o.prototype,"slicePlaneEnabled",void 0),n([E.property()],o.prototype,"alwaysLoadEverythingModeEnabled",void 0),n([E.property({dependsOn:["view.qualitySettings.sceneService.uncompressedTextureDownsamplingEnabled","useCompressedTextures"]})],o.prototype,"uncompressedTextureDownsamplingEnabled",null),n([E.property({dependsOn:["layer.version"]})],o.prototype,"useCompressedTextures",null),o=c=n([E.subclass("esri.views.3d.layers.I3SMeshView3D")],o)}(E.declared(p,c,_)),_e=M.vec3f64.create(),be=w.create(),ve=w.create(),xe=[0,0,0,0],Ie=new o([0,0,0,0]);return me});