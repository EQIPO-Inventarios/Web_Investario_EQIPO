<template>
  <div>
      <menuComponent></menuComponent>
      <Listado></Listado>
  </div>
</template>
<script>
import Listado from '@/components/Proveedores/listarProveedor.vue'
import menuComponent from '@/components/menus/menuComponent.vue'

export default {
    name: 'ProveedorL',
    components: {
        menuComponent,
        Listado
    }


}
</script>

<style>

</style>