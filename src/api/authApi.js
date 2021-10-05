

import axios from 'axios'


const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyABSwNSpFpO_kMNAM9C1MoiC8hc1xPyJ1I'
    }
})


export default authApi