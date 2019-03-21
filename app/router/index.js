import Vue from "vue"
import Router from "vue-router";
import store from '../store';

import Home from "../page/home/index.vue";
import Money from "../page/money/index.vue";
import Ious from "../page/ious/index.vue";
import Raise from "../page/raise/index.vue";
import Mine from "../page/mine/index.vue";
import Layout from "../components/public/layout.vue";
import Login from '../page/auth/login.vue';
import Register from '../page/auth/register.vue';
import Auth from '../page/auth/auth.vue';

Vue.use(Router)

const routes = [
    {
        path: "/",
        name: "",
        component: Layout,
        redirect: '/home',
        children:[
            {
                path: "/home",
                name: "home",
                component: Home,
            },
            {
                path: "/money",
                name: "money",
                component: Money,
            },
            {
                path: "/ious",
                name: "ious",
                component: Ious,
            },
            {
                path: "/raise",
                name: "raise",
                component: Raise,
            },
            {
                path: "/mine",
                name: "mine",
                component: Mine,
            }
        ]
    },
    {
        path: '/login',
        name: "Login",
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Auth
    }
    
]

let router = new Router({
    routes
})

router.beforeEach( (to, from ,next) => {
    // let requiredAuth = !to.path.match(/\/(login|errors|register)/);
    let requiredAuth = !to.path.match(/\/(login|errors|register)/);
    const token = localStorage.getItem('token');
    
    if(requiredAuth) {
        if (!token) {
            //next('/login')
            next();
            store.dispatch('changeLoginAction', false)
        } else {
            store.dispatch('changeLoginAction', true)
            if (to.matched.length === 0) {                                        //如果未匹配到路由
                from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转首页，如果上级能匹配到则转上级路由
            } else {
                next();//如果匹配到正确跳转
            }     
      }    
    } else {
        next()
    }
})

export default router;
