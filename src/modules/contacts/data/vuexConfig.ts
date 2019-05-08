import Vue from 'vue';
import {get, search} from '@/utils/ajax';
import {remoteRoutes} from '@/data/constants';
import {IContact} from '@/modules/contacts/types';
import {parseAvatar, renderName, safeGet} from '@/utils/helpers';

export const fetchAll = 'fetchAll';
export const fetchAllStart = 'fetchAllStart';
export const fetchAllSuccess = 'fetchAllSuccess';
export const fetchAllError = 'fetchAllError';

export const fetchDetails = 'fetchDetails';
export const fetchDetailsStart = 'fetchDetailsStart';
export const fetchDetailsSuccess = 'fetchDetailsSuccess';
export const fetchDetailsError = 'fetchDetailsError';


export const contactActions = {
    fetchAll, fetchDetails
};

export const mutations = {

    [fetchAllStart](state: any) {
        state.isLoadingData = true;
        state.error = undefined;
    },
    [fetchAllError](state: any, error: string) {
        state.isLoadingData = false;
        state.error = error;
    },
    [fetchAllSuccess](state: any, payload: any = []) {
        state.data = payload;
        state.isLoadingData = false;
        state.error = undefined;
    },

    [fetchDetailsStart](state: any) {
        state.isLoadingDetails = true;
        state.error = undefined;
    },
    [fetchDetailsError](state: any, error: string) {
        state.isLoadingDetails = false;
        state.error = error;
    },
    [fetchDetailsSuccess](state: any, payload: any = []) {
        const index = state.details.findIndex((it: any) => it.id === payload.id);
        if (index >= 0) {
            Vue.set(state.details, index, payload);
        } else {
            state.details.push(payload);
        }
        state.isLoadingDetails = false;
        state.error = undefined;
    }
};

export const actions = {
    [fetchAll]({commit}: any, payload: any) {
        commit(fetchAllStart);
        search(remoteRoutes.contacts, payload, response => {
            const fine = response.map(processContact);
            commit(fetchAllSuccess, fine);
        });
    },
    [fetchDetails]({commit}: any, payload: string) {
        commit(fetchDetailsStart);
        const url = `${remoteRoutes.contactById}/${payload}`;
        get(url, response => {
            commit(fetchDetailsSuccess, response);
        });
    }
};

const processContact = (contact: IContact) => {
    const {avatar} = contact.person;
    const {id, person, emails: [email], phones: [phone], metaData: {churchLocation, cellGroup}} = contact;
    return {
        id,
        avatar, churchLocation, cellGroup,
        altAvatar: parseAvatar(renderName(contact.person)),
        fullName: renderName(person),
        name: renderName(person),
        email: safeGet(email, 'value'), phone: safeGet(phone, 'value')
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
        isLoadingData: false,
        isLoadingDetails: false,
        selected: undefined,
        error: undefined,
        data: [],
        details: []
    },
    mutations,
    actions,
    getters
};



