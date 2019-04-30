import Vue from 'vue';
import {get, search} from '@/utils/ajax';
import {remoteRoutes} from '@/data/constants';
import {IContact} from '@/modules/contacts/types';
import {parseAvatar, renderName, safeGet} from '@/utils/helpers';

export const fetchContacts = 'fetchContacts';
export const fetchContact = 'fetchContact';
export const createContact = 'createContact';
export const updateContact = 'updateContact';

export const handleContacts = 'handleContacts';
export const handleContact = 'handleContact';
export const contactActions = {
    fetchContacts, fetchContact, handleContacts, handleContact
};

export const mutations = {
    [handleContacts](state: any, payload: any = []) {
        state.data = payload;
    },
    [handleContact](state: any, payload: any = []) {
        const index = state.details.findIndex((it: any) => it.id === payload.id);
        if (index >= 0) {
            console.log('Updated rec', payload.id);
            Vue.set(state.details, index, payload);
        } else {
            console.log('Added rec', payload.id);
            state.details.push(payload);
        }
    }
};

export const actions = {
    [fetchContacts]({commit}: any, payload: any) {
        search(remoteRoutes.contacts, payload, response => {
            const fine = response.map(processContact);
            commit(handleContacts, fine);
        });
    },
    [fetchContact]({commit}: any, payload: string) {
        const url = `${remoteRoutes.contactById}/${payload}`;
        get(url, response => {
            commit(handleContact, response);
        });
    }
};

const processContact = (contact: IContact) => {
    const {avatar} = contact.person;
    const {id, person, emails: [email], phones: [phone], churchLocation, cellGroup} = contact;
    return {
        id,
        avatar, churchLocation, cellGroup,
        altAvatar: parseAvatar(renderName(contact.person)),
        fullName: renderName(person),
        email: safeGet(email, 'address'), phone: safeGet(phone, 'number')
    };
};

export const getters = {
    getContactById: (state: any) => (id: string) => {
        console.log('Getting contact', id);
        return state.details.filter((it: any) => it.id === id)[0];
    }
};

export default {
    state: {
        isLoading: false,
        data: [],
        details: []
    },
    mutations,
    actions,
    getters
};



