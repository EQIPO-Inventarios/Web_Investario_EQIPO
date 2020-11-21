<template>
    <div class="col-12">
        <br>

        <!-- inicio del modal recibida -->
        <div class="modal fade" id="ConfirmModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Confirmar de Recibida</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- componente de confirmar peticion de recibida -->
                        <confirmar :dataPeticion="row"></confirmar>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>

        <!-- inicio del modal aceptar -->
        <div class="modal fade" id="AceptModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Aceptar Peticion</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- componente de aceptar peticion -->
                        <aceptar :dataPeticion="row"></aceptar>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>

        <!-- inicio del modal editar -->
        <div class="modal fade" id="EditModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Editar Peticion</h5>
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
            <div class="row ml-1">
                <form>
                    <div class="row">
                        <div class="col-3">
                            <label>Filtrar: </label>
                        </div>
                        <div class="col">
                            <select v-model="number" class="custom-select">
                                <option value="1">Pendientes</option>
                                <option value="2">Aceptadas</option>
                                <option value="3">Entregadas</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <br>
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
                                <th v-if="mostrarEntregadas">Opciones</th>
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
                                        <button @click="aceptar(item)"
                                            type="button" data-toggle="modal" data-target="#AceptModal" 
                                            style="margin-rigth:8px; color: white" class="btn btn-success btn-sm" title="Aceptar">
                                            <i class="fas fa-check-square"></i>
                                        </button>
                                    </td>
                                <div v-if="externa">
                                    <td v-if="item.EstadoPeticion==2">
                                        <button @click="recibida(item)"
                                            type="button" data-toggle="modal" data-target="#ConfirmModal"
                                            style="margin-right:8px; color: white" class="btn btn-success btn-sm" title="Recibida">
                                            <i class="fas fa-check-double"></i>
                                        </button>
                                    </td>
                                    <td v-if="item.EstadoPeticion==1">
                                        <button @click="editar(item)"
                                            type="button" data-toggle="modal" data-target="#EditModal"
                                            style="margin-right:8px; color: white" class="btn btn-warning btn-sm" title="Editar">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button @click="eliminar(item._id, item.idProducto, item.Cantidad)" 
                                            class="btn btn-danger btn-sm" style="margin-right:8px; color: white" title="Eliminar">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </div>
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
import aceptar from '@/components/Peticiones/aceptarPeticion.vue'
import confirmar from '@/components/Peticiones/confirmarPeticion.vue'

export default {
    name: 'listaPeticion',
    components: {
        agregar,
        editar,
        aceptar,
        confirmar
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
            externa: false,

            //variables para eliminar la peticion
            _id: '',
            idProducto: '',
            Cantidad: 0,

            //variables para aceptar la peticion
            info: Object,
            id: '',
            fechaActual: '',
            detalle: '',
            productoId: '',
            cantidad: '',
            idSucursal: '',
            estadoPeticion: '',
            nomSucursal: sessionStorage.getItem('nomSucursal'),
            sucursalId: sessionStorage.getItem('sucursalId'),

            arraySegunSucursal: [],
            numPeticionesPorSucursal: 0,
            //este sera el filtro para elegir el tipo de peticiones a mostrar
            number: 1,

            //mostrar solo si estan pendientes
            mostrarEntregadas: true
        }
    },
    mounted() {
        //this.dataPeticionesSucursalesListar();
        this.dataPeticionesListar();
        this.dataProductosListar();
        this.dataSucursalesListar();
        this.EsJefeSucursalPrincipal();
        this.EsSucursalExterna();
        this.peticionesEntregadas();
    },
    methods: {

        //confirmando las peticiones
        aceptar(item){
            this.row = item;
            console.log(item);
        },
        //editando la peticiones
        editar(item){
            this.row = item;
            console.log(item);
        },
        //confirmando las peticiones de recibidas
        recibida(item){
            this.row = item;
            console.log(item);
        },

        
        //eliminando la peticion
        eliminar(ID, IdP, C) {
            Swal.fire({
                title: 'Esta seguro que desea eliminar la peticion?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Eliminar'
            }).then((result) => {
                if (result.value) {
                    axios.delete('/PeticionEntradas/eliminar', {
                        _id: this.ID,
                        idProducto: this.IdP,
                        Cantidad: this.C,
                    })
                    .then(response => {
                            console.table(response.data.mensaje);
                            Swal.fire({
                            title: 'Eliminado',
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

        //recupera todas las peticiones
        dataPeticionesListar(){
            if (this.nomSucursal == 'Sucursal Principal') {
                axios.get('/PeticionEntradas/listarTodas')
                .then(response => {
                    this.dataPeticiones =  response.data;
                    console.log(this.dataPeticiones);
                    this.numPeticiones = response.data.length;
                    console.log(this.numPeticiones);
                })
                .catch(
                    error => console.log(error)
                );
            }else{
                axios.post('/PeticionEntradas/listar', {
                    idSucursal: this.sucursalId,
                    EstadoPeticion: this.number
                })
                .then(response => {
                    this.dataPeticiones =  response.data;
                    console.log(this.dataPeticiones);
                    this.numPeticiones = response.data.length;
                    console.log(this.numPeticiones);
                })
                .catch(
                    error => console.log(error)
                );
            }
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
                        estado = 'Entregada';
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
        peticionesEntregadas(){
            if (this.number == 3) {
                this.mostrarEntregadas = false;
            }else{
                this.mostrarEntregadas = true;
            }
        },
        

        //metodos para paginacion
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
        },

    },
    watch: {
        dataPeticiones() {
            this.setPeticiones();
        },
        number(){
            if(this.number){
                if (this.number==1) {
                    this.mostrarEntregadas = true;
                    axios.post('/PeticionEntradas/listar', {
                    idSucursal: this.sucursalId,
                    EstadoPeticion: this.number
                    })
                    .then(response => {
                        this.dataPeticiones =  response.data;
                        console.log(this.dataPeticiones);
                        this.numPeticiones = response.data.length;
                        console.log(this.numPeticiones);
                    })
                    .catch(
                        error => console.log(error)
                    );
                }
                if (this.number==2) {
                    this.mostrarEntregadas = true;
                    axios.post('/PeticionEntradas/listar', {
                    idSucursal: this.sucursalId,
                    EstadoPeticion: this.number
                    })
                    .then(response => {
                        this.dataPeticiones =  response.data;
                        console.log(this.dataPeticiones);
                        this.numPeticiones = response.data.length;
                        console.log(this.numPeticiones);
                    })
                    .catch(
                        error => console.log(error)
                    );
                }
                if (this.number==3) {
                    this.mostrarEntregadas = false;
                    axios.post('/PeticionEntradas/listar', {
                    idSucursal: this.sucursalId,
                    EstadoPeticion: this.number
                    })
                    .then(response => {
                        this.dataPeticiones =  response.data;
                        console.log(this.dataPeticiones);
                        this.numPeticiones = response.data.length;
                        console.log(this.numPeticiones);
                    })
                    .catch(
                        error => console.log(error)
                    );
                }
            }
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