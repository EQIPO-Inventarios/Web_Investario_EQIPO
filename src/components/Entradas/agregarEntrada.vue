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
                      <button @click="buscar()" class="btn btn-primary btn-sm" type="submit">Buscar</button>
                    </div>
                  </div>  
                  <br>
                  <div v-if="nombreProducto != '' && nombreProveedor != '' && precio != '' "> <!-- SINO INGRESA CODIGO DE BARRA NO SE MOSTRARA-->
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
                              <input @keyup="calcularMonto()" v-model="monto" type="number" min="1" class="form-control" disabled="disabled">
                          </div>
                       </div>
                       <div class="col"></div>
                    </div>
                    <div class="form-row">
                      <div class="col">
                          <div class="form-group">
                              <label for="nompro">Detalle:</label>
                              <textarea v-model="detalle" class="form-control" cols="30" rows="5" placeholder="Carcateristicas ..."></textarea>
                          </div>
                       </div>
                    </div>
                    <div class="form-row">
                      <div class="col">
                          <div class="form-group">
                              <label for="selectEstante">Numero Estanteria:</label>
                              <input v-model.number="estante" id="selectEstante" type="number" min="1" :max="numEstanteria" class="form-control" required="required">
                              <p v-if="minEst" class="wd-2 bg-danger text-white">El menor estante es: 1</p>
                              <p v-if="maxEst" class="wd-2 bg-danger text-white">El maximo de estante es: {{numEstanteria}}</p>
                          </div>
                      </div>
                      
                      <div class="col">
                          <div class="form-group">
                              <label for="x">Eje X:</label>
                              <input v-model.number="x" id="x" type="number" min="1" max="6" class="form-control" required="required">
                              <p v-if="minX" class="wd-2 bg-danger text-white">El menor es: 1</p>
                              <p v-if="maxX" class="wd-2 bg-danger text-white">El maximo es: 6</p>
                          </div>
                      </div>
                      <div class="col">
                          <div class="form-group">
                              <label for="y">Eje Y:</label>
                              <input v-model.number="y" id="y" type="number" min="1" max="4" class="form-control" required="required">
                              <p v-if="minY" class="wd-2 bg-danger text-white">El menor es: 1</p>
                              <p v-if="maxY" class="wd-2 bg-danger text-white">El maximo es: 4</p>
                          </div>
                      </div>
                    </div>
                  </div>
              </form>   
              <br>
              <div v-if="nombreProducto != '' && nombreProveedor != '' && precio != '' ">
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
  name: 'agregarEntrada',
  data() {
    return{
        codigoBarra: '',
        precio: 0,
        //variables a enviar
        fechaActual: '',
        detalle: '',
        productoId: '',
        cantidad: 0,
        monto: 0,
        numBodega: 0,
        numEstanteria: 0,
          largo: 0,
          ancho: 0,
        estante: 1,
          x: 1,
          y: 1,

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
        minCant: false,
        maxEst: false,
        minEst: false,
        maxX: false,
        minX: false,
        maxY: false,
        minY: false
    }
  },
  mounted() {
    this.obtenerFecha();
    this.obtenerProductosL();
    this.obtenerSucursal();
  },
  methods: {
      obtenerFecha() {
        var f = new Date();
        this.fechaActual = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
      },
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
      obtenerSucursal() {
          axios.get(`/Sucursales/buscar/${this.sucursalId}`)
          .then(response => {
                this.dataSucursal = response.data;
                console.log(this.dataSucursal);
                this.numBodega = this.dataSucursal.Bodega[0].NumeroBodega;
                this.numEstanteria = this.dataSucursal.Bodega[0].Estanterias;
                this.largo = this.dataSucursal.Bodega[0].Largo;
                this.ancho = this.dataSucursal.Bodega[0].Ancho; 
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
        this.estante = '';
          this.x = '';
          this.y = '';
      },
      enviarForm() {
          if(this.fechaActual != '' && this.detalle != '' && 
             this.productoId != '' && 
             this.cantidad != 0 && 
             this.monto != 0 && 
             this.sucursalId != '' && 
             this.numBodega != 0 && 
             this.Estanterias != 0 && 
             this.largo != 0 && 
             this.ancho != 0 && 
             this.estante != 0 && 
             this.x != 0 && 
             this.y != 0){ 
               //validando campos numericos
               if (this.cantidad >= 1 && this.monto != 0 && this.monto >= 1 && this.estante >= 1 && this.estante <= this.numEstanteria && this.x >= 1 && this.x <= 6 && this.y >= 1 && this.y <= 4) {
                  axios.post('/Entradas/crear',{
                      Fecha: this.fechaActual,
                      Detalle: this.detalle,
                      idProducto: this.productoId,
                      Cantidad: this.cantidad,
                      Monto: this.monto,
                      idSucursal: this.sucursalId,
                      NumeroBodega: this.numBodega,
                      Estanterias: this.numEstanteria,
                      Largo: this.largo,
                      Ancho: this.ancho,
                      Estanteria: this.estante,
                      X: this.x,
                      Y: this.y
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
    cantidad() {
      if (this.cantidad) {
        if(this.cantidad < 1){
            this.minCant = true;
        }else { 
          this.minCant = false; 
          this.monto = this.precio * this.cantidad;
        }        
      }
    },
    estante() {
      if(this.estante) {
              if (this.estante < 1) {
                this.minEst = true;
              }else { this.minEst = false; }


              if (this.estante > 100) {
                this.maxEst = true;
              }else { this.maxEst = false; }
          }
    },
    x() {
      if(this.x) {
              if (this.x < 1) {
                this.minX = true;
              }else { this.minX = false; }


              if (this.x > 6) {
                this.maxX = true;
              }else { this.maxX = false; }
          }
    },
    y() {
      if(this.y) {
              if (this.y < 1) {
                this.minY = true;
              }else { this.minY = false; }


              if (this.y > 4) {
                this.maxY = true;
              }else { this.maxY = false; }
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