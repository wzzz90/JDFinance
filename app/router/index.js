import Vue from "vue"
import Router from "vue-router";

import Home from "../page/home/index.vue";
import Money from "../page/money/index.vue";
import Ious from "../page/ious/index.vue";
import Raise from "../page/raise/index.vue";
import Mine from "../page/mine/index.vue";
import Layout from "../components/public/layout.vue";

Vue.use(Router)

export default new Router({
    routes: [
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
        
    ]
})
