(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a855592"],{"033d":function(t,e,a){},"0373":function(t,e,a){"use strict";var o=a("6277"),i=a.n(o);i.a},1840:function(t,e,a){"use strict";var o=a("033d"),i=a.n(o);i.a},"1dde":function(t,e,a){var o=a("d039"),i=a("b622"),r=a("2d00"),s=i("species");t.exports=function(t){return r>=51||!o((function(){var e=[],a=e.constructor={};return a[s]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},6277:function(t,e,a){},8418:function(t,e,a){"use strict";var o=a("c04e"),i=a("9bf2"),r=a("5c6c");t.exports=function(t,e,a){var s=o(e);s in t?i.f(t,s,r(0,a)):t[s]=a}},ae40:function(t,e,a){var o=a("83ab"),i=a("d039"),r=a("5135"),s=Object.defineProperty,n={},c=function(t){throw t};t.exports=function(t,e){if(r(n,t))return n[t];e||(e={});var a=[][t],l=!!r(e,"ACCESSORS")&&e.ACCESSORS,d=r(e,0)?e[0]:c,u=r(e,1)?e[1]:void 0;return n[t]=!!a&&!i((function(){if(l&&!o)return!0;var t={length:-1};l?s(t,1,{enumerable:!0,get:c}):t[1]=1,a.call(t,d,u)}))}},c510:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("menuComponent"),a("Listado")],1)},i=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-12"},[a("br"),a("div",{staticClass:"modal fade",attrs:{id:"EditModal","data-backdrop":"static","data-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog"},[a("div",{staticClass:"modal-content"},[t._m(0),a("div",{staticClass:"modal-body"},[a("editar",{attrs:{dataUser:t.row}})],1),a("div",{staticClass:"modal-footer"})])])]),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"AddModal","data-backdrop":"static","data-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog"},[a("div",{staticClass:"modal-content"},[t._m(1),a("div",{staticClass:"modal-body"},[a("center",[a("agregar")],1)],1),a("div",{staticClass:"modal-footer"})])])]),a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("div",{staticClass:"row"},[t._m(2),a("div",{staticClass:"col-8"},[a("center",[t._v("Listado de Proveedores")])],1),a("div",{staticClass:"col-2 text-rigth",staticStyle:{"text-align":"center"}},[1==t.numPro?a("div",{staticClass:"alert bg-success text-white"},[a("b",[t._v(t._s(t.numPro)+" Proveedor")])]):t._e(),1!=t.numPro?a("div",{staticClass:"alert bg-success text-white"},[a("b",[t._v(t._s(t.numPro)+" Proveedores ")])]):t._e()])])]),a("div",{staticClass:"card-body"},[a("table",{staticClass:"table table-striped"},[t._m(3),a("tbody",t._l(t.displayedProvider,(function(e,o){return a("tr",{key:o},[a("td",[t._v(" "+t._s(e.Nombre)+" ")]),a("td",[t._v(" "+t._s(e.Contacto.Correo)+" ")]),a("td",[t._v(" "+t._s(e.Razon_Social)+" ")]),a("td",[t._v(" "+t._s(e.Contacto.Telefono)+" ")]),a("td",[t._v(" "+t._s(e.Contacto.Direccion.Departamento)+", "+t._s(e.Contacto.Direccion.Municipio)+" ")]),a("td",[a("button",{staticClass:"btn btn-warning btn-sm",staticStyle:{"margin-right":"8px",color:"white"},attrs:{type:"button","data-toggle":"modal","data-target":"#EditModal",title:"Editar"},on:{click:function(a){return t.editar(e)}}},[a("i",{staticClass:"fas fa-edit"})]),a("button",{staticClass:"btn btn-danger btn-sm",attrs:{title:"Eliminar"},on:{click:function(a){return t.eliminar(e._id,e.Nombre)}}},[a("i",{staticClass:"fas fa-trash-alt"})])])])})),0)]),a("div",[1!=t.page?a("button",{staticClass:" btn btn-primary btn-sm mr-1",attrs:{type:"button"},on:{click:function(e){t.page--}}},[t._v(" Regresar ")]):t._e(),t._l(t.pages.slice(t.page-1,t.page+0),(function(e){return a("button",{key:e,staticClass:" btn btn-primary btn-sm mr-1",attrs:{type:"button"},on:{click:function(a){t.page=e}}},[t._v(" "+t._s(e)+" ")])})),t.page<t.pages.length?a("button",{staticClass:" btn btn-primary btn-sm mr-1",attrs:{type:"button"},on:{click:function(e){t.page++}}},[t._v(" Siguiente ")]):t._e()],2)])])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("Editar Proveedor")]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("Agregar Proveedor")]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col"},[a("div",[a("button",{staticClass:"btn btn-success",staticStyle:{"margin-right":"8px",color:"white"},attrs:{type:"button","data-toggle":"modal","data-target":"#AddModal"}},[a("i",{staticClass:"fas fa-plus-circle"}),t._v(" Agregar ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",{staticClass:"bg-primary text-white"},[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Nombre")]),a("th",{attrs:{scope:"col"}},[t._v("Correo")]),a("th",{attrs:{scope:"col"}},[t._v("Razon social")]),a("th",{attrs:{scope:"col"}},[t._v("Telefono")]),a("th",{attrs:{scope:"col"}},[t._v("Direccion")]),a("th",{attrs:{scope:"col"}},[t._v("Opciones")])])])}],n=(a("fb6a"),a("e443")),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("center",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("br"),a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("form",{on:{submit:function(e){return t.enviar_form()}}},[a("div",{staticClass:"form-row"},[a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.nombre,expression:"nombre"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Nombre"},domProps:{value:t.nombre},on:{input:function(e){e.target.composing||(t.nombre=e.target.value)}}})]),a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.correo,expression:"correo"}],staticClass:"form-control",attrs:{type:"email",placeholder:"Correo electronico"},domProps:{value:t.correo},on:{input:function(e){e.target.composing||(t.correo=e.target.value)}}})])]),a("br"),a("div",{staticClass:"form-row"},[a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.razonSocial,expression:"razonSocial"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Razon social"},domProps:{value:t.razonSocial},on:{input:function(e){e.target.composing||(t.razonSocial=e.target.value)}}})]),a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.telefono,expression:"telefono"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Telefono"},domProps:{value:t.telefono},on:{input:function(e){e.target.composing||(t.telefono=e.target.value)}}})])]),a("br"),a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[t._v(" Direccion ")]),a("div",{staticClass:"card-body"},[a("br"),a("div",{staticClass:"form-row"},[a("div",{staticClass:"col"},[a("select",{staticClass:"custom-select",attrs:{id:"selectDepartamento"},on:{change:function(e){return t.ShowSelected()}}},[a("option",{attrs:{value:"Departamento",selected:"selected"}},[t._v("-Departamento-")]),t._l(t.data,(function(e,o){return a("option",{key:o,domProps:{value:o}},[t._v(t._s(e.Departamento))])}))],2)]),a("div",{staticClass:"col"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.municipio,expression:"municipio"}],staticClass:"custom-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.municipio=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"0",selected:"selected"}},[t._v("-Municipio-")]),t._l(t.municipiosArray,(function(e,o){return a("option",{key:o},[t._v(t._s(e))])}))],2)])]),a("br"),a("div",{staticClass:"form-row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.descripcion,expression:"descripcion"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Descripcion"},domProps:{value:t.descripcion},on:{input:function(e){e.target.composing||(t.descripcion=e.target.value)}}})])])])])])]),a("br"),a("center",[a("div",[a("button",{staticClass:"btn btn-primary mr-4",attrs:{type:"submit","data-dismiss":"modal"},on:{click:function(e){return t.enviar_form()}}},[t._v("Enviar")]),a("button",{staticClass:"btn btn-danger",attrs:{type:"submit","data-dismiss":"modal"},on:{click:function(e){return t.limpiar_form()}}},[t._v("Cancelar")])])])],1)])])])])],1)},l=[],d={name:"agregarProveedor",data:function(){return{nombre:"",razonSocial:"",departamento:"",municipio:0,descripcion:"",telefono:"",correo:"",data:[],indiceDepartamento:0,municipiosArray:[]}},mounted:function(){this.dataProvider()},methods:{enviar_form:function(){var t=this;""!=this.nombre&&""!=this.correo&&""!=this.razonSocial&&""!=this.telefono&&""!=this.departamento&&0!=this.municipio&&""!=this.descripcion?n["a"].post("/Proveedores/crear",{Nombre:this.nombre,Razon_Social:this.razonSocial,Departamento:this.departamento,Municipio:this.municipio,Descripcion:this.descripcion,Telefono:this.telefono,Correo:this.correo}).then((function(e){Swal.fire({title:"Mensaje",icon:"success",text:e.data.mensaje}),t.limpiar_form(),location.reload()})).catch((function(t){return console.log(t)})):Swal.fire({title:"Campos vacios",icon:"info",text:"Todos los campos son requeridos."})},limpiar_form:function(){this.nombre="",this.correo="",this.razonSocial="",this.telefono="",this.departamento="",this.municipio=0,this.descripcion=""},ShowSelected:function(){var t=document.getElementById("selectDepartamento").value;this.indiceDepartamento=t,this.municipiosArray=this.data[this.indiceDepartamento].Municipios;var e=document.getElementById("selectDepartamento"),a=e.options[e.selectedIndex].text;this.departamento=a},dataProvider:function(){var t=this;n["a"].get("/Departamentos/listar").then((function(e){t.data=e.data,console.log(t.data)})).catch((function(t){return console.log(t)}))}}},u=d,m=(a("0373"),a("2877")),p=Object(m["a"])(u,c,l,!1,null,null,null),v=p.exports,f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("center",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("br"),a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("form",{on:{submit:function(e){return e.preventDefault(),t.enviar_form()}}},[a("div",{staticClass:"form-row"},[a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.nombre,expression:"nombre"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Nombre"},domProps:{value:t.nombre},on:{input:function(e){e.target.composing||(t.nombre=e.target.value)}}})]),a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.correo,expression:"correo"}],staticClass:"form-control",attrs:{type:"email",placeholder:"Correo electronico"},domProps:{value:t.correo},on:{input:function(e){e.target.composing||(t.correo=e.target.value)}}})])]),a("br"),a("div",{staticClass:"form-row"},[a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.razonSocial,expression:"razonSocial"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Razon social"},domProps:{value:t.razonSocial},on:{input:function(e){e.target.composing||(t.razonSocial=e.target.value)}}})]),a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.telefono,expression:"telefono"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Telefono"},domProps:{value:t.telefono},on:{input:function(e){e.target.composing||(t.telefono=e.target.value)}}})])]),a("br"),a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[t._v(" Direccion ")]),a("div",{staticClass:"card-body"},[a("br"),a("div",{staticClass:"col-auto my-1"},[a("div",{staticClass:"custom-control custom-checkbox mr-sm-2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.cambiarDireccion,expression:"cambiarDireccion"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:"check"},domProps:{checked:Array.isArray(t.cambiarDireccion)?t._i(t.cambiarDireccion,null)>-1:t.cambiarDireccion},on:{change:function(e){var a=t.cambiarDireccion,o=e.target,i=!!o.checked;if(Array.isArray(a)){var r=null,s=t._i(a,r);o.checked?s<0&&(t.cambiarDireccion=a.concat([r])):s>-1&&(t.cambiarDireccion=a.slice(0,s).concat(a.slice(s+1)))}else t.cambiarDireccion=i}}}),a("label",{staticClass:"custom-control-label",attrs:{for:"check"}},[t._v("Cambiar departamento y municipio")])])]),a("br"),0==t.cambiarDireccion?a("div",{staticClass:"form-row"},[a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.departamento,expression:"departamento"}],staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.departamento},on:{input:function(e){e.target.composing||(t.departamento=e.target.value)}}})]),a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.municipio,expression:"municipio"}],staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.municipio},on:{input:function(e){e.target.composing||(t.municipio=e.target.value)}}})])]):t._e(),t.cambiarDireccion?a("div",{staticClass:"form-row"},[a("div",{staticClass:"col"},[a("select",{staticClass:"form-control",attrs:{id:"selectDepartamento"},on:{change:function(e){return t.ShowSelected()}}},[a("option",{attrs:{value:"Departamento",selected:"selected"}},[t._v("-Departamento-")]),t._l(t.data,(function(e,o){return a("option",{key:o,domProps:{value:o}},[t._v(t._s(e.Departamento))])}))],2)]),a("div",{staticClass:"col"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.municipio,expression:"municipio"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.municipio=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"0",selected:"selected"}},[t._v("-Municipio-")]),t._l(t.municipiosArray,(function(e,o){return a("option",{key:o},[t._v(t._s(e))])}))],2)])]):t._e(),a("br"),a("div",{staticClass:"form-row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.descripcion,expression:"descripcion"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Descripcion"},domProps:{value:t.descripcion},on:{input:function(e){e.target.composing||(t.descripcion=e.target.value)}}})])])])])])]),a("br"),a("center",[a("div",[a("button",{staticClass:"btn btn-primary mr-4",attrs:{type:"submit","data-dismiss":"modal"},on:{click:function(e){return t.enviar_form()}}},[t._v("Actualizar")]),a("button",{staticClass:"btn btn-danger",attrs:{type:"reset","data-dismiss":"modal"},on:{click:function(e){return t.cancelar()}}},[t._v("Cancelar")])])])],1)])])])])],1)},h=[],b={name:"editarProveedor",props:{dataUser:{Object:Object}},data:function(){return{id:"",nombre:"",razonSocial:"",departamento:"",municipio:0,descripcion:"",telefono:"",correo:"",data:[],indiceDepartamento:0,municipiosArray:[],cambiarDireccion:!1}},mounted:function(){this.dataList()},watch:{dataUser:function(){this.dataUser&&(this.id=this.dataUser._id,this.nombre=this.dataUser.Nombre,this.correo=this.dataUser.Contacto.Correo,this.razonSocial=this.dataUser.Razon_Social,this.telefono=this.dataUser.Contacto.Telefono,this.descripcion=this.dataUser.Contacto.Direccion.Descripcion,this.departamento=this.dataUser.Contacto.Direccion.Departamento,this.municipio=this.dataUser.Contacto.Direccion.Municipio)}},methods:{enviar_form:function(){""!=this.nombre&&""!=this.correo&&""!=this.razonSocial&&""!=this.telefono&&""!=this.departamento&&0!=this.municipio&&""!=this.descripcion?n["a"].put("/Proveedores/actualizar",{id:this.id,Nombre:this.nombre,Razon_Social:this.razonSocial,Departamento:this.departamento,Municipio:this.municipio,Descripcion:this.descripcion,Telefono:this.telefono,Correo:this.correo}).then((function(t){Swal.fire({title:"Mensaje",icon:"success",text:t.data.mensaje}),location.reload()})).catch((function(t){return console.log(t)})):Swal.fire({title:"Mensaje",icon:"info",text:"Campos vacios, todos los campos son requeridos"})},cancelar:function(){this.cambiarDireccion=!1},ShowSelected:function(){var t=document.getElementById("selectDepartamento").value;this.indiceDepartamento=t,this.municipiosArray=this.data[this.indiceDepartamento].Municipios;var e=document.getElementById("selectDepartamento"),a=e.options[e.selectedIndex].text;this.departamento=a},dataList:function(){var t=this;n["a"].get("/Departamentos/listar").then((function(e){t.data=e.data,console.log(t.data)})).catch((function(t){return console.log(t)}))}}},C=b,g=Object(m["a"])(C,f,h,!1,null,null,null),_=g.exports,y={name:"listaProveedor",components:{editar:_,agregar:v},data:function(){return{numPro:0,dataProveedores:[],page:1,perPage:5,pages:[],row:Object}},mounted:function(){this.dataProvider()},methods:{editar:function(t){this.row=t},eliminar:function(t,e){Swal.fire({title:"Esta seguro que desea eliminar el proveedor "+e+"?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#3085d6",confirmButtonText:"Eliminar"}).then((function(e){e.value&&(console.log(t),n["a"].delete("/Proveedores/eliminar/".concat(t)).then((function(t){console.log(t.data.mensaje),Swal.fire({title:"Eliminado",icon:"success",text:t.data.mensaje}),location.reload()})).catch((function(t){return console.log(t)})))}))},dataProvider:function(){var t=this;n["a"].get("/Proveedores/listar").then((function(e){t.dataProveedores=e.data,console.log(t.dataProveedores),t.numPro=e.data.length,console.log(t.numPro)})).catch((function(t){return console.log(t)}))},paginate:function(t){var e=this.page,a=this.perPage,o=e*a-a,i=e*a;return t.slice(o,i)},setProviders:function(){for(var t=Math.ceil(this.dataProveedores.length/this.perPage),e=1;e<=t;e++)this.pages.push(e)}},computed:{displayedProvider:function(){return this.paginate(this.dataProveedores)}},watch:{dataProveedores:function(){this.setProviders()}}},w=y,x=(a("1840"),Object(m["a"])(w,r,s,!1,null,null,null)),P=x.exports,D=a("eb56"),S={name:"ProveedorL",components:{menuComponent:D["a"],Listado:P}},k=S,A=Object(m["a"])(k,o,i,!1,null,null,null);e["default"]=A.exports},e443:function(t,e,a){"use strict";var o=a("bc3a"),i=a.n(o),r=i.a.create({baseURL:"https://apirest-inventarios.herokuapp.com/api",headers:{"access-token":sessionStorage.getItem("autenticado")}});e["a"]=r},e8b5:function(t,e,a){var o=a("c6b6");t.exports=Array.isArray||function(t){return"Array"==o(t)}},fb6a:function(t,e,a){"use strict";var o=a("23e7"),i=a("861d"),r=a("e8b5"),s=a("23cb"),n=a("50c4"),c=a("fc6a"),l=a("8418"),d=a("b622"),u=a("1dde"),m=a("ae40"),p=u("slice"),v=m("slice",{ACCESSORS:!0,0:0,1:2}),f=d("species"),h=[].slice,b=Math.max;o({target:"Array",proto:!0,forced:!p||!v},{slice:function(t,e){var a,o,d,u=c(this),m=n(u.length),p=s(t,m),v=s(void 0===e?m:e,m);if(r(u)&&(a=u.constructor,"function"!=typeof a||a!==Array&&!r(a.prototype)?i(a)&&(a=a[f],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return h.call(u,p,v);for(o=new(void 0===a?Array:a)(b(v-p,0)),d=0;p<v;p++,d++)p in u&&l(o,d,u[p]);return o.length=d,o}})}}]);
//# sourceMappingURL=chunk-5a855592.9ce5441f.js.map