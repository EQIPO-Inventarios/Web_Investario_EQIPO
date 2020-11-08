<template>
  <div class="col-12">
      <div class="row">
        <div class="col-12">
          <br>
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="enviarForm()">
                  <div class="form-row">
                    <div class="col">
                        <input v-model="fechaActual" type="text" disabled="disabled" class="form-control">
                    </div>
                    <div class="col"></div>
                    <div class="col">
                      <input v-model="nombreSucursal" type="text" class="form-control" disabled="disabled">
                    </div>
                  </div>
                  <br>
                  <div class="form-row">                    
                    <div class="col-8">
                        <input v-model.number="codigoBarra" type="number" class="form-control" placeholder="Ingrese codigo de barra" required="required">
                        <div v-if="codigoBarra != '' " class="wd bg-success text-white"> Ok valido!</div>
                    </div>
                    <div class="col">
                      <button @click="buscar()" class="btn btn-primary btn-sm" type="button">Buscar</button>
                    </div>
                  </div>  
                  <br>
                  <div> 
                    <div class="form-row">
                       <div class="col">
                          <div class="form-group">
                              <label for="nompro">Nombre producto:</label>
                              <input v-model="nombreProducto" type="text" id="nompro" class="form-control" disabled="disabled">
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
                              <p v-if="minCant" class="wd-2 bg-danger text-white"> Cantidad mayor o igual a 1</p>
                          </div>
                       </div>
                       <div class="col">
                          <div class="form-group">
                              <label for="nompro">Monto:</label>
                              <input @keyup="calcularMonto()" v-model="monto" type="text" class="form-control" disabled="disabled">
                          </div>
                       </div>
                       <div class="col"></div>
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
              <div>
                <center>
                        <button @click="enviarForm()" type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Agregar</button>
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
  name: 'editarEntrada',
  props: {
      dataEntrada: { Object }
  },
  data() {
    return{
        codigoBarra: '',
        precio: 0,
        //variables a enviar
        id: '',
        fechaActual: '',
        detalle: '',
        productoId: '',
        cantidad: '',
        monto: 0,

        //variables para obtener data
        dataProductos: [],
        dataSucursal: [],
        nombreSucursal: sessionStorage.getItem('nomSucursal'), //este vendra incluido en el login, ahorita esta quemado 
        sucursalId: sessionStorage.getItem('sucursalId'), //este vendra incluido en el login, ahorita esta quemado


        //variables de relleno para mostrar informacion.
        Producto: [],
        nombreProveedor: '',
        nombreProducto: '',

        //validaciones de max y min estante
        minCant: false
    }
  },
  mounted() {
    this.obtenerProductosL();
  },
  methods: {
      obtenerProductosL() {
          axios.get('/Productos/listar')
          .then(response => {
                this.dataProductos = response.data;
                console.log(this.dataProductos);
          })
          .catch(
                error => console.log(error)
          );
      },
      buscar() {
        if(this.codigoBarra != '') {
          for(let producto of this.dataProductos) {
            if(producto.CodigoProducto == this.codigoBarra) {
                this.nombreProducto = producto.NombreProducto;
                this.productoId = producto._id;
                this.precio = producto.Precio_Unitario;
                this.nombreProveedor = producto.Proveedor.Nombre;
            }
          }
        }
      },
      limpiarForm() {
        this.codigoBarra = '';
        this.precio = '';
        this.detalle = '';
        this.productoId = '';
        this.cantidad = '';
        this.monto = '';
      },
      enviarForm() {
          if(this.id != '' && 
             this.detalle != '' && 
             this.productoId != '' && 
             this.cantidad != 0 && 
             this.monto != 0 ){ 
               //validando campos numericos
               if (this.cantidad >= 1 && this.monto != 0 && this.monto >= 1 ) {
                  axios.put('/Entradas/actualizar',{
                      id: this.id,
                      Detalle: this.detalle,
                      Cantidad: this.cantidad,
                      Monto: this.monto,
                      idProducto: this.productoId
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
      return '$'+this.precio;
    }
  },
  watch: {
    dataEntrada() {
        if (this.dataEntrada) {
            this.id = this.dataEntrada._id;
            this.fechaActual = this.dataEntrada.Fecha;            
            this.cantidad = this.dataEntrada.Cantidad;
            this.monto = this.dataEntrada.Monto;
            this.detalle = this.dataEntrada.Detalle;
            this.productoId = this.dataEntrada.idProducto;
            this.sucursalId = this.dataEntrada.idSucursal;

        }
    },
    productoId() {
        if (this.productoId) {
            for(let producto of this.dataProductos) {
                if (producto._id == this.productoId) {
                    this.codigoBarra = producto.CodigoProducto;
                    this.nombreProducto = producto.NombreProducto;
                    this.precio = producto.Precio_Unitario;
                    this.nombreProveedor = producto.Proveedor.Nombre;
                    this.monto = this.precio * this.cantidad;
                }
            }
        }
    },
    cantidad() {
      if (this.cantidad) {
        if(this.cantidad < 1){
            this.minCant = true;
        }else { 
          this.minCant = false; 
          this.monto = this.precio * this.cantidad;
        }        
      }
    }

  }
}
</script>

<style>
.wd {
  width: 80px;
  border-radius: 5px;
}
.wd-2 {
  width: auto;
  border-radius: 5px;
}
</style>