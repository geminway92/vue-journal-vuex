<template>
    <nav class="navbar bg-primary">
        <button class="navbar-brand text-white">
                 
            <img src="../../../assets/expandleft_120123.png" 
            alt="icon-expand" 
            @click="this.$emit('hiddenMenuBar')"
            class="icon-arrow"
            :class="[ hiddenListEntry ? 'icon-expandright' : 'icon-expandleft']"
             >
            
        </button>
        <h2> {{ username }}</h2>
        <div class="d-flex button-onLogout">
            <button @click="onLogout" class="btn btn-outline-info mx-2">
                <i class="fa fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import useAuth from '@/modules/auth/composables/useAuth'


export default {
    props: {
        disableBarMenu: {
            type: Boolean
        },
        hiddenListEntry: {
            type: Boolean,
            default: false
        }
    },

    setup() {
        
        const router = useRouter()
        const { username, logout } = useAuth()
    
        
   

        return {
            username,
            onLogout: () => { 
                router.push({ name: 'login' })
                logout()
            },
        }
        
    }
    
}
</script>

<style scoped>

.navbar {
    display: flex;
    justify-content: space-between;
    
}

.navbar-brand {
    margin-left: 15px;
    display: none;
}

h2 {
    color: white;
    font-size: 1.2em;
    font-weight: normal;
    margin-left: .4em;
}

button {
    background-color: transparent;
    width: 42px;
    height: 38px;
    border: 1px solid #0dcaf0;
    border-radius: 5px;
    cursor: pointer;
}


img.icon-arrow {
    width: 1.1em;
    margin:  .1em 1em .4em 0;
    
}

.closeMenu {
    display: none;
}

.icon-expandleft,
.icon-expandright {
    width: 1.9em;
    
}


.icon-expandright {
 transform: rotate(180deg);
}


@media screen and (max-width: 690px) {
    nav.navbar {
        height: min-content;
    }

    h2 {
        position: absolute;
        bottom: .5em;
        left: 3em;
    }

    
    .navbar-brand {
        display: inline-flex;
       
    }

    .button-onLogout {
        position: absolute;
        bottom: .5em;
        right: 0;
    }
    
}

</style>