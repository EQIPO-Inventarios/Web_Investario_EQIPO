<template>
  <div class="content">
      <div class="row">
        <div class="col-12">
          <br>
          <div class="card">
              <div class="card-body">
                  <form @submit.prevent="enviarForm()">
                      <div class="form row">
                          <div class="col">
                              <div class="form-group">
                                  <label>Sucursal:</label>
                                  <input v-model="sucursal" type="text" class="form-control" disabled="disabled">
                              </div>
                          </div>
                      </div>
                      <div class="form-row">
                          <div class="col">
                              <div class="form-group">
                                  <label>Codigo de barra:</label>
                                  <input v-model="codigoProducto" type="text" class="form-control" placeholder="Codigo de barra ...">
                              </div>
                          </div>
                          <div class="col">
                              <div class="form-group">
                                  <label>Nombre de Producto:</label>
                                  <input v-model="nombreProducto" type="text" class="form-control" placeholder="Nombre de producto ...">
                              </div>
                          </div>                         
                      </div>
                      <div class="form-row">
                          <div class="col">
                              <div class="form-group">
                                  <label>Proveedor:</label>
                                  <select id="selectProveedor" class="custom-select" @change="ShowSelected()">
                                      <option value="0" selected="selected"> - Seleccione Proveedor - </option>
                                      <option :value="index" v-for="(item, index) in dataProviders" :key="index"> {{item.Nombre}} </option>
                                  </select>
                              </div>
                          </div>
                          <div class="col-4">
                              <button @click="redireccionar()" type="button" class="btn btn-info btn-sm" data-dismiss="modal">
                                   + Nuevo
                              </button>
                          </div>
                      </div>
                      <div class="form-row">
                          <div class="col">
                              <div class="form-group">
                                  <label>Material:</label>
                                  <input v-model="material" type="text" class="form-control" placeholder="Material">
                              </div>
                          </div>
                          <div class="col">
                              <div class="form-group">
                                  <label>Precio Unitario:</label>
                                  <input v-model.number="precioUnitario" class="form-control" type="number" placeholder="Precio Unitario" min="1" step="0.1"/>
                              </div>
                          </div>
                      </div>
                      <div class="form-row">
                          <div class="col">
                              <div class="form-group">
                                  <label>Caracteristicas:</label>
                                  <textarea v-model="caracteristicas" class="form-control" cols="30" rows="5" placeholder="Carcateristicas ..."></textarea>
                              </div>
                          </div>
                      </div>
                  </form>
                  <br>
                      <center>
                        <div>
                          <button @click="enviarForm()"  type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Agregar</button>
                          <button @click="limpiarForm()" type="submit" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        </div>
                      </center>
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
    name: 'agregarProducto',
    data() {
        return {
            codigoProducto: '',
            nombreProducto: '',
            sucursal: '',
            material: '',
            caracteristicas: '',
            existencias: 0,
            precioUnitario: '',
            datosProveedor: {
                nombreProveedor: '',
                razonSocial: '',
                departamento: '',
                municipio: '',
                descripcion: '',
                telefono: '',
                correo: ''
            },
            dataProviders: [],
            selectedProvider: 0
        }
    },
    created() {
        this.bringSuppliers();
        this.EsAdminSucursalPrincipal();
    },
    methods: {
        bringSuppliers() {
            axios.get('/Proveedores/listar')
            .then(response => {
                    this.dataProviders = response.data;
                    console.log(this.dataProviders);
            })
            .catch(
                    error => console.log(error)
            );
        },
        ShowSelected() {
          /* Para obtener el valor id para el selectbox de municipios*/
          var indice = document.getElementById("selectProveedor").value;
          this.selectedProvider = indice;
          var datos = this.dataProviders[this.selectedProvider];
          console.log(datos);
          /* hago el binding hacia las variables locales */
            this.datosProveedor.nombreProveedor = datos.Nombre;
                this.datosProveedor.razonSocial = datos.Razon_Social;
                this.datosProveedor.departamento = datos.Contacto.Direccion.Departamento;
                this.datosProveedor.municipio = datos.Contacto.Direccion.Municipio;
                this.datosProveedor.descripcion = datos.Contacto.Direccion.Descripcion;
                this.datosProveedor.telefono = datos.Contacto.Telefono;
                this.datosProveedor.correo = datos.Contacto.Correo;
          //var combo = document.getElementById("selectDepartamento");
          //var selected = combo.options[combo.selectedIndex].text;      
          //this.departamento = selected;
        },
        enviarForm() {
          if (this.codigoProducto != '' && this.nombreProducto != '' && this.material != '' && this.caracteristicas != '' && this.precioUnitario > 0 && this.datosProveedor.nombreProveedor != '' && this.datosProveedor.correo != '' && this.datosProveedor.razonSocial != '' && this.datosProveedor.telefono != '' && this.datosProveedor.departamento != '' && this.datosProveedor.municipio != 0 && this.datosProveedor.descripcion != '') {            
              axios.post('/Productos/crear',{
                  CodigoProducto: this.codigoProducto,
                  NombreProducto: this.nombreProducto,
                  Material: this.material,
                  Caracteristicas: this.caracteristicas,
                  Existencias: 0,
                  Precio_Unitario: this.precioUnitario,
                  Nombre : this.datosProveedor.nombreProveedor,
                  Razon_Social : this.datosProveedor.razonSocial,
                  Departamente : this.datosProveedor.departamento,
                  Municipio : this.datosProveedor.municipio,
                  Descripcion : this.datosProveedor.descripcion,
                  Telefono : this.datosProveedor.telefono,
                  Correo : this.datosProveedor.correo,
              })
              .then(response => {                 
                  //console.log(response.data.mensaje);                 
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
                  error => console.log(error)
              )
          }
          else{
              Swal.fire({
                  title: 'Campos vacios',
                  icon: 'info',
                  text: 'Todos los campos son requeridos.'
              });
          } 
        },
        limpiarForm() {
            this.codigoProducto = '';
            this.nombreProducto = '';
            this.sucursal = 'Sucursal central';
            this.material = '';
            this.caracteristicas = '';
            this.existencias = 0;
            this.precioUnitario = '';
            this.nombreProveedor = '';
            this.razonSocial = '';
            this.departamento = '';
            this.municipio = '';
            this.descripcion = '';
            this.telefono = '';
            this.correo = '';
        },
        redireccionar() {
            this.$router.replace({ name: "ProveedorL" });
        },
        EsAdminSucursalPrincipal() {
            if(sessionStorage.getItem('nomSucursal') == 'Sucursal Principal') {
            this.sucursal =  sessionStorage.getItem('nomSucursal');
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