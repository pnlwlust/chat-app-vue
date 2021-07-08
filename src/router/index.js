import Login from '../components/Login.vue'
import Home from "@/pages/Home";
import {createRouter, createWebHashHistory} from "vue-router";
import NewRecord from "@/components/NewRecord";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        hidden:true,
        component: Login
    },
    {
        path: '/new-record',
        name: 'NewRecord',
        component: NewRecord
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
    },
/*
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
*/
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router

export function resetRouter(){
   router.push("/")
}
/*
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.getters.isLoggedIn;

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});*/
