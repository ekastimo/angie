<template>
    <Main title="Church Locations" v-model="searchText" :withSearch="true">
        <no-data v-if="records.length ===0" :with-new="true" @create="dialog=!dialog"></no-data>
        <v-container grid-list-md fluid v-else>
            <v-layout row wrap>
                <template v-for='record in records'>
                    <v-flex xs12 sm6 md4 :key='record.id'
                            avatar
                    >
                        <v-card @click='openDetails(record)' class="mb-2">
                            <v-card-text>
                                <div class="subheading">{{record.name}}</div>
                                <div class="">
                                    <v-chip label>
                                        <v-icon left>label</v-icon>
                                        #{{record.id}}
                                    </v-chip>
                                    <v-chip v-for="time in record.meetingTimes" :key="time">{{time}}</v-chip>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </template>
            </v-layout>
        </v-container>
        <v-container fluid>
            <v-btn fab dark top right absolute color="secondary" small @click="createNew">
                <v-icon dark>add</v-icon>
            </v-btn>
            <v-dialog v-model="dialog" persistent :fullscreen="$vuetify.breakpoint.smAndDown" width="50%">
                <location-details v-if="showDetails && toEdit" :location="toEdit" @close="resetDialog" @edit="editItem"/>
                <location-editor v-else @close="resetDialog" :seedData="toEdit"/>
            </v-dialog>
        </v-container>
    </Main>
</template>

<script>
    import Main from '../base/Main.vue';
    import LocationDetails from '../chc/location-details';
    import LocationEditor from '../chc/location-editor';
    import {actionsDefs} from '@/modules/chc/data/vuexConfig';
    import NoData from '@/components/no-data.vue';

    const defaultFilter = {skip: 0, limit: 20, query: ''}
    export default {
        name: 'locations',
        components: {Main, LocationDetails, NoData, LocationEditor},
        data() {
            return {
                dialog: false,
                showDetails: true,
                toEdit: undefined,
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
            },
            createNew() {
                this.dialog = true;
                this.showDetails = false
                this.toEdit = undefined
            },
            editItem() {
                this.dialog = true;
                this.showDetails = false
            },
            openDetails(data) {
                this.dialog = true;
                this.showDetails = true
                this.toEdit = data
            },
            resetDialog() {
                this.dialog = false;
                this.showDetails = true
                this.toEdit = undefined
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
        },
        created() {
            this.loadData()
        }
    }
</script>

<style scoped>

</style>
