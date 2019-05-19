import Vue from 'vue';
import {get, search} from '@/utils/ajax';
import {remoteRoutes} from '@/data/constants';

const module = 'cellGroup_';
const url = remoteRoutes.cellGroups;
export const fetchAll = module + 'fetchAll';
export const fetchAllStart = module + 'fetchAllStart';
export const fetchAllSuccess = module + 'fetchAllSuccess';
export const fetchAllError = module + 'fetchAllError';

export const addRecord = module + 'addRecord';
export const updateRecord = module + 'updateRecord';


export const actionsDefs = {
    fetchAll, addRecord, updateRecord
};

export const mutations = {
    [fetchAllStart](state: any) {
        state.isLoading = true;
        state.error = undefined;
    },
    [fetchAllError](state: any, error: string) {
        state.isLoading = false;
        state.error = error;
    },
    [fetchAllSuccess](state: any, payload: any = []) {
        state.data = payload;
        state.isLoading = false;
        state.error = undefined;
    },
    [addRecord](state: any, payload: any = []) {
        state.data.push(payload);
    },
    [updateRecord](state: any, payload: any = []) {
        const index = state.data.findIndex((it: any) => it.id === payload.id);
        Vue.set(state.data, index, payload);
    }
};

export const actions = {
    [fetchAll]({commit}: any, payload: any) {
        commit(fetchAllStart);
        search(url, payload, response => {
            commit(fetchAllSuccess, response);
        });
    }
};


export default {
    state: {
        isLoading: false,
        error: undefined,
        data: [],
    },
    mutations,
    actions
};



