<template>
    <div class="content">
        <center>
            <div class="row">
                <div class="col-12">
                    <br>
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="enviarForm()">
                                <div class="form-row">
                                    <div class="col-4"></div>
                                    <div class="col-4">
                                        <div class="form-row">
                                            <label class="text-left">Fecha de Salida:</label>
                                        </div>
                                        <input v-model="fecha" type="text" disabled="disabled" class="form-control">
                                    </div>
                                </div>
                                <br>
                                <div class="form-row">
                                    <div class="col-4">
                                          <div class="form-row">
                                              <label class="text-left">Código de Barra:</label>
                                          </div>
                                        <input v-model="codigoProducto" type="number" disabled="disabled" class="form-control">
                                    </div>
                                    <div class="col-4">
                                          <div class="form-row">
                                              <label class="text-left">Nombre de Producto:</label>
                                          </div>
                                        <input v-model="nombreProducto" type="text" disabled="disabled" class="form-control">
                                    </div>
                                    <div class="col-4">
                                          <div class="form-row">
                                              <label class="text-left">Proveedor</label>
                                          </div>
                                        <input v-model="nombreProveedor" type="text" disabled="disabled" class="form-control">
                                    </div>
                                </div>
                                <br>
                                <div class="form-row">
                                    <div class="col-4">
                                        <div class="form-row">
                                            <label class="text-left">Cantidad:</label>
                                        </div>
                                        <input v-model.number="cantidad" type="number" min="1" class="form-control">
                                    </div>
                                    <div class="col-4">
                                        <div class="form-row">
                                            <label class="text-left">Precio Unitario:</label>
                                        </div>
                                        <input :value="callPrecio" type="text" id="price" disabled="disabled" class="form-control">
                                    </div>
                                    <div class="col-4">
                                        <div class="form-row">
                                            <label class="text-left">Monto:</label>
                                        </div>
                                        <input @keyup="calcularMonto()" v-model="monto" type="text" class="form-control" disabled="disabled">
                                    </div>
                                </div>
                                <br>
                                <div class="form-row">
                                    <div class="col">
                                        <div class="form-row">
                                            <label class="text-left">Detalle:</label>
                                        </div>
                                        <textarea v-model="detalle" class="form-control" cols="30" rows="5" placeholder=""></textarea>
                                    </div>
                                </div>
                                <br>
                            </form>
                            <br>
                            <center>
                              <div>
                                <button v-on:click="enviar_form()" type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Actualizar</button>
                                <button v-on:click="limpiar_form()" type="submit" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                              </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </center>
    </div>
</template>

<script>
import router from 'vue-router'
import axios from '../../config/axios'


export default {
    name: 'editarSalida',
    props: {
        dataSalida: { Object }
    },
    data() {
        return{
            id: '',
            idProducto: '',
            codigoProducto: '',
            nombreProducto: '',
            nombreProveedor: '',
            precioUnitario: 0,
            cantidad: '',
            monto: 0,
            detalle: '',
            fecha: '',
            cantidadMinima: false,

            nomSucursal: sessionStorage.getItem('nomSucursal'),
            sucursalId: sessionStorage.getItem('sucursalId'),
            idDestino: '',

            dataSalidas: [],
            dataProductos: [],
            dataSucursales: [],
            nombreSucursalDestino: ''
        };
    },
    mounted() {
        this.getSalidasListar();
        this.obtenerProductosL();
        this.dataSucursalesListar();

        
    },

    watch: {
        dataSalida() {
            if (this.dataSalida) {
                this.id = this.dataSalida._id;
                this.fecha = this.dataSalida.Fecha;   
                this.detalle = this.dataSalida.Detalle;  
                this.idProducto = this.dataSalida.idProducto;       
                this.cantidad = this.dataSalida.Cantidad;
                this.monto = this.dataSalida.Monto;
                this.sucursalId = this.dataSalida.idSucursal;
                this.idDestino = this.dataSalida.idSucursalDestino;
                
            }
        },
        idProducto() {  //metodo que no se esta ocupando pero que puede servir.
            if (this.idProducto) {
                for(let producto of this.dataProductos) {
                    if (producto._id == this.idProducto) {
                        this.codigoProducto = producto.CodigoProducto;
                        this.nombreProducto = producto.NombreProducto;
                        this.precioUnitario = producto.Precio_Unitario;
                        this.nombreProveedor = producto.Proveedor.Nombre;
                        this.monto = this.precioUnitario * this.cantidad;
                    }
                }
            }
        },
        cantidad() {
            if (this.cantidad) {
                if(this.cantidad < 1){
                    this.cantidadMinima = true;
                }else { 
                this.cantidadMinima = false; 
                this.monto = this.precioUnitario * this.cantidad;
                }        
            }
        },
        //obteniendo el nombre de la sucursal
        obtenerNombreSucursal(){
            if(this.idDestino)
            for(let item of this.dataSucursales) {
                if (item._id == this.idDestino) {
                    this.nombreSucursalDestino = item.Nombre;
                }
            }
        }
    },

    methods: {

        //obteniendo las salidas
        getSalidasListar() {
            if (this.nomSucursal == 'Sucursal Principal'){
            axios.get('/Salidas/listar')
            .then(response => {
                this.dataSalidas = response.data;
                console.log(this.dataSalidas);
            })
            .catch(
                error => console.log(error)
            );

            }else{
            axios.get(`/Salidas/listarporIdSucursal/${this.sucursalId}`)
            .then(response => {
                this.dataSalidas = response.data;
                console.log(this.dataSalidas);
            })
            .catch(
                error => console.log(error)
            );
          }

        }, 

        //obteniendo las sucursales
        dataSucursalesListar(){
            axios.get('/Sucursales/listar')
            .then(response => {
                this.dataSucursales = response.data;
                console.log(this.dataSucursales);
            })
            .catch(
                error => console.log(error)
            );
        },
        
        //obteniendo los productos
        obtenerProductosL(){
            if (this.nomSucursal == 'Sucursal Principal') {
                axios.get('/Productos/listar')
            .then(response => {
                    this.dataProductos = response.data;
                    console.log(this.dataProductos);
            })
            .catch(
                    error => console.log(error)
            );

            }else {
                axios.get(`/ProductoSucursales/listar/${this.sucursalId}`)
                .then(response => {
                    this.dataProductos = response.data;
                    console.log(this.dataProductos);
                })
                .catch(
                    error => console.log(error)
                );
            }
            
        },

        enviar_form() {
            if (this.id != '' && this.detalle != '' && this.cantidad != 0 &&
                this.monto != 0) {
                axios.put('/Salidas/actualizar',{
                    id: this.id,
                    Detalle: this.detalle,
                    Cantidad: this.cantidad,
                    Monto: this.monto,
                    idProducto: this.idProducto,
                })
                .then((response) => {
                    Swal.fire({
                        title: 'Mensaje',
                        icon: 'success',
                        text: response.data.mensaje
                    });
                    this.limpiar_form()
                    location.reload()
                })
                .catch(
                    (error) => console.log(error)
                )
            }
            else{
                Swal.fire({
                title: 'Campos vacíos',
                icon: 'info',
                text: 'Todos los campos son requeridos.'
                });
            }
        },

        
        limpiar_form() {
            this.codigoProducto = '';
            this.nombreProducto = '';
            this.nomSucursal = '';
            this.proveedor = '';
            this.precioUnitario = '';
            this.cantidad = '';
            this.monto = '';
            this.detalle = '';
        }
    },
    computed: {
        callPrecio() {
            return '$'+this.precioUnitario;
        }
    }
    
    
}
</script>