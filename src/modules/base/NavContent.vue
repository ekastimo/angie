<template xmlns:v-slot='http://www.w3.org/1999/XSL/Transform'>
    <v-list class="pt-0">
        <v-list-group
                v-for='item in items'
                :key='item.title'
                v-model='item.active'
                :prepend-icon='item.action'
                no-action
        >
            <template v-slot:activator>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>

            <v-list-tile
                    v-for='subItem in item.items'
                    :key='subItem.title'
                    @click="$router.push(subItem.to)"
            >
                <v-list-tile-content>
                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-icon>{{ subItem.action }}</v-icon>
                </v-list-tile-action>
            </v-list-tile>
        </v-list-group>
    </v-list>
</template>

<script>
    import {localRoutes} from '@/data/constants';

    export default {
        data() {
            return {
                items: [
                    {
                        action: 'account_circle',
                        title: 'People',
                        active: true,
                        items: [
                            {title: 'Members', to: localRoutes.contacts},
                            {title: 'Teams', to: localRoutes.teams}
                        ]
                    },
                    {
                        action: 'account_balance',
                        title: 'Church',
                        items: [
                            {title: 'Locations', to: localRoutes.locations},
                            {title: 'MCs', to: localRoutes.cellGroups}
                        ]
                    },
                    {
                        action: 'cake',
                        title: 'Events',
                        items: [
                            {title: 'All Event', to: localRoutes.events},
                            {title: 'Calendar', to: localRoutes.locations},
                        ]
                    },
                    {
                        action: 'device_hub',
                        title: 'Admin',
                        items: [
                            {title: 'Users', to: localRoutes.users},
                            {title: 'Audit', to: localRoutes.audit}
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .holder {
        height: 150px;
        background-color: white;
    }

    .row {
        display: flex;
        justify-content: center;
    }

    .avatar {
        margin: 10px;
    }

    .big-avatar {
        width: 60px;
        height: 60px;
    }

    .profile-text {
        color: #fff;
    }
</style>
