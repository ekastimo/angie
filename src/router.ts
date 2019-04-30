import Vue from 'vue';
import Router from 'vue-router';
import Home from './modules/base/Home.vue';
import Contacts from './modules/contacts/Contacts.vue';
import ContactDetails from './modules/contacts/details/contact-details.vue';
import {localRoutes} from '@/data/constants';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: localRoutes.contacts,
            name: 'contacts',
            component: Contacts,
        },
        {
            path: localRoutes.contactsDetails,
            name: 'contactsDetails',
            component: ContactDetails,
        }
    ],
});

export default router;
