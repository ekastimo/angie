<template>
    <Main title="People" v-model="searchText" :withSearch="true">
        <v-container grid-list-md fluid>
            <v-layout row wrap>
                <template v-for='(contact, index) in contacts'>
                    <v-flex xs12 sm6 md4 :key='contact.id'
                            avatar
                    >
                        <v-card @click='showContact(contact.id)'>
                            <v-layout row>
                                <v-flex xs9>
                                    <v-card-title primary-title>
                                        <div>
                                            <div class="subheading">{{contact.fullName}}</div>
                                            <div class="text-truncate">
                                                <v-icon :size="iconFont">phone</v-icon>
                                                {{contact.phone}}
                                            </div>
                                            <div class="text-truncate">
                                                <v-icon :size="iconFont">email</v-icon>
                                                {{contact.email}}
                                            </div>
                                        </div>
                                    </v-card-title>
                                </v-flex>
                                <v-flex xs3>
                                    <v-avatar
                                            size="70px"
                                            color="grey lighten-4 "
                                            class="mt-3"
                                    >
                                        <v-img
                                                :src="contact.avatar||profile"
                                        ></v-img>
                                    </v-avatar>

                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-card-actions class="pa-3">
                                <v-spacer></v-spacer>
                                <span><v-icon small>account_balance</v-icon>{{contact.churchLocation}}&nbsp;&nbsp;</span>                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span><v-icon small>people</v-icon>{{contact.cellGroup}}</span>
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
                <new-person @cancel="dialog=false" @close="dialog=false"></new-person>
            </v-dialog>
        </v-container>
    </Main>
</template>

<script>
    import Main from '../base/Main.vue';
    import {mapActions, mapState} from 'vuex';
    import {contactActions} from '@/modules/contacts/data/vuexConfig';
    import {localRoutes} from '@/data/constants';
    import NewPerson from '@/modules/contacts/new-person.vue';
    import image from '@/assets/person.png'

    export default {
        name: 'Contacts',
        components: {Main, NewPerson},
        data() {
            return {
                profile: image,
                dialog: false,
                iconFont: '12',
                searchText: '',
                query: {
                    skip: 0,
                    limit: 20,
                    query: ''
                }
            }
        },
        computed: {
            ...mapState({contacts: state => state.contacts.data})
        },
        methods: {
            ...mapActions([contactActions.fetchAll]),
            showContact(contactId) {
                const url = `${localRoutes.contacts}/${contactId}`
                this.$router.push(url)
            }
        },
        mounted() {
            this.fetchAll(this.query)
        },
        watch: {
            searchText(val) {
                this.fetchAll({query: val})
            }
        }
    }
</script>

<style scoped>

</style>
