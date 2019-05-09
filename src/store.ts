import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import VuexPersistence from 'vuex-persist';
import core from '@/modules/base/data';
import contacts from '@/modules/contacts/data/vuexConfig';
import locations from '@/modules/chc/data/vuexConfig';

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

const logger = createLogger({
    collapsed: false, // auto-expand logged mutations
    filter(mutation, stateBefore, stateAfter) {
        // returns `true` if a mutation should be logged
        // `mutation` is a `{ type, payload }`
        return mutation.type !== 'aBlacklistedMutation';
    },
    transformer(state: any) {
        return state.contacts;
    },
    mutationTransformer(mutation) {
        return mutation.type;
    }
});

const store = new Vuex.Store<any>({
    plugins: [vuexLocal.plugin, logger],
    modules: {
        contacts, core, locations
    }
});

export default store;
