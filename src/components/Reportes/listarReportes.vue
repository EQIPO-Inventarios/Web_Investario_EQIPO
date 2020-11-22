<template>
  <div class="col-12">
        <br>
        <div class="card">
            <div class="card-header">
                <center><h3>Reportes</h3></center> 
            </div>
            <div class="card-body">

                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn btn-block text-center btn-primary" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Reporte de productos por Proveedor.
                            </button>
                        </h2>
                        </div>

                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                            <report1></report1>
                        </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                            <button class="btn btn-block text-center collapsed btn-primary" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Proximamente #2
                            </button>
                        </h2>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body">
                           
                        </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                            <button class="btn btn-block text-center collapsed btn-primary" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Proximamente #3
                            </button>
                        </h2>
                        </div>
                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                           
                        </div>
                        </div>
                    </div>
                    </div>

            </div>
        </div>

        <!-- 
            <div id="certificate" class="flex items-center justify-center">

            <div class="my-5 lg:my-20 mx-0 p-2 lg:p-5 text-center border-8 border-blue-900 w-full lg:max-w-screen-lg z-10 bg-white">

                <div class="text-center p-5 border-4 border-yellow-600 flex flex-col items-center justify-center" >
                    <div class="flex items-center justify-center my-4 lg:my-2">
                        <div class="text-yellow-600">
                            <svg class="fill-current w-8 lg:h-16 lg:w-16 mr-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        </div>
                    </div>
                    <span class="block text-xl sm:text-2xl uppercase tracking-tighter font-bold text-pink my-6 text-yellow-600">Certificate of Appreciation</span>
                    <span class="block text-md lg:text-xl uppercase font-display font-bold text-blue-900 tracking-tighter my-6">Silton High School awards</span>
                    <span class="block mt-5 text-xl md:text-2xl lg:text-5xl text-pink uppercase text-yellow-600"><b>Emily Bryant</b></span><br/><br/>
                    <span class="block text-md lg:text-xl mt-1 block text-light font-display tracking-wide my-6 text-blue-900">For imparting valuable insights during the 32nd Commencement Ceremony.</span>
                    <div class="flex justify-between mt-20 mb-10 w-3/4">
                        <span class="block border-t-2 border-yellow-600 pt-4">
                            <p class="my-2 text-yellow-600 font-bold tracking-wider">Adora Montminy</p>
                            <p class="text-blue-900 tracking-wide">School Principal</p>
                        </span>
                        <span class="block border-t-2 border-yellow-600 pt-4">
                            <p class="my-2 text-yellow-600 font-bold tracking-wider">Nick Fletcher</p>
                            <p class="text-blue-900 tracking-wide">School Coordinator</p>
                        </span>
                    </div>
                </div>
            </div>
    </div> 
    <button @click="printCertificate()" class="fixed z-10 bg-blue-900 text-white bottom-0 right-0 m-10 py-2 px-4 rounded-full shadow-xl hover:text-yellow-600 focus:outline-none">Print</button>


        -->    
  </div>
</template>

<script>
import router from 'vue-router'
import axios from '../../config/axios'

import report1 from '@/components/Reportes/report1.vue'

export default {
    name: 'listarReportes',
    components: {
        report1
    },
    data() {
        return{
            nomSucursal: sessionStorage.getItem('nomSucursal'),
            sucursalId: sessionStorage.getItem('sucursalId')
        }
    },
    mounted() {
    },
    methods: {
        printCertificate() {
            const printContents = document.getElementById('certificate').innerHTML;
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
    }
}
</script>
