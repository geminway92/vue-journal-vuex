<template>
    
    <Navbar @hiddenMenuBar="hiddenMenuBar" :hiddenListEntry="hiddenListEntry" :disableBarMenu="disableBarMenu"/>

    <div v-if="isLoading" 
        class="row justify-content-md-center">
        <div class="col-3 alert-info text-center mt-5">
            Espere por favor
            <h3 class="mt-2">
                <i class="fa fa-spin fa-sync"></i>
            </h3>
        </div>
    </div>

    <div v-else 
        class="d-flex" >
        <div v-if="!hiddenListEntry"  class="col-4">
            <EntryList
            @hiddenMenuBar="hiddenMenuBar"
            />
        </div>
        <div v-if="showEntry" class="col">
            <router-view />
        </div>
    </div>
</template>


<script>
import {defineAsyncComponent} from 'vue'
import { mapActions, mapState } from 'vuex'


export default {

    components: {
        Navbar: defineAsyncComponent( () => import('../components/Navbar.vue')),
        EntryList: defineAsyncComponent( () => import('../components/EntryList.vue')),
    },
    data(){
        return{
            hiddenListEntry: false,
            showEntry: true,
            disableBarMenu: false,
        }
    },

    methods: {
        ...mapActions('journal', ['loadEntries']),
        
        hiddenMenuBar() {
            if(screen.width <= 690){
                this.showEntry = !this.showEntry
                this.hiddenListEntry = !this.hiddenListEntry    

            }
        },
        
        // hiddenEntry() {
        //     if(screen.width >= 691){

        //     }
        // },

        hiddenEntryInMobile() {
            if(screen.width <= 690) {
                this.showEntry = false
                this.disableBarMenu = true
                
            }
        },

    },
    computed: {
        ...mapState('journal',['isLoading']),
    },
    created() {
        this.loadEntries()
        this.hiddenEntryInMobile()
    }
    
}
</script>