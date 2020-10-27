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

define(["require","exports","tslib","../core/shaderLibrary/ForwardLinearDepth.glsl","../core/shaderLibrary/Offset.glsl","../core/shaderLibrary/Slice.glsl","../core/shaderLibrary/Transform.glsl","../core/shaderLibrary/attributes/InstancedDoublePrecision.glsl","../core/shaderLibrary/attributes/NormalAttribute.glsl","../core/shaderLibrary/attributes/PositionAttribute.glsl","../core/shaderLibrary/attributes/SymbolColor.glsl","../core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl","../core/shaderLibrary/attributes/VertexColor.glsl","../core/shaderLibrary/attributes/VertexNormal.glsl","../core/shaderLibrary/attributes/VerticalOffset.glsl","../core/shaderLibrary/default/DefaultMaterialAuxiliaryPasses.glsl","../core/shaderLibrary/shading/ComputeNormalTexture.glsl","../core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl","../core/shaderLibrary/shading/EvaluateSceneLighting.glsl","../core/shaderLibrary/shading/Normals.glsl","../core/shaderLibrary/shading/PhysicallyBasedRendering.glsl","../core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../core/shaderLibrary/shading/ReadShadowMap.glsl","../core/shaderLibrary/shading/VisualVariables.glsl","../core/shaderLibrary/util/AlphaDiscard.glsl","../core/shaderLibrary/util/HeaderComment.glsl","../core/shaderLibrary/util/MixExternalColor.glsl","../core/shaderModules/interfaces","../core/shaderModules/ShaderBuilder"],(function(e,a,o,r,l,i,t,n,s,d,c,m,v,g,u,p,b,h,x,y,f,C,_,O,M,L,P,T,w){"use strict";var S,A,E,N,D,j,k,V,B,I,F,G,R,z;Object.defineProperty(a,"__esModule",{value:!0}),a.build=void 0,a.build=function(e){var a=new w.ShaderBuilder,W=a.vertex.code,H=a.fragment.code;return a.include(L.HeaderComment,{name:"Default Material Shader",output:e.output}),a.vertex.uniforms.add("proj","mat4").add("view","mat4").add("camPos","vec3").add("localOrigin","vec3"),a.include(d.PositionAttribute),a.varyings.add("vpos","vec3"),a.include(O.VisualVariables,e),a.include(n.InstancedDoublePrecision,e),a.include(u.VerticalOffset,e),0===e.output&&(a.include(s.NormalAttribute,e),a.include(t.Transform,{linearDepth:!1}),0===e.normalType&&e.offsetBackfaces&&a.include(l.Offset),a.include(b.ComputeNormalTexture,e),a.include(g.VertexNormal,e),e.instancedColor&&a.attributes.add("instanceColor","vec4"),a.varyings.add("localvpos","vec3"),a.include(m.TextureCoordinateAttribute,e),a.include(r.ForwardLinearDepth,e),a.include(c.SymbolColor,e),a.include(v.VertexColor,e),a.vertex.uniforms.add("externalColor","vec4"),a.varyings.add("vcolorExt","vec4"),W.add(T.glsl(A||(A=o.__makeTemplateObject(["\n      void main(void) {\n        forwardNormalizedVertexColor();\n        vcolorExt = externalColor;\n        ","\n        vcolorExt *= vvColor();\n        vcolorExt *= getSymbolColor();\n        forwardColorMixMode();\n\n        if (vcolorExt.a < ",") {\n          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);\n        }\n        else {\n          vpos = calculateVPos();\n          localvpos = vpos - view[3].xyz;\n          vpos = subtractOrigin(vpos);\n          ","\n          vpos = addVerticalOffset(vpos, localOrigin);\n          ","\n          gl_Position = transformPosition(proj, view, vpos);\n          ","\n        }\n        forwardLinearDepth();\n        forwardTextureCoordinates();\n      }\n    "],["\n      void main(void) {\n        forwardNormalizedVertexColor();\n        vcolorExt = externalColor;\n        ","\n        vcolorExt *= vvColor();\n        vcolorExt *= getSymbolColor();\n        forwardColorMixMode();\n\n        if (vcolorExt.a < ",") {\n          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);\n        }\n        else {\n          vpos = calculateVPos();\n          localvpos = vpos - view[3].xyz;\n          vpos = subtractOrigin(vpos);\n          ","\n          vpos = addVerticalOffset(vpos, localOrigin);\n          ","\n          gl_Position = transformPosition(proj, view, vpos);\n          ","\n        }\n        forwardLinearDepth();\n        forwardTextureCoordinates();\n      }\n    "])),e.instancedColor?"vcolorExt *= instanceColor;":"",T.glsl.float(M.symbolAlphaCutoff),0===e.normalType?T.glsl(S||(S=o.__makeTemplateObject(["\n          vNormalWorld = dpNormal(vvLocalNormal(normalModel()));"],["\n          vNormalWorld = dpNormal(vvLocalNormal(normalModel()));"]))):"",e.vertexTangets?"vTangent = dpTransformVertexTangent(tangent);":"",0===e.normalType&&e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, camPos);":"")),a.include(i.Slice,e),a.include(x.EvaluateSceneLighting,e),a.include(h.EvaluateAmbientOcclusion,e),a.include(M.DiscardOrAdjustAlpha,e),e.receiveShadows&&a.include(_.ReadShadowMap,e),a.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("ambient","vec3").add("diffuse","vec3").add("opacity","float").add("layerOpacity","float"),e.hasColorTexture&&a.fragment.uniforms.add("tex","sampler2D"),a.include(C.PhysicallyBasedRenderingParameters,e),a.include(f.PhysicallyBasedRendering,e),a.fragment.include(P.MixExternalColor),a.include(y.Normals,e),H.add(T.glsl(z||(z=o.__makeTemplateObject(["\n      void main() {\n        discardBySlice(vpos);\n        ","\n        shadingParams.viewDirection = normalize(vpos - camPos);\n        ","\n        ","\n        float ssao = evaluateAmbientOcclusionInverse();\n        ssao *= getBakedOcclusion();\n\n        float additionalAmbientScale = _oldHeuristicLighting(vpos + localOrigin);\n        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;\n        ","\n        vec3 matColor = max(ambient, diffuse);\n        ","\n        ","\n        ","\n        ","\n        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);\n      }\n    "],["\n      void main() {\n        discardBySlice(vpos);\n        ","\n        shadingParams.viewDirection = normalize(vpos - camPos);\n        ","\n        ","\n        float ssao = evaluateAmbientOcclusionInverse();\n        ssao *= getBakedOcclusion();\n\n        float additionalAmbientScale = _oldHeuristicLighting(vpos + localOrigin);\n        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;\n        ","\n        vec3 matColor = max(ambient, diffuse);\n        ","\n        ","\n        ","\n        ","\n        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);\n      }\n    "])),e.hasColorTexture?T.glsl(E||(E=o.__makeTemplateObject(["\n        vec4 texColor = texture2D(tex, vuv0);\n        ","\n        discardOrAdjustAlpha(texColor);"],["\n        vec4 texColor = texture2D(tex, vuv0);\n        ","\n        discardOrAdjustAlpha(texColor);"])),e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""):T.glsl(N||(N=o.__makeTemplateObject(["vec4 texColor = vec4(1.0);"],["vec4 texColor = vec4(1.0);"]))),3===e.normalType?T.glsl(D||(D=o.__makeTemplateObject(["\n        vec3 normal = screenDerivativeNormal(localvpos);"],["\n        vec3 normal = screenDerivativeNormal(localvpos);"]))):T.glsl(j||(j=o.__makeTemplateObject(["\n        shadingParams.normalView = vNormalWorld;\n        vec3 normal = shadingNormal(shadingParams);"],["\n        shadingParams.normalView = vNormalWorld;\n        vec3 normal = shadingNormal(shadingParams);"]))),1===e.pbrMode?"applyPBRFactors();":"",e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":1===e.viewingMode?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;",e.attributeColor?T.glsl(k||(k=o.__makeTemplateObject(["\n        vec3 albedo_ = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));\n        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));"],["\n        vec3 albedo_ = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));\n        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));"]))):T.glsl(V||(V=o.__makeTemplateObject(["\n        vec3 albedo_ = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));\n        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));\n        "],["\n        vec3 albedo_ = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));\n        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));\n        "]))),e.hasNormalTexture?T.glsl(B||(B=o.__makeTemplateObject(["\n              mat3 tangentSpace = ","\n              vec3 shadedNormal = computeTextureNormal(tangentSpace, vuv0);"],["\n              mat3 tangentSpace = ","\n              vec3 shadedNormal = computeTextureNormal(tangentSpace, vuv0);"])),e.vertexTangets?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"):"vec3 shadedNormal = normal;",1===e.pbrMode||2===e.pbrMode?1===e.viewingMode?T.glsl(I||(I=o.__makeTemplateObject(["vec3 normalGround = normalize(vpos + localOrigin);"],["vec3 normalGround = normalize(vpos + localOrigin);"]))):T.glsl(F||(F=o.__makeTemplateObject(["vec3 normalGround = vec3(0.0, 0.0, 1.0);"],["vec3 normalGround = vec3(0.0, 0.0, 1.0);"]))):T.glsl(G||(G=o.__makeTemplateObject([""],[""]))),1===e.pbrMode||2===e.pbrMode?T.glsl(R||(R=o.__makeTemplateObject(["\n            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];\n            vec3 shadedColor = evaluateSceneLightingPBR(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);"],["\n            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];\n            vec3 shadedColor = evaluateSceneLightingPBR(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);"]))):"vec3 shadedColor = evaluateSceneLighting(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight);"))),a.include(p.DefaultMaterialAuxiliaryPasses,e),a}}));