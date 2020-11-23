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
                      <div class="form-row" v-if="cambiarProveedor == false">
                        <div class="col">
                            <div class="form-group">
                                <label>Proveedor:</label>
                                <input v-model="datosProveedor.nombreProveedor" type="text" class="form-control" disabled="disabled">
                            </div>
                        </div> 
                      </div>
                      <div class="form-row">
                          <div class="col">
                              <div class="custom-control custom-checkbox mr-sm-2">
                                <input v-model="cambiarProveedor" type="checkbox" class="custom-control-input" id="check">
                                <label class="custom-control-label" for="check"> <small class="text-danger">cambiar proveedor.</small></label>
                              </div>
                          </div>
                      </div>
                      <br>
                      <div class="form-row" v-if="cambiarProveedor">
                          <div class="col">
                            <div class="form-group">
                                <label>Proveedor:</label>
                                <select id="selectProveedor" class="custom-select" @change="ShowSelected()">
                                  <option value="0" selected="selected"> - Seleccione Proveedor - </option>
                                  <option :value="index" v-for="(item, index) in dataProviders" :key="index"> {{item.Nombre}} </option>
                                </select>
                            </div>
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
                          <button @click="enviarForm()" type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Editar</button>
                          <button @click="cancelar()" type="submit" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
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
    name: 'editarProducto',
    props: {
        dataProduct: { Object }
    },
    data() {
        return {
            id: '',
            codigoProducto: '',
            nombreProducto: '',
            sucursal: sessionStorage.getItem('nomSucursal'),
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
            selectedProvider: 0,
            mostrarDatos: false,
            cambiarProveedor: false
        }
    },
    created() {
        this.bringSuppliers();
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
              axios.put('/Productos/actualizar',{
                  id: this.id,
                  CodigoProducto: this.codigoProducto,
                  NombreProducto: this.nombreProducto,
                  Material: this.material,
                  Caracteristicas: this.caracteristicas,
                  Existencias: this.existencias,
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
                  this.cambiarProveedor = false;
                  location.reload()
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
        cancelar() {
            this.cambiarProveedor = false;
        }
    },
    watch: {
        dataProduct(){
            if (this.dataProduct) {
                this.id = this.dataProduct._id;
                this.codigoProducto = this.dataProduct.CodigoProducto;
                this.nombreProducto = this.dataProduct.NombreProducto;
                this.datosProveedor.nombreProveedor = this.dataProduct.Proveedor.Nombre;
                this.material = this.dataProduct.Material;
                this.precioUnitario = this.dataProduct.Precio_Unitario;
                this.caracteristicas = this.dataProduct.Caracteristicas;
                this.existencias =  this.dataProduct.Existencias;

                this.datosProveedor.razonSocial = this.dataProduct.Proveedor.Razon_Social;
                this.datosProveedor.correo = this.dataProduct.Proveedor.Contacto.Correo;
                this.datosProveedor.departamento = this.dataProduct.Proveedor.Contacto.Direccion.Departamento;
                this.datosProveedor.municipio = this.dataProduct.Proveedor.Contacto.Direccion.Municipio;
                this.datosProveedor.telefono = this.dataProduct.Proveedor.Contacto.Telefono;
                this.datosProveedor.descripcion = this.dataProduct.Proveedor.Contacto.Direccion.Descripcion;
            }
        }
    }
}
</script>
