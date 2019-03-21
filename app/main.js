import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import ajax from './utils/ajax'
import MintUI from 'mint-ui'
import directives from './directives'
import store from './store';
import './css/reset.scss';
import 'mint-ui/lib/style.css';
Vue.use(MintUI)

Vue.config.productionTip = false
Vue.prototype.$http = ajax;
Vue.use(directives)

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>",
})
/* eslint-enable no-new */
