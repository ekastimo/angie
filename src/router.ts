import Vue from 'vue';
import Router from 'vue-router';
import Home from './modules/base/Home.vue';
import Contacts from './modules/contacts/Contacts.vue';
import Locations from './modules/chc-locations/locations.vue';
import CellGroups from './modules/chc-cellgroups/cell-groups.vue';
import Events from './modules/events/card-list.vue';
import Details from './modules/events/details.vue';
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
        },
        {
            path: localRoutes.locations,
            name: 'locations',
            component: Locations,
        },
        {
            path: localRoutes.cellGroups,
            name: 'cellGroups',
            component: CellGroups,
        },
        {
            path: localRoutes.events,
            name: 'events',
            component: Events,
        },
        {
            path: localRoutes.eventsDetails,
            name: 'eventsDetails',
            component: Details,
        }
    ],
});

export default router;
