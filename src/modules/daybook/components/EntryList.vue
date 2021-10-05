<template>
  <div class="entry-list-container ">
    <div class="px-2 pt-2">
      <input 
         type="text"
         class="form-control"
         placeholder="Buscar entrada"
         v-model="term">
    </div>
    
    <div class="mt-2 d-flex flex-column">
      <button class="btn btn-primary mx-3"
        @click="$router.push({ name: 'entry', params: { id: 'new' } }); closeListEntry()">
        <i class="fa fa-plus-circle"></i>
        Nueva entrada
      </button>
    </div>

    <div class="entry-scrollarea">
      <Entry
        v-for="entry in entriesByTerm"
        :key="entry.id"
        :entry="entry"
        @closeListEntry="closeListEntry"
      />
    
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'


export default {
    components: {
      Entry: defineAsyncComponent( () => import('./Entry.vue'))
    },
    props: {
      
      showEntry: {
        type: Boolean
      },
      
  
    },

    computed: {
      ...mapGetters( 'journal', ['getEntriesByTerm']),
      entriesByTerm() {
        return this.getEntriesByTerm( this.term )
      }
    },
    data() {
      return {
        term: '',
        
      }
      
    },
    methods: {
    closeListEntry() {
      this.$emit('hiddenMenuBar')
    }
  }  
    
}
  

</script>

<style lang="scss" scoped>

.entry-list-container {
    border-right: 1px solid #2c3e50;
    height: 100%;
}

.entry-scrollarea { 
    height: calc( 100vh - 110px );
    overflow: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
    width: 5px;
  }

    &::-webkit-scrollbar-thumb {
    background-color: grey; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 3px solid grey; /* creates padding around scroll thumb */
  }
}

@media screen and (max-width: 690px) {
  .entry-list-container {
    width: 100vw;
  }
}
</style>
