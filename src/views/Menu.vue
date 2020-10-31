<template>
  <div>
      <menuComponent></menuComponent>
      <panelGeneral></panelGeneral>
  </div>
</template>

<script>
import menuComponent from '@/components/menus/menuComponent.vue'
import panelGeneral from '@/components/menus/panelGeneral.vue'

export default {
  name: 'Menu',
  components: {
    menuComponent,
    panelGeneral
  },
  data() {
      return {
          permiso: sessionStorage.getItem('permiso') || null,
          pintar: ''
      }
  }
}
</script>