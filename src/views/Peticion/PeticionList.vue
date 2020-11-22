<<template>
    <div>
        <menuComponent></menuComponent>
        <Listado></Listado>
    </div>
</template>

<script>
import Listado from '@/components/Peticiones/listarPeticion.vue'
import menuComponent from '@/components/menus/menuComponent.vue'

export default {
    name: 'PeticionList',
    components: {
        menuComponent,
        Listado
    }
}
</script>