// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.

define({general:{cancel:"Anulare",close:"Închidere",none:"Niciunul",ok:"OK",other:"Altul",stamp:"Marcaj",now:"Acum",choose:"Alegeţi una:"},editor:{noMetadata:"Nu există metadate pentru acest element.",xmlViewOnly:"Tipul de metadate asociate cu acest element nu este acceptat de editor. Metadatele trebuie să fie în format ArcGIS.",editorDialog:{caption:"Metadate",captionPattern:"Metadate pentru {title}"},primaryToolbar:{view:"Vizualizare",viewXml:"Vizualizare XML",edit:"Editare",initializing:"Se încarcă...",startingEditor:"Se porneşte editorul...",loadingDocument:"Se încarcă documentul...",updatingDocument:"Se actualizează documentul...",generatingView:"Generare vizualizare...",errors:{errorGeneratingView:"A survenit o eroare în timpul generării vizualizării.",errorLoadingDocument:"A survenit o eroare în timpul încărcării documentului."}},changesNotSaved:{prompt:"Documentul dvs. are modificări care nu au fost salvate.",dialogTitle:"Închidere editor metadate",closeButton:"Închidere"},download:{caption:"Descărcare",dialogTitle:"Descărcare",prompt:"Faceţi clic aici pentru a descărca fişierul."},load:{caption:"Deschis",dialogTitle:"Deschis",typeTab:"Document nou",fileTab:"Fişier deschis",templateTab:"Un şablon",itemTab:"Elementul dvs.",filePrompt:"Selectaţi un fişier XML local cu metadate ArcGIS. Metadatele trebuie să fie în format ArcGIS.",templatePrompt:"Creare metadate",pullItem:"Populaţi metadatele cu detalii despre elemente.",importWarning:"Fişierul selectat nu apare în format ArcGIS. Metadatele încărcate trebuie să fie în format ArcGIS.",loading:"Se încarcă...",noMetadata:"Metadatele pot fi create pentru acest element alegând una dintre următoarele opţiuni.",unrecognizedMetadata:"Tipul de metadate asociate cu acest element nu este acceptat de editor. Metadatele acceptate pot fi create pentru alegând una dintre următoarele opţiuni.",errorLoading:"A survenit o eroare în timpul încărcării.",warnings:{badFile:"Fişierul selectat nu a putut fi încărcat.",notAnXml:"Fişierul selectat nu este un fişier XML.",notSupported:"Acest tip de fişier nu este acceptat."},portalCaption:"Suprascriere"},save:{caption:"Salvare",dialogTitle:"Salvare metadate",working:"Se salvează metadatele...",errorSaving:"A survenit o eroare, metadatele nu au fost salvate.",saveDialog:{pushCaption:"Aplicaţi modificările la elementul dvs."}},saveAndClose:{caption:"Salvare şi închidere"},saveDraft:{caption:"Descărcare",dialogTitle:"Descărcare"},validate:{caption:"Validare",dialogTitle:"Validare",docIsValid:"Documentul dvs. este valid."},viewHtml:{caption:"Vizualizare",dialogTitle:"Vizualizare metadate",savePrompt:"Documentul dvs. are modificări nesalvate. Trebuie să salvați orice modificări, pentru a le observa atunci când vizualizați metadatele.",saveButton:"Salvare și vizualizare",portalNone:"Metadatele bazate pe standarde nu au fost create. Mai întâi trebuie să salvați, pentru a putea vizualiza metadatele."},del:{caption:"Ștergere",dialogTitle:"Ștergere metadate",prompt:"Sigur doriţi să ştergeţi aceste metadate?",working:"Se şterg metadatele...",errorDeleting:"A survenit o eroare, metadatele nu au fost şterse.",portalNone:"Nu este disponibil niciun document cu metadate pentru ștergere. Metadatele bazate pe standarde nu au fost create.",portalPrompt:"Această opțiune va șterge documentul cu metadate și va reseta metadatele acestui element la informațiile elementului, precum Titlu, Descriere etc.",portalPrompt2:"Această opțiune va șterge metadatele bazate pe standarde. Sigur doriți să ștergeți aceste metadate?",portalButton:"Ștergere și Închidere"},transform:{caption:"Transformare",dialogTitle:"Transformare în",prompt:"",working:"Se transformă...",errorTransforming:"A survenit o eroare în timpul transformării documentului."},errorDialog:{dialogTitle:"A survenit o eroare"}},arcgis:{portal:{metadataButton:{caption:"Metadate"}}},calendar:{button:"Calendar...",title:"Calendar"},geoExtent:{button:"Setare extindere geografică...",title:"Setare extindere geografică",navigate:"Navigaţi",draw:"Trasaţi un dreptunghi",drawHint:"Apăsaţi în jos pentru a începe şi eliberaţi pentru finalizare."},hints:{date:"(yyyy sau yyyy-mm sau yyyy-mm-dd)",dateTime:"(yyyy-mm-ddThh:mm:ss.sss[+-]hh:mm)",dateOrDateTime:"(yyyy sau yyyy-mm sau yyyy-mm-dd sau yyyy-mm-ddThh:mm:ss.sss[+-]hh:mm)",delimitedTextArea:"(utilizaţi virgulă sau liniuţă pentru a separa)",fgdcDate:"(yyyy sau yyyy-mm sau yyyy-mm-dd)",fgdcTime:"(hh:mm:ss.sss[+-]hh:mm)",integer:"(introduceţi un număr întreg)",latitude:"(grade zecimale)",longitude:"(grade zecimale)",number:"(introduceţi un număr)",numberGreaterThanZero:"(introduceţi un număr > 0)"},isoTopicCategoryCode:{caption:"Categorie de subiecte",boundaries:"Graniţe administrative şi politice",farming:"Agricultură şi ferme",climatologyMeteorologyAtmosphere:"Atmosferă şi climă",biota:"Biologie şi ecologie",economy:"Afaceri şi economie",planningCadastre:"Cadastru",society:"Cultură, societate şi demografie",elevation:"Elevaţie şi produse derivate",environment:"Mediu şi conservare",structure:"Facilităţi şi structuri",geoscientificInformation:"Geologie şi geofizică",health:"Sănătate umană şi boli",imageryBaseMapsEarthCover:"Imagini şi hărţi fundal",inlandWaters:"Resurse de apă continentale",location:"Locaţii şi reţele geodezice",intelligenceMilitary:"Militar",oceans:"Oceane şi estuare",transportation:"Reţele de transport",utilitiesCommunication:"Utilităţi şi comunicaţii"},multiplicity:{moveElementDown:"Mutare secţiune în jos",moveElementUp:"Mutare secţiune în sus",removeElement:"Eliminare secţiune",repeatElement:"Repetare secţiune"},optionalNode:{switchTip:"Includeţi sau excludeţi această secţiune."},serviceTypes:{featureService:"Serviciu de obiecte spaţiale",mapService:"Serviciu de hartă",imageService:"Serviciul de imagine",wms:"WMS",wfs:"WFS",wcs:"WCS"},validation:{pattern:"{label} - {message}",patternWithHint:"{label} - {message} {hint}",ok:"OK",empty:"Este necesară o valoare.",date:"Valoarea trebuie să fie o dată.",integer:"Valoarea trebuie să fie un număr întreg.",number:"Valoarea trebuie să fie un număr.",other:"Valoare nevalidă."},validationPane:{clearMessages:"Ştergere mesaje",prompt:"(faceţi clic pe fiecare mesaj de mai jos şi furnizaţi informaţiile necesare în câmpul specificat)"}});