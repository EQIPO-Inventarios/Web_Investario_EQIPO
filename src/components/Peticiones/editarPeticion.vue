<template>
    <div class="col-12">
        <div class="row">
            <div class="col-12">
            <br>
            <div class="card">
                <div class="card-body">
                    <!-- @submit.prevent="enviarForm()" -->
                <form >
                     <div class="form-row">
                        <div class="col">
                            <div class="form-group">
                                <label for="nompro">Fecha:</label>
                                <input v-model="fechaActual" type="text" class="form-control" disabled="disabled">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="nomsuc">Sucursal: </label>
                                <input v-model="nombreSucursal" type="text" class="form-control" disabled="disabled">
                            </div>
                        </div>
                    </div>
                    <!--
                    <div class="form-row">
                        <label for="codpro">Codigo de Producto:</label>
                    </div>
                    <div class="form-row">                    
                        <div class="col-8">
                                <input v-model.number="codigoProducto" type="number" class="form-control" placeholder="Ingrese codigo..." required="required">
                        </div>
                        <div class="col">
                            <button @click="buscarProducto()" class="btn btn-primary" type="button">Buscar</button>
                        </div>
                    </div>  
                    <br>
                    <div v-if="NoExiste">
                        <span class="wd-2 bg-danger text-white">
                            No se encontro producto con dicho codigo de barra.
                        </span>
                    </div>
                    <br>-->
                    <div>
                        <div class="form-row">
                        <div class="col">
                            <div class="form-group">
                                <label for="nompro">Código producto:</label>
                                <input v-model="codigoProducto" type="text" id="codg" class="form-control" disabled="disabled">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="nompro">Nombre producto:</label>
                                <input v-model="nombreProducto" type="text" id="nompro" class="form-control" disabled="disabled">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="price">Proveedor:</label>
                                <input v-model="nombreProveedor" type="text" id="price" class="form-control" disabled="disabled">
                            </div>
                        </div>
                        


                        </div>
                        <div class="form-row">
                        <div class="col">
                            <div class="form-group">
                                <label for="nompro">Cantidad:</label>
                                <input v-model.number="cantidad" type="number" min="1" class="form-control" required="required">
                                <!-- <p v-if="cantidadMinima" class="wd-2 bg-danger text-white"> Cantidad mayor o igual a 1</p> -->
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="price">Precio producto:</label>
                                <input :value="callPrecio" type="text" id="price" class="form-control" disabled="disabled">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="nompro">Monto:</label>
                                <input @keyup="calcularMonto()" v-model="monto" type="number" min="1" class="form-control" disabled="disabled">
                            </div>
                        </div>
                        </div>
                        <div class="form-row">
                        <div class="col">
                            <div class="form-group">
                                <label for="nompro">Detalle:</label>
                                <textarea v-model="detalle" class="form-control" cols="10" rows="5" placeholder="Detalles ..."></textarea>
                            </div>
                        </div>
                        </div>
                    </div>
                </form>   
                <br>
                <div>
                    <center>
                            <button @click="enviarForm()"  type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Actualizar</button>
                            <button @click="limpiarForm()" type="submit" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    </center>
                </div>           
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from 'vue-router'
import axios from '../../config/axios'

export default {
    name: 'editarPeticion',
    props: {
        dataPeticion: { Object }
    },
    data() {
        return {
            //variables para recuperar la data de la peticion
            id: '',
            fechaActual: '',
            detalle: '',
            productoId: '',
            cantidad: '',
            estadoPeticion: '',

            //recuperando el nombre del producto
            dataProductos: [],
            nombreProducto: '',
            nombreProveedor: '',
            codigoProducto: '',
            precio: 0,
            monto: 0,
            dataSucursales: [],
            nombreSucursalDestino: '',

            //variables para recupoerar el id de la sucursal local
            nombreSucursal: sessionStorage.getItem('nomSucursal'),
            sucursalId: sessionStorage.getItem('sucursalId'),
            minCant: false
        }
    },
    mounted() {
        this.obtenerProductosListar();
    },
    methods: {
        //obteniendo los productos
        obtenerProductosListar() {
            axios.get('/Productos/listar')
            .then(response => {
                this.dataProductos = response.data;
                console.log(this.dataProductos);
            })
            .catch(
                error => console.log(error)
            );
        },
        enviarForm() {
            if(this.id != '' && 
                this.detalle != '' && 
                this.productoId != '' && 
                this.cantidad != 0){ 
                //validando campos numericos
                if (this.cantidad >= 1 ) {
                    axios.put('/PeticionEntradas/actualizar',{
                        id: this.id,
                        Detalle: this.detalle,
                        Cantidad: this.cantidad,
                        idProducto: this.productoId
                    })
                    .then(response => {                 
                        console.log(response.data.mensaje);                 
                        Swal.fire({
                        title: 'Mensaje',
                        icon: 'success',
                        text: response.data.mensaje
                        });
                        this.limpiarForm();

                        setTimeout( function() {
                            location.reload();
                        }, 2000);
                    })
                    .catch(
                        (error) => console.log(error)
                    )
                }else {
                    Swal.fire({
                    title: 'Campos numericos invalidos',
                    icon: 'info',
                    text: 'Verifique los campos numericos...'
                    });
                }

            }else{
                Swal.fire({
                    title: 'Campos vacios',
                    icon: 'info',
                    text: 'Todos los campos son requeridos.'
                });
            }
        },
        limpiarForm() {
            this.fechaActual = '';
            this.nombreProducto = '';
            this.nombreProveedor = '';
            this.cantidad = '';
            this.precio = '';
            this.detalle = '';
        },
    },
    computed: {
        callPrecio(){
            return '$'+this.precio;
        }
    },
    watch: {
        dataPeticion() {
            if (this.dataPeticion) {
                this.id = this.dataPeticion._id;
                this.fechaActual = this.dataPeticion.Fecha;
                this.detalle = this.dataPeticion.Detalle;
                this.productoId = this.dataPeticion.idProducto;
                this.cantidad = this.dataPeticion.Cantidad;
                this.sucursalId = this.dataPeticion.idSucursal;
                this.estadoPeticion = this.dataPeticion.EstadoPeticion;
            }
        },
        productoId() {
            if (this.productoId) {
                for(let producto of this.dataProductos) {
                    if (producto._id == this.productoId) {
                        this.nombreProducto = producto.NombreProducto;
                        this.precio = producto.Precio_Unitario;
                        this.nombreProveedor = producto.Proveedor.Nombre;
                        this.codigoProducto = producto.CodigoProducto;
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
                this.monto = this.precio * this.cantidad;
                }        
            }
        }
    }
}
</script>