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
                              <input v-model="sucursal" type="text" class="form-control" disabled="disabled">
                          </div>
                      </div>
                      <br>
                      <div class="form-row">
                          <div class="col">
                              <input v-model="codigoProducto" type="text" class="form-control" placeholder="Codigo de barra ...">
                          </div>
                          <div class="col">
                              <input v-model="nombreProducto" type="text" class="form-control" placeholder="Nombre de producto ...">
                          </div>                         
                      </div>
                      <br>
                      <div class="form-row">
                          <div class="col">
                              <select id="selectProveedor" class="custom-select" @change="ShowSelected()">
                                  <option value="0" selected="selected"> - Seleccione Proveedor - </option>
                                  <option :value="index" v-for="(item, index) in dataProviders" :key="index"> {{item.Nombre}} </option>
                              </select>
                          </div>
                          <div class="col-4">
                              <button @click="redireccionar()" type="button" class="btn btn-info btn-sm" data-dismiss="modal">
                                   + Nuevo
                              </button>
                          </div>
                      </div>
                      <br>
                      <div class="form-row">
                          <div class="col">
                              <input v-model="material" type="text" class="form-control" placeholder="Material">
                          </div>
                          <div class="col">
                              <input v-model.number="precioUnitario" class="form-control" type="number" placeholder="Precio Unitario" min="1" step="0.1"/>
                          </div>
                      </div>
                      <br>
                      <div class="form-row">
                          <div class="col">
                              <textarea v-model="caracteristicas" class="form-control" cols="30" rows="5" placeholder="Carcateristicas ..."></textarea>
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
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                      <label for="cod">Codigo de barra:</label>
                    <input
                    v-model.number="codigoProducto"
                    type="number"
                    class="form-control"
                    id="cod"
                    placeholder="Codigo de barra ..."
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="nom">Nombre producto:</label>
                    <input
                    v-model="nombreProducto"
                    type="text"
                    class="form-control"
                    id="nom"
                    placeholder="Nombre de producto ..."
                  />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <label>Proveedor:</label>
                    <select
                    id="selectProveedor"
                    class="custom-select"
                    @change="ShowSelected()"
                    >
                    <option value="0" selected="selected">
                      - Seleccione Proveedor -
                    </option>
                    <option
                      :value="index"
                      v-for="(item, index) in dataProviders"
                      :key="index"
                    >
                      {{ item.Nombre }}
                    </option>
                  </select>
                  </div>
                </div>
                <div class="col-4">
                    <button @click="goToProvider()" type="button" id="btn-n" class="btn btn-info btn-sm" data-dismiss="modal"> 
                        + Nuevo
                    </button>
                </div>
              </div>
              <br />
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <label for="mat">Material:</label>
                    <input
                    v-model="material"
                    type="text"
                    class="form-control"
                    id="mat"
                    placeholder="Material"
                  />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="pre">Precio Unitario:</label>
                    <input
                    v-model.number="precioUnitario"
                    class="form-control"
                    type="number"
                    id="pre"
                    placeholder="Precio Unitario"
                    min="1"
                    step="0.1"
                  />
                  </div>
                </div>
              </div>
              <br />
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <label for="car">Caracteristicas:</label>
                    <textarea
                    v-model="caracteristicas"
                    class="form-control"
                    cols="30"
                    rows="5"
                    id="car"
                    placeholder="Carcateristicas ..."
                  ></textarea>
                  </div>
                </div>
              </div>
            </form>
            <br />
            <center>
              <div>
                <button
                  @click="enviarForm()"
                  type="submit"
                  class="btn btn-primary mr-4"
                  data-dismiss="modal"
                >
                  Agregar
                </button>
                <button
                  @click="limpiarForm()"
                  type="submit"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
            </center>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import router from 'vue-router'
import axios from '../../config/axios'

export default {
  name: "agregarProducto",
  data() {
    return {
      codigoProducto: "",
      nombreProducto: "",
      sucursal: sessionStorage.getItem('nomSucursal'),
      material: "",
      caracteristicas: "",
      existencias: 0,
      precioUnitario: "",
      datosProveedor: {
        nombreProveedor: "",
        razonSocial: "",
        departamento: "",
        municipio: "",
        descripcion: "",
        telefono: "",
        correo: "",
      },
      dataProviders: [],
      selectedProvider: 0,
    };
  },
  created() {
    this.bringSuppliers();
  },
  methods: {
    bringSuppliers() {
      axios
        .get("/Proveedores/listar")
        .then((response) => {
          this.dataProviders = response.data;
          console.log(this.dataProviders);
        })
        .catch((error) => console.log(error));
    },
    created() {
        this.bringSuppliers();
        this.EsAdminSucursalPrincipal();
    },
    enviarForm() {
      if (
        this.codigoProducto != "" &&
        this.nombreProducto != "" &&
        this.material != "" &&
        this.caracteristicas != "" &&
        this.precioUnitario > 0 &&
        this.datosProveedor.nombreProveedor != "" &&
        this.datosProveedor.correo != "" &&
        this.datosProveedor.razonSocial != "" &&
        this.datosProveedor.telefono != "" &&
        this.datosProveedor.departamento != "" &&
        this.datosProveedor.municipio != 0 &&
        this.datosProveedor.descripcion != ""
      ) {
        axios
          .post("/Productos/crear", {
            CodigoProducto: this.codigoProducto,
            NombreProducto: this.nombreProducto,
            Material: this.material,
            Caracteristicas: this.caracteristicas,
            Existencias: 0,
            Precio_Unitario: this.precioUnitario,
            Nombre: this.datosProveedor.nombreProveedor,
            Razon_Social: this.datosProveedor.razonSocial,
            Departamente: this.datosProveedor.departamento,
            Municipio: this.datosProveedor.municipio,
            Descripcion: this.datosProveedor.descripcion,
            Telefono: this.datosProveedor.telefono,
            Correo: this.datosProveedor.correo,
          })
          .then((response) => {
            //console.log(response.data.mensaje);
            Swal.fire({
              title: "Mensaje",
              icon: "success",
              text: response.data.mensaje,
            });
            this.limpiarForm();
            location.reload();
          })
          .catch((error) => console.log(error));
      } else {
        Swal.fire({
          title: "Campos vacios",
          icon: "info",
          text: "Todos los campos son requeridos.",
        });
      }
    },
    limpiarForm() {
      this.codigoProducto = "";
      this.nombreProducto = "";
      this.material = "";
      this.caracteristicas = "";
      this.existencias = 0;
      this.precioUnitario = "";
      this.nombreProveedor = "";
      this.razonSocial = "";
      this.departamento = "";
      this.municipio = "";
      this.descripcion = "";
      this.telefono = "";
      this.correo = "";
    },
    goToProvider(){
      this.$router.replace({ name: "ProveedorL" });
    }
  },
};
</script>

<style>
.content {
  width: 100%;
  height: 100%;
}
</style>