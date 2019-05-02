import Vue from 'vue';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
    theme: {
        primary: '#673ab7',
        secondary: '#3f51b5',
        accent: '#2196f3',
        error: '#03a9f4',
        warning: '#00bcd4',
        info: '#009688',
        success: '#4caf50'
    },
    iconfont: 'mdi',
});
