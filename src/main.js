import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import Vant from 'vant';
import 'vant/lib/index.css';
import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';

Locale.use('en-US', enUS);

Vue.use(Vant);
Vue.use(VueResource)


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')