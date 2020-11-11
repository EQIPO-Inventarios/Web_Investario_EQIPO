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
                                    <div class="col-4">
                                        <label>Código de Barra</label>
                                    </div>
                                    <div class="col-4"> 

                                    </div>
                                    <div class="col-4">
                                        <label>Fecha de Salida:</label>
                                    </div>
                                </div>
                                <div class="form-row">
                                   <div  class="col-4">
                                        <input v-model="codigoProducto" type="number" disabled="disabled" class="form-control">
                                   </div>
                                   <div class="col-4">

                                   </div>
                                   <div class="col-4">
                                        <input v-model="fecha" type="text" disabled="disabled" class="form-control">
                                   </div>
                                </div>
                                <br>
                                <div class="form-row">
                                     <div class="col-4">
                                        <div class="form-row">
                                              <label class="text-left">Sucursal Destino</label>
                                        </div>
                                           <input v-model="nombreSucursal" type="text" disabled="disabled" class="form-control">
                                        </div>
                                    <div class="col-4">
                                          <div class="form-row">
                                              <label class="text-left">Nombre de Producto</label>
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
                                            <label class="text-left">Cantidad</label>
                                        </div>
                                        <input v-model="cantidad" type="number" min="1" class="form-control">
                                    </div>
                                    <div class="col-4">
                                        <div class="form-row">
                                            <label class="text-left">Precio Unitario</label>
                                        </div>
                                        <input v-model="precioUnitario" type="number" disabled="disabled" class="form-control">
                                    </div>
                                    <div class="col-4">
                                        <div class="form-row">
                                            <label class="text-left">Monto</label>
                                        </div>
                                        <input @keyup="calcularMonto()" v-model="monto" type="number" min="1" disabled="disabled" class="form-control">
                                    </div>
                                </div>
                                <br>
                                <div class="form-row">
                                    <div class="col">
                                        <div class="form-row">
                                            <label class="text-left">Detalle</label>
                                        </div>
                                        <textarea v-model="detalle" class="form-control" cols="30" rows="5" placeholder=""></textarea>
                                    </div>
                                </div>
                                <br>
                            </form>
                            <br>
                            <center>
                              <div>
                                <button v-on:click="enviar_form()" type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Agregar</button>
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
            idProducto: '',
            codigoProducto: '',
            nombreProducto: '',
            nombreSucursal: '',
            nombreProveedor: '',
            precioUnitario: 0,
            cantidad: 0,
            monto: 0,
            detalle: '',
            fecha: '',
            cantidadMinima: false,

            dataSalidas: []
        };
    },
    mounted() {
        this.getSalidasListar();
    },
    methods: {
        getSalidasListar(){
            axios.get('/Salidas/listar')
            .then(response => {
                    this.dataSalidas = response.data;
                    console.log(this.dataSalidas);
            })
            .catch(
                    error => console.log(error)
            );
        },


        enviar_form() {
            if (this.codigoProducto != '') {
                axios.post('/Salidas/crear',{
                    Codigo_Producto: this.codigoProducto,
                    Nombre_Producto: this.nombreProducto,
                    Nombre_Sucursal: this.nombreSucursal,
                    Proveedor: this.proveedor,
                    Precio_Unitario: this.precioUnitario,
                    Cantidad: this.cantidad,
                    Monto: this.monto,
                    Descripcion: this.descripcion,
                })
                .then(response => {
                    Swal.fire({
                        title: 'Mensaje',
                        icon: 'success',
                        text: response.data.mensaje
                    });
                    this.limpiar_form()
                    location.reload()
                })
                .catch(
                    error => console.log(error)
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
            this.nombreSucursal = '';
            this.proveedor = '';
            this.precioUnitario = '';
            this.cantidad = '';
            this.monto = '';
            this.descripcion = '';
        }
    },
    computed: {
        callPrecio() {
            return '$'+this.precioUnitario;
        }
    },
    
    watch: {
        dataSalida() {
            if (this.dataSalida) {
                this.id = this.dataEntrada._id;
                this.codigoProducto = this.dataSalida.CodigoProducto;
                this.fecha = this.dataEntrada.Fecha;            
                this.cantidad = this.dataEntrada.Cantidad;
                this.monto = this.dataEntrada.Monto;
                this.detalle = this.dataEntrada.Detalle;
                this.idProducto = this.dataEntrada.idProducto;
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