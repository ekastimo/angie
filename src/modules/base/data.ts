import {post} from '@/utils/ajax';
import {AUTH_TOKEN_KEY, remoteRoutes} from '@/data/constants';

const doLogin = 'doLogin';
const doLogout = 'doLogout';
const handleLogin = 'handleLogin';
const handleLogout = 'handleLogout';
export const coreActions = {
    doLogin, doLogout, handleLogin, handleLogout
};


export default {
    state: {
        user: undefined,
        token: undefined
    },
    mutations: {
        [handleLogin](state: any, payload: any) {
            const {user, token} = payload;
            localStorage.setItem(AUTH_TOKEN_KEY, token);
            state.user = user;
            state.token = token;
        },
        [handleLogout](state: any) {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            state.user = undefined;
            state.token = undefined;
        }
    },
    actions: {
        [doLogin]({commit}: any, payload: any) {
            post(remoteRoutes.login, payload, data => {
                commit(handleLogin, data);
            });
        },
        [doLogout]({commit}: any) {
            console.log('Logging out');
            commit(handleLogout);
        },
    },
};
