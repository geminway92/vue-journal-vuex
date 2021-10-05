<template>
    <nav class="navbar bg-primary">
        <a class="navbar-brand text-white">
                 
            <img src="../../../assets/expandleft_120123.png" 
            alt="icon-expandleft" 
            @click="this.$emit('hiddenMenuBar')"
            :class="[ !disableBarMenu ? 'closeMenu' : hiddenListEntry ? 'icon-expandright' : 'icon-expandleft']"
             >
             {{ username }}
            
        </a>
        <div class="d-flex botton-onLogout">
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

.navbar-brand {
    margin-left: 15px;
}

i {
    cursor: pointer;
}

.closeMenu {
    display: none;
}

.icon-expandleft,
.icon-expandright {
    width: 1.9em;
    border: 1px solid #0dcaf0;
    border-radius: 5px;
}

.icon-expandright {
 transform: rotate(180deg);
}

@media screen and (max-width: 690px) {
 nav.navbar {
    display: flex;
    justify-content: flex-end
 }
.icon-expandleft,
.icon-expandright {
    width: 12%;

}

.botton-onLogout {
    position: relative;
    bottom: 40px;
}

}

</style>