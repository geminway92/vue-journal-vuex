import { defineAsyncComponent } from 'vue';
<template>
  <div class="entry-title d-flex justify-content-between p-2">
      
      <div>
          <span class="text-success fs-3 fw-bold">15</span>
          <span class="mx-1 fs-3">Julio</span>
          <span class="mx-2 fs-4 fw-light">2021, Jueves</span>
      </div>

      <div>
          <button class="btn btn-danger mx-2">
              Borrar
              <i class="fa fa-trash-alt"></i>
          </button>
         
          <button class="btn btn-primary">
              Subir foto
              <i class="fa fa-trash-alt"></i>
          </button>
      </div>

  </div>

    <hr>
    <div class="d-flex flex-column px-3 h-75">
        <textarea
        placeholder="¿Qué sucedió hoy?">
        </textarea>
    </div>

    <Fab
        icon="fa-save"/>
    <img src="https://phantom-marca.unidadeditorial.es/e6bae7a5560485b2a43b031e8ba425b6/resize/828/f/webp/assets/multimedia/imagenes/2021/08/11/16287186451004.jpg" 
         alt="entry-picture"
         class="img-thumbnail">

</template>

<script>
import {defineAsyncComponent} from 'vue'

export default {

    components: {
        Fab: defineAsyncComponent( () => import('../components/Fab.vue'))
    }
}
</script>

<style lang="scss" scoped>

textarea {
    font-size: 20px;
    border: none;
    height: 100%;
    resize: none;

    &:focus {
        outline: none;
    }

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
       background-color: grey;  /* color of the scroll thumb */
       border-radius: 20px;       /* roundness of the scroll thumb */
       border: 3px solid grey;  /* creates padding around scroll thumb */
}
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);

}


</style>