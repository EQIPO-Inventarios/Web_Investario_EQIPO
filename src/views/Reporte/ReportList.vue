<template>
    <div>
        <menuComponent></menuComponent>
        <Listado></Listado>
    </div>
</template>

<script>
import Listado from '@/components/Reportes/listarReportes.vue'
import menuComponent from '@/components/menus/menuComponent.vue'


export default {
    name: 'ReportL',
    components:{
        Listado,
        menuComponent
    }
}
</script>
