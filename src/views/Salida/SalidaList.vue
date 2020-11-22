<template>
  <div>
      <menuComponent></menuComponent>
      <Listado></Listado>
  </div>
</template>

<script>
import Listado from '@/components/Salidas/listarSalida.vue'
import menuComponent from '@/components/menus/menuComponent.vue'

export default {
    name: 'SalidaL',
    components: {
        menuComponent,
        Listado
    }

}
</script>

<style>

</style>