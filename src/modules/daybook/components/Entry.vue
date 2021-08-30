<template>
  <div class="entry-container mb-3 pointer p-2"
       @click="$router.push({ name: 'entry', params: { id: 10} })">
      
      <!-- Título -->
      <div class="entry-title d-flex">
          <span class="text-success fs-5 fw-bold">15</span>
          <span class="mx-1 fs-5">Julio</span>
          <span class="mx-2 fw-light">2021, Jueves</span>
      </div>
      
      <div class="entry-description">
        Amet sint duis dolor velit dolore. Voluptate quis nisi magna eu. In nostrud incididunt commodo cillum laboris laborum ea. Mollit ad ex fugiat in labore proident nostrud laborum deserunt consequat deserunt. Minim culpa laborum proident sint consequat voluptate irure nostrud sit. Sunt aliquip veniam labore Lorem. Non incididunt incididunt Lorem eiusmod deserunt ex irure nulla labore veniam Lorem sint.
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

      &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
      }
}

.entry-description {
  font-size: 12px;
}
</style>