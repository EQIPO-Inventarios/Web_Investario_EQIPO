<template>
    <div class="col-12">
        <br>
        <!-- inicio del modal editar -->
        <div class="modal fade" id="EditModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Detalle Peticion</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- componente de editar peticion -->
                        <editar :dataPeticion="row"></editar>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>

        <!-- inicio del modal agregar -->
        <div class="modal fade" id="addModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Agregar Peticion</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- componente de agregar peticion -->
                        <agregar></agregar>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col">
                        <div v-if="externa">
                            <button type="button" data-toggle="modal" data-target="#addModal"
                                style="margin-right:8px; color:white" class="btn btn-success">
                                <i class="fas fa-plus-circel"></i>      Agregar
                            </button>
                        </div>
                    </div>
                    <div class="col-8">
                        <center>Listado de Peticiones</center>
                    </div>
                    <div class="col-2 text-rigth" style="text-align: center">
                        <!-- falta el contador de las peticiones -->
                        <div v-if="numPeticiones == 1" class="alert bg-success text-white"><b>{{numPeticiones}} Peticion</b></div>
                        <div v-if="numPeticiones != 1" class="alert bg-success text-white"><b>{{numPeticiones}} Peticiones</b></div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped table-sm" style="font-size:16px">
                        <thead class="bg-primary text-white">
                            <tr>
                                <th>Fecha</th>
                                <th>Producto</th>
                                <th>Codigo Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Proveedor</th>
                                <th>Sucursal</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in displayedPeticiones" :key="index">
                                <td>{{item.Fecha}}</td>
                                <td>{{obtenerNombreProducto(item.idProducto)}}</td>
                                <td>{{obtenerCodigoProducto(item.idProducto)}}</td>
                                <td>{{item.Cantidad}}</td>
                                <td>$ {{obtenerPrecioProducto(item.idProducto)}}</td>
                                <td>{{obtenerProveedorProducto(item.idProducto)}}</td>
                                <td>{{obtenerNombreSucursal(item.idSucursal)}}</td>
                                <td>{{mostrarEstadoPeticion(item._id)}}</td>
                                <!-- mostrarEstadoPeticion(item.EstadoPeticion) -->
                                <td v-if="mostrar">
                                    <button @click="eliminar(item._id, item.idProducto, item.Cantidad)"
                                        type="button" style="margin-rigth:8px; color: white" class="btn btn-success btn-sm" title="Aceptar">
                                        <i class="fas fa-check-square"></i>
                                    </button>
                                </td>
                                <td v-if="externa">
                                    <button 
                                        type="button" data-toggle="modal" data-target="#EditModal"
                                        style="margin-right:8px; color: white" class="btn btn-warning btn-sm" title="Editar">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-success btn-sm" style="margin-right:8px; color: white" title="Recibida">
                                        <i class="fas fa-check-double"></i>
                                    </button>
                                    <button @click="eliminar(item._id, item.idProducto, item.Cantidad)" 
                                        class="btn btn-danger btn-sm" style="margin-right:8px; color: white" title="Eliminar">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- paginacion -->
                    
                    <div>
                        <button  class=" btn btn-primary btn-sm mr-1" 
                        type="button" v-if="page != 1" @click="page--">
                            Regresar 
                        </button>
                        <button class=" btn btn-primary btn-sm mr-1" type="button" v-for="pageNumber in pages.slice(page- 1, page+ 0)" :key="pageNumber" 
                            @click="page = pageNumber">
                            {{pageNumber}}
                        </button>
                        <button class=" btn btn-primary btn-sm mr-1" type="button" v-if="page < pages.length" @click="page++">
                            Siguiente
                        </button>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import router from 'vue-router'
import axios from '../../config/axios'

import agregar from '@/components/Peticiones/agregarPeticion.vue'
import editar from '@/components/Peticiones/editarPeticion.vue'

