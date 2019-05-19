import Vue from 'vue';
import {get, search} from '@/utils/ajax';
import {remoteRoutes} from '@/data/constants';

const module = 'events_';
const url = remoteRoutes.events;
const urlById = remoteRoutes.events;
export const fetchAll = module + 'fetchAll';
export const fetchAllStart = module + 'fetchAllStart';
export const fetchAllSuccess = module + 'fetchAllSuccess';
export const fetchAllError = module + 'fetchAllError';

export const fetchDetails = module + 'fetchDetails';
export const getById = module + 'getById';
export const fetchDetailsStart = module + 'fetchDetailsStart';
export const fetchDetailsSuccess = module + 'fetchDetailsSuccess';
export const fetchDetailsError = module + 'fetchDetailsError';


export const actionsDefs = {
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
        search(url, payload, response => {
            commit(fetchAllSuccess, response);
        });
    },
    [fetchDetails]({commit}: any, payload: string) {
        commit(fetchDetailsStart);
        get(`${urlById}/${payload}`, response => {
            commit(fetchDetailsSuccess, response);
        });
    }
};

export const getters = {
    [getById]: (state: any) => (id: string) => {
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



