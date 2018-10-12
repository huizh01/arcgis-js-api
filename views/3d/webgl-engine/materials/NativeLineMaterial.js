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
// See http://js.arcgis.com/4.9/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/Logger","../../lib/gl-matrix","../../support/geometryUtils","../../support/buffer/InterleavedLayout","../lib/ComponentUtils","../lib/GLMaterial","../lib/Material","../lib/RenderSlot","../lib/Util","./internal/bufferWriters","./internal/MaterialUtil","../shaders/NativeLinePrograms"],function(e,t,r,a,n,i,o,s,c,l,p,d,u,f,m){var v,g=a.getLogger("esri.views.3d.webgl-engine.materials.NativeLineMaterial"),h=function(e){function t(t,r){var a=e.call(this,r)||this;return a.bufferWriter=new w,a.canBeMerged=!0,a.params=f.copyParameters(t,b),a}return r(t,e),t.prototype.setColor=function(e){this.params.color=e,this.notifyDirty("matChanged")},t.prototype.getColor=function(){return this.params.color},t.prototype.getParameterValues=function(){return f.copyParameters(this.params)},t.prototype.intersect=function(e,t,r,a,o,c,l,p){if(a.isSelection&&!s.isAllHidden(t.componentVisibilities,e.data.componentOffsets)){if(!d.isTranslationMatrix(r))return void g.error("intersection assumes a translation-only matrix");var u=e.data.getVertexAttr().position.data,f=a.camera,m=a.point;n.vec3d.set3(m[0]-2,m[1]+2,0,T[0]),n.vec3d.set3(m[0]+2,m[1]+2,0,T[1]),n.vec3d.set3(m[0]+2,m[1]-2,0,T[2]),n.vec3d.set3(m[0]-2,m[1]-2,0,T[3]);for(var v=0;v<4;v++)f.unprojectPoint(T[v],C[v]);i.plane.fromPoints(f.eye,C[0],C[1],D),i.plane.fromPoints(f.eye,C[1],C[2],B),i.plane.fromPoints(f.eye,C[2],C[3],N),i.plane.fromPoints(f.eye,C[3],C[0],j);for(var h=Number.MAX_VALUE,v=0;v<u.length-5;v+=3)if(x[0]=u[v]+r[12],x[1]=u[v+1]+r[13],x[2]=u[v+2]+r[14],L[0]=u[v+3]+r[12],L[1]=u[v+4]+r[13],L[2]=u[v+5]+r[14],!(i.plane.distance(D,x)<0&&i.plane.distance(D,L)<0||i.plane.distance(B,x)<0&&i.plane.distance(B,L)<0||i.plane.distance(N,x)<0&&i.plane.distance(N,L)<0||i.plane.distance(j,x)<0&&i.plane.distance(j,L)<0)){if(f.projectPoint(x,V),f.projectPoint(L,E),V[2]<0&&E[2]>0){n.vec3d.subtract(x,L,M);var P=f.frustumPlanes,y=-i.plane.distance(P[4],x),b=y/n.vec3d.dot(M,P[4]);n.vec3d.scale(M,b,M),n.vec3d.add(x,M,x),f.projectPoint(x,V)}else if(V[2]>0&&E[2]<0){n.vec3d.subtract(L,x,M);var P=f.frustumPlanes,y=-i.plane.distance(P[4],L),b=y/n.vec3d.dot(M,P[4]);n.vec3d.scale(M,b,M),n.vec3d.add(L,M,L),f.projectPoint(L,E)}else if(V[2]<0&&E[2]<0)continue;var A=d.pointLineSegmentDistanceSquared2D(V,E,m);A<h&&(h=A,n.vec3d.set(x,I),n.vec3d.set(L,O))}var w=a.p0,R=a.p1;if(h<4){var _=d.lineLineDistanceSquared3D(I,O,w,R,U),q=Number.MAX_VALUE;if(_.success){n.vec3d.subtract(_.pa,w,S);var F=n.vec3d.length(S);n.vec3d.scale(S,1/F),q=F/n.vec3d.dist(w,R)}l(q,S)}}},t.prototype.getGLMaterials=function(){return{color:P,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:y}},t.prototype.getAllTextureIds=function(){return[]},t}(l),P=function(e){function t(t,r,a){var n=e.call(this,t,r)||this;return n.updateParameters(),n}return r(t,e),t.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram()},t.prototype.selectProgram=function(){this.program=this.programRep.getProgram(m.colorPass,{slice:this.params.slicePlaneEnabled})},t.prototype.beginSlot=function(e){return e===p.OPAQUE_MATERIAL},t.prototype.getProgram=function(){return this.program},t.prototype.bind=function(e,t){var r=this.program,a=this.params;e.bindProgram(r),r.setUniform4fv("color",a.color),e.setBlendingEnabled(a.color[3]<1),e.setBlendFunctionSeparate(770,771,1,771),e.setDepthTestEnabled(!0)},t.prototype.release=function(e){this.params.color[3]<1&&e.setBlendingEnabled(!1)},t.prototype.bindView=function(e,t){var r=this.program,a=this.params;f.bindView(t.origin,t.view,r),a.slicePlaneEnabled&&f.bindSlicePlane(t.origin,t.slicePlane,r)},t.prototype.bindInstance=function(e,t){this.program.setUniformMatrix4fv("model",t.transformation)},t.prototype.getDrawMode=function(e){return 1},t}(c),y=function(e){function t(t,r,a){var n=e.call(this,t,r)||this;return n.updateParameters(),n}return r(t,e),t.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram()},t.prototype.beginSlot=function(e){return e===p.OPAQUE_MATERIAL},t.prototype.getProgram=function(){return this.program},t.prototype.selectProgram=function(){this.program=this.programRep.getProgram(m.highlightPass,{slice:this.params.slicePlaneEnabled})},t.prototype.bind=function(e,t){e.bindProgram(this.program),e.setDepthTestEnabled(!0)},t.prototype.release=function(e){},t.prototype.bindView=function(e,t){var r=this.program,a=this.params;f.bindView(t.origin,t.view,r),a.slicePlaneEnabled&&f.bindSlicePlane(t.origin,t.slicePlane,r)},t.prototype.bindInstance=function(e,t){this.program.setUniformMatrix4fv("model",t.transformation)},t.prototype.getDrawMode=function(e){return 1},t}(c),b={color:[1,1,1,1],slicePlaneEnabled:!1},A=o.newLayout().vec3f(d.VertexAttrConstants.POSITION),w=function(){function e(){this.vertexBufferLayout=A}return e.prototype.allocate=function(e){return this.vertexBufferLayout.createBuffer(e)},e.prototype.elementCount=function(e){return e.indices[d.VertexAttrConstants.POSITION].length},e.prototype.write=function(e,t,r,a,n){var i=t.vertexAttr[d.VertexAttrConstants.POSITION].data,o=i,s=e.transformation;if(s){(!v||v.length<i.length)&&(v=new Float32Array(i.length)),o=v;for(var c=0;c<i.length;c+=3){var l=i[c],p=i[c+1],f=i[c+2];o[c]=s[0]*l+s[4]*p+s[8]*f+s[12],o[c+1]=s[1]*l+s[5]*p+s[9]*f+s[13],o[c+2]=s[2]*l+s[6]*p+s[10]*f+s[14]}}var m=t.indices[d.VertexAttrConstants.POSITION];u.writeBufferVec3(m,o,a.position,n)},e}(),x=n.vec3d.create(),L=n.vec3d.create(),M=n.vec3d.create(),S=n.vec3d.create(),V=n.vec3d.create(),E=n.vec3d.create(),I=n.vec3d.create(),O=n.vec3d.create(),U={success:!1,dist2:0,pa:n.vec3d.create(),pb:n.vec3d.create()},T=[n.vec3d.create(),n.vec3d.create(),n.vec3d.create(),n.vec3d.create()],C=[n.vec3d.create(),n.vec3d.create(),n.vec3d.create(),n.vec3d.create()],D=i.plane.create(),B=i.plane.create(),N=i.plane.create(),j=i.plane.create();return h});