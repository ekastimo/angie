export const AUTH_TOKEN_KEY = '__demo__angie__token';
export const AUTH_USER_KEY = '__demo__angie__user';

export const redux = {
    doLogin: 'DO_LOGIN',
    doLogout: 'DO_LOGOUT',
    doSearch: 'DO_SEARCH',
};

export const localRoutes = {
    home: '/home',
    login: '/login',
    register: '/register',

    contacts: '/contacts',
    contactsDetails: '/contacts/:contactId',

    events: '/events',
    eventsDetails: '/events/:eventId',

    teams: '/teams',
    teamsDetails: '/teams/:teamId',

    locations: '/locations',
    locationDetails: '/locations/:locationId',

    cellGroups: '/cellGroups',
    cellGroupDetails: '/cellGroups/:cellGroupId',

    users: '/users',
    audit: '/audit',
};

const debug = process.env.NODE_ENV !== 'production';
export const url = debug ? 'http://localhost:9001' : 'https://event-yo-server.herokuapp.com';

export const remoteRoutes = {
    authServer: url,
    login: url + '/api/auth/login',
    profile: url + '/api/auth/profile',
    register: url + '/api/auth/register',
    resetPass: url + '/reset',

    contacts: url + '/api/crm/contact',
    contactSearch: url + '/api/crm/contact/search',
    contactById: url + '/api/crm/contact/id',
    contactsPerson: url + '/api/crm/contact/person',
    contactsChc: url + '/api/crm/contact/chc',
    contactsEmail: url + '/api/crm/email',
    contactsPhone: url + '/api/crm/phone',
    contactsAddress: url + '/api/crm/address',


    contactsCompany: url + '/api/crm/contact/company',
    contactsAvatar: url + '/api/crm/contact/avatar',

    uploadUrl: url + '/api/docs/upload',
    teams: url + '/api/teams/team',
    teamsMembers: url + '/api/teams/members',
    teamsMembersByTeam: url + '/api/teams/members/team',
    teamsMembersByContact: url + '/api/teams/members/contact',

    events: url + '/api/evt/event',
    eventsAgenda: url + '/api/evt/items',

    locations: url + '/api/chc/location',
    cellGroups: url + '/api/chc/cellgroup',
};