export default {
    name: 'listaPeticion',
    components: {
        agregar,
        editar
    },
    data() {
        return {
            numPeticiones: 0,

            //guarda todas las peticiones
            dataPeticiones: [],
            estado: 0,

            //guarda todos los productos
            dataProductos: [],

            //guarda todas las sucursales
            dataSucursales: [],

            //area del paginado
            page: 1,
            perPage: 5,
            pages: [],

            row: Object,

            //mostrar si es jefe de bodega de la sucursal principal
            mostrar: false,
            externa: false
        }
    },
    mounted() {
        this.dataPeticionesListar();
        this.dataProductosListar();
        this.dataSucursalesListar();
        this.EsJefeSucursalPrincipal();
        this.EsSucursalExterna();
        //this.obtenerCodigoProducto();
        //this.obtenerPrecioProducto();
        //this.obtenerProveedorProducto();
        //this.obtenerNombreSucursal();
        //this.mostrarEstadoPeticion();
    },
    methods: {

        aceptar: function(id){
            Swal.fire({
                title: 'Desea aceptar esta peticion?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
                })
                .then((result) => {
                if (result.value) {
                    console.log(id);
                    axios.delete(`/PeticionEntradas/aceptar`)
                    .then(response => {
                        console.log(response.data.mensaje);
                        Swal.fire({
                        title: 'Aceptada',
                        icon: 'success',
                        text: response.data.mensaje
                        });
                        location.reload();
                    })
                    .catch(
                        error => console.log(error)
                    );

                }
            }) 
        },


        //eliminando la peticion de salida
        eliminar: function(_id, idProducto, Cantidad){
            Swal.fire({
                title: 'Esta seguro que desea eliminar la Peticion:',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Eliminar'
                })
                .then((result) => {
                if (result.value) {
                    console.log(_id, idProducto, Cantidad);
                    axios.delete(`/PeticionEntradas/eliminar`)
                    .then(response => {
                        console.log(response.data.mensaje);
                        Swal.fire({
                        title: 'Eliminada',
                        icon: 'success',
                        text: response.data.mensaje
                        });
                        location.reload();
                    })
                    .catch(
                        error => console.log(error)
                    );

                }
            }) 
        },



        //recupera las peticiones
        dataPeticionesListar(){
            axios.get('/PeticionEntradas/listarTodas')
            .then(response => {
                this.dataPeticiones =  response.data;
                //console.log(this.dataPeticiones);
                this.numPeticiones = response.data.length;
                //console.log(this.numPeticiones);
            })
            .catch(
                error => console.log(error)
            );
        },
        //mostrar el estado de la peticion
        mostrarEstadoPeticion(id){
            var estado = '';
            for(let item of this.dataPeticiones){
                if(item._id == id) {
                    estado = item.EstadoPeticion;
                    if (estado == 1) {
                        estado = 'Pendiente';
                    }
                    else if (estado == 2) {
                        estado = 'Aceptada';
                    }
                    else if (estado == 3) {
                        estado = 'Entregada'
                    }
                }
            }
            return estado;
        },
        









        //obtener los productos
        dataProductosListar() {
            axios.get('/Productos/listar')
            .then(response => {
                    this.dataProductos = response.data;
                    //console.log(this.dataProductos);
            })
            .catch(
                    error => console.log(error)
            );
        },
        //obtener el nombre del producto
        obtenerNombreProducto(id) {
            var nombre = '';
            for( let item of this.dataProductos) {
                if(item._id == id) {
                    nombre = item.NombreProducto;
                }
            }
            return nombre;
        },
        //obtener el codigo del producto
        obtenerCodigoProducto(id){
            var codigo = '';
            for (let item of this.dataProductos) {
                if(item._id == id) {
                    codigo = item.CodigoProducto;
                }
            }
            return codigo;
        },
        //obtener el precio del producto
        obtenerPrecioProducto(id){
            var precio = '';
            for (let item of this.dataProductos) {
                if(item._id == id) {
                    precio = item.Precio_Unitario;
                }
            }
            return precio;
        },
        //obtener el proveedor del producto
        obtenerProveedorProducto(id){
            var proveedor = '';
            for (let item of this.dataProductos) {
                if(item._id == id) {
                    proveedor = item.Proveedor.Nombre;
                }
            }
            return proveedor;
        },






        //obtener las sucursales
        dataSucursalesListar() {
            axios.get('/Sucursales/listar')
            .then(response => {
                    this.dataSucursales = response.data;
                    //console.log(this.dataSucursales);
            })
            .catch(
                    error => console.log(error)
            );
        },
        //obtener el nombre de la sucursal de la que proviene la peticion
        obtenerNombreSucursal(id) {
        var nombre = '';
            for( let sucursal of this.dataSucursales) {
                if(sucursal._id == id) {
                    nombre = sucursal.Nombre;
                }
            }
            return nombre;
        },



        EsJefeSucursalPrincipal(){
            if (sessionStorage.getItem('nomSucursal') == 'Sucursal Principal') {
                this.mostrar = true;
            } else {
                this.mostrar = false;
            }
        },
        EsSucursalExterna(){
            if (sessionStorage.getItem('nomSucursal') != 'Sucursal Principal') {
                this.externa = true;
            } else {
                this.externa = false;
            }
        },


        //methods para paginacion
        paginate(Peticiones){
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return Peticiones.slice(from, to);
        },
        setPeticiones() {
            let numberOfPages = Math.ceil(this.dataPeticiones.length / this.perPage);
            for(let i = 1;  i <= numberOfPages; i++){
                this.pages.push(i);
            }
        }

    },
    computed: {
        displayedPeticiones(){
            return this.paginate(this.dataPeticiones);
        }
    },
    watch: {
        dataPeticiones() {
            this.setPeticiones();
        }
    }
}
</script>

<style>
.content {
    width: 100%;
    height: 100%;
}
</style>