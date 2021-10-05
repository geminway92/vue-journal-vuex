
export default {

    name: 'auth',
    component: () => import(/* webpackChunkName: "AuthLayout" */ '@/modules/auth/layouts/AuthLayout'),
    children: [
        {
           path: '',
           name: 'login',
           component: () => import(/* webpackChunkName: "Login" */ '@/modules/auth/views/Login.vue'),

        },     
        {
            path: 'register',
            name: 'register',
            component: () => import(/* webpackChunkName: "Register" */ '@/modules/auth/views/Register.vue'),
 
         },     
    ]
}