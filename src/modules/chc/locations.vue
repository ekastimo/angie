<template>
    <Main title="Church Locations" v-model="searchText" :withSearch="true">
        <no-data v-if="records.length ===0" :with-new="true" @create="dialog=!dialog"></no-data>
        <v-container grid-list-md fluid v-else>
            <v-layout row wrap>
                <template v-for='(record, index) in records'>
                    <v-flex xs12 sm6 md4 :key='record.id'
                            avatar
                    >
                        <v-card @click='showContact(record.id)'>
                            <v-layout row>
                                <v-flex xs9>
                                    <v-card-title primary-title>
                                        <div>
                                            <div class="subheading">{{record.name}}</div>
                                            <div class="text-truncate">
                                                <v-icon :size="iconFont">phone</v-icon>
                                                {{record.details}}
                                            </div>
                                        </div>
                                    </v-card-title>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-card-actions class="pa-3">
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </template>
            </v-layout>
        </v-container>
        <v-container fluid>
            <v-btn fab dark top right absolute color="secondary" small @click="dialog=!dialog">
                <v-icon dark>add</v-icon>
            </v-btn>
            <v-dialog v-model="dialog" persistent :fullscreen="$vuetify.breakpoint.smAndDown" max-width="1000px">
                <location-details @cancel="dialog=false" @close="dialog=false"></location-details>
            </v-dialog>
        </v-container>
    </Main>
</template>

<script>
    import Main from '../base/Main.vue';
    import LocationDetails from '../chc/location-details';
    import {actionsDefs} from '@/modules/chc/data/vuexConfig';
    import NoData from '@/components/no-data.vue';

    const defaultFilter = {skip: 0, limit: 20, query: ''}
    export default {
        name: 'locations',
        components: {Main, LocationDetails, NoData},
        data() {
            return {
                dialog: false,
                searchText: '',
                query: {
                    skip: 0,
                    limit: 20,
                    query: ''
                }
            }
        },
        methods: {
            async loadData(query = '') {
                await this.$store.dispatch(actionsDefs.fetchAll, {...defaultFilter, query})
            }
        },
        computed: {
            isLoading() {
                return this.$store.state.locations.isLoadingData;
            },
            records() {
                return this.$store.state.locations.data;
            }
        },
        watch: {
            async searchText(val) {
                await this.loadData(val)
            }
        }
    }
</script>

<style scoped>

</style>
