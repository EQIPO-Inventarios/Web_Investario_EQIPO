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
                                <input v-model="fechaLocal" type="text" disabled="disabled" class="form-control">
                            </div>
                        </div>
                        <div class="col"></div>
                        <div class="col">
                            <div class="form-group">
                                <label for="nomsuc">Sucursal: </label>
                                <input v-model="nombreSucursal" type="text" class="form-control" disabled="disabled">
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="form-row">
                        <label for="codpro">Codigo de Producto:</label>
                    </div>
                    <div class="form-row">                    
                        <div class="col-8">
                                <input v-model.number="codigoProducto" type="number" class="form-control" placeholder="Ingrese codigo..." required="required">
                                <div v-if="codigoProducto != '' " class="wd bg-success text-white">Ok valido!</div>
                        </div>
                        <div class="col">
                            <button @click="buscarProducto()" class="btn btn-primary" type="button">Buscar</button>
                        </div>
                    </div>  
                    <br>
                    <div v-if="NoExiste"> <!-- SE MUESTRA SI EL CODIGO DE BARRA NO ENCUENTRA NINGUN PRODUCTO.-->
                        <span class="wd-2 bg-danger text-white">
                            No se encontro producto con dicho codigo de barra.
                        </span>
                    </div>
                    <div v-if="nombreProducto != '' && nombreProveedor != '' && precioUnitario != '' "> <!-- SINO INGRESA CODIGO DE BARRA NO SE MOSTRARA-->
                        <div class="form-row">
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
                                <input v-model="cantidad" type="number" min="1" class="form-control" required="required">
                                <p v-if="cantidadMinima" class="wd-2 bg-danger text-white"> Cantidad mayor o igual a 1</p>
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
                                <textarea v-model="detalle" class="form-control" cols="30" rows="5" placeholder="Detalles ..."></textarea>
                            </div>
                        </div>
                        </div>
                    </div>
                </form>   
                <br>
                <div v-if="nombreProducto != '' && nombreProveedor != '' && precioUnitario != '' ">
                    <center>
                            <button @click="enviarForm()"  type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Agregar</button>
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
    name: 'agregarPeticion',
    data() {
        return {
            fechaLocal: '',
            detalle: '',

            //obteniedo los productos
            dataProductos: [],
            nombreProducto: '',
            precioUnitario: 0,
            productoId: '',
            nombreProveedor: '',
            
            cantidad: 0,
            monto: 0,
            cantidadMinima: false,

            //buscando producto
            codigoProducto: '',
            NoExiste: false,

            

            //obteniendo el nombre y el id de la sucursal
            nombreSucursal: sessionStorage.getItem('nomSucursal'),
            sucursalId: sessionStorage.getItem('sucursalId'),
        }
    },
    mounted() {
        this.getFechaActual();
        this.dataProductosListar();
    },
    methods: {
        getFechaActual() {
            var date = new Date();
            this.fechaLocal = date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear();
        },


        //obteniendo los productos
        dataProductosListar() {
            axios.get('/Productos/listar')
            .then(response => {
                    this.dataProductos = response.data;
                    console.log(this.dataProductos);
            })
            .catch(
                    error => console.log(error)
            );
        },


        //buscando productos
        buscarProducto() {
        if(this.codigoProducto != '') {
            for(let item of this.dataProductos) {
                if(item.CodigoProducto == this.codigoProducto) {
                    this.NoExiste = false; 
                    this.nombreProducto = item.NombreProducto;
                    this.productoId = item._id;
                    this.precioUnitario = item.Precio_Unitario;
                    this.nombreProveedor = item.Proveedor.Nombre;               
                }
            }
            if (this.nombreProducto == '' && 
                this.productoId == '' && 
                this.precioUnitario == 0 && 
                this.nombreProveedor == '') {
                this.NoExiste = true;  
            }
            }
        },
        limpiarForm() {
            this.codigoProducto = '';
            this.precioUnitario = '';
            this.detalle = '';
            this.productoId = '';
            this.cantidad = '';
            this.monto = '';
        },


        enviarForm() {
            if(this.fechaLocal != '' && 
                this.detalle != '' && 
                this.productoId != '' && 
                this.cantidad != 0 && 
                this.sucursalId != '' ){ 
                //validando campos numericos
                if (this.cantidad >= 1 && this.monto != 0 && this.monto >= 1 ) {
                    axios.post('/PeticionEntradas/crear',{
                        Fecha: this.fechaLocal,
                        Detalle: this.detalle,
                        idProducto: this.productoId,
                        Cantidad: this.cantidad,
                        idSucursal: this.sucursalId,
                    })
                    .then(response => {                 
                        //console.log(response.data.mensaje);                 
                        Swal.fire({
                        title: 'Mensaje',
                        icon: 'success',
                        text: response.data.mensaje
                        });
                        this.limpiarForm()
                        location.reload()
                    })
                    .catch(
                        error => console.log(error)
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
        }

        
    },
    computed: {
        callPrecio() {
            return '$'+this.precioUnitario;
        }
    },
    watch: {
        cantidad() {
        if (this.cantidad) {
            if(this.cantidad < 1){
                this.cantidadMinima = true;
            }else { 
            this.cantidadMinima = false; 
            this.monto = this.precioUnitario * this.cantidad;
            }        
        }
        }
    }
}
</script> 