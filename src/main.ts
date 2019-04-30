import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './main.css';
import {printBirthday, printDate} from '@/utils/dates';

Vue.config.productionTip = false;


Vue.filter('capitalize', (value: any) => {
    if (!value) {
        return '';
    }
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('printBirthday', printBirthday);
Vue.filter('printDate', printDate);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
