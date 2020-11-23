<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
                <br>
                <div class="card">
                    <!-- <div class="card-header">
                        <center>Agregar Proveedor</center> 
                    </div>
                    -->
                    <div class="card-body">
                      <form @submit="enviar_form()">
                        <div class="form-row">
                            <div class="col">
                              <div class="form-group">
                                <label>Nombre:</label>
                                <input v-model="nombre" type="text" class="form-control"  placeholder="Nombre">
                              </div>                              
                            </div>
                            <div class="col">
                              <div class="form-group">
                                <label>Correo:</label>
                                <input v-model="correo" type="email" class="form-control"  placeholder="Correo electronico">
                              </div>                              
                            </div>
                        </div>
                        <div class="form-row"> 
                            <div class="col">
                              <div class="form-group">
                                <label>Razon Social:</label>
                                <input v-model="razonSocial" type="text" class="form-control" placeholder="Razon social">
                              </div>                              
                            </div>
                            <div class="col">
                              <div class="form-group">
                                <label>Telefono:</label>
                                <input v-model="telefono" type="text" class="form-control" placeholder="Telefono">
                              </div>                              
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                              <center>Direccion</center>
                            </div>
                            <div class="card-body">
                                  <div class="form-row"> 
                                      <div class="col">
                                        <div class="form-group">
                                          <label>Departamento:</label>
                                          <select class="custom-select" id="selectDepartamento" @change="ShowSelected()">
                                            <option value="Departamento" selected="selected">-Departamento-</option>
                                            <option v-for="(item, index) in data" :value="index" :key="index">{{item.Departamento}}</option>
                                          </select>
                                        </div>                                        
                                      </div>
                                      <div class="col">
                                        <div class="form-group">
                                          <label>Municipio:</label>
                                            <select v-model="municipio" class="custom-select">
                                            <option value="0" selected="selected">-Municipio-</option>
                                            <option v-for="(item, index) in municipiosArray" :key="index" >{{item}}</option>
                                          </select>
                                        </div>                                        
                                      </div>                                      
                                  </div>
                                  <div class="form-row">
                                      <div class="col"> 
                                          <div class="col">
                                            <div class="form-group">
                                              <label>Descripcion:</label>
                                              <input v-model="descripcion" type="text" class="form-control" placeholder="Descripcion">
                                            </div>        
                                          </div>
                                      </div>
                                  </div>
                            </div>
                        </div>
                      </form>
                      <br>
                      <center>
                        <div>
                          <button v-on:click="enviar_form()" type="submit" class="btn btn-primary mr-4" data-dismiss="modal">Enviar</button>
                          <button v-on:click="limpiar_form()" type="submit" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
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
    name: 'agregarProveedor',
    data() {
        return{
            nombre: '',
            razonSocial: '',
            departamento: '',
            municipio: 0,
            descripcion: '',
            telefono: '',
            correo: '',
            data: [],
            indiceDepartamento: 0,
            municipiosArray : []
            
        }
    },
    mounted() {
            this.dataProvider();
    },
    methods: {
      enviar_form() {
          if (this.nombre != '' && this.correo != '' && this.razonSocial != '' && this.telefono != '' && this.departamento != '' && this.municipio != 0 && this.descripcion != '') {            
              axios.post('/Proveedores/crear',{
                  Nombre : this.nombre,
                  Razon_Social : this.razonSocial,
                  Departamento : this.departamento,
                  Municipio : this.municipio,
                  Descripcion : this.descripcion,
                  Telefono : this.telefono,
                  Correo : this.correo,
              })
              .then(response => {                 
                  //console.log(response.data.mensaje);                 
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
                  title: 'Campos vacios',
                  icon: 'info',
                  text: 'Todos los campos son requeridos.'
              });
          } 
      },
      limpiar_form() {
          this.nombre = '';
          this.correo = '';
          this.razonSocial = '';
          this.telefono = '';
          this.departamento = '';
          this.municipio = 0;
          this.descripcion = '';
      },
      ShowSelected() {
          /* Para obtener el valor id para el selectbox de municipios*/
          var cod = document.getElementById("selectDepartamento").value;
          this.indiceDepartamento = cod;
          this.municipiosArray = this.data[this.indiceDepartamento].Municipios
          /* Para obtener el texto */
          var combo = document.getElementById("selectDepartamento");
          var selected = combo.options[combo.selectedIndex].text;      
          this.departamento = selected;
      },
      dataProvider() {
          axios.get('/Departamentos/listar')
            .then(response => {
                this.data = response.data;
                console.log(this.data);
            })
            .catch(
                 error => console.log(error)
            )
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