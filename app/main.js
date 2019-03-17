import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import ajax from './utils/ajax'
import directives from './directives'
import './css/reset.scss';

Vue.config.productionTip = false
Vue.prototype.$http = ajax;
Vue.use(directives)

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>",
})
/* eslint-enable no-new */
