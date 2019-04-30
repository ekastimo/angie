<template>
    <Main title="Contact Details">
        <v-container grid-list-md fluid>

            <v-layout v-if="contact" row wrap justify-center>
                <v-flex xs12 sm10>
                    <v-card class="mt-1">
                        <v-layout row wrap>
                            <v-flex xs12 sm5 align-center
                                    justify-center
                                    layout>
                                <v-avatar
                                        size="80px"
                                        class="mt-4"
                                >
                                    <v-img :src="getAvatar()" contain/>
                                </v-avatar>
                            </v-flex>
                            <v-flex xs12 sm7>
                                <v-card-title primary-title>
                                    <div class="text-xs-center">
                                        <div class="headline">{{renderName(contact.person)}}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>

                        </v-layout>
                        <v-divider light></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <span><v-icon small>account_balance</v-icon>{{contact.churchLocation}}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                            <span><v-icon small>people</v-icon>{{contact.cellGroup}}</span>
                        </v-card-actions>
                    </v-card>
                </v-flex>

                <v-flex xs12 sm10>
                    <v-card>
                        <v-tabs
                                centered
                                icons-and-text
                        >
                            <v-tabs-slider color="yellow"></v-tabs-slider>

                            <v-tab href="#tab-1">
                                Bio data
                                <v-icon>phone</v-icon>
                            </v-tab>

                            <v-tab href="#tab-2">
                                Contact Info
                                <v-icon>account_box</v-icon>
                            </v-tab>

                            <v-tab href="#tab-3">
                                Teams
                                <v-icon>people</v-icon>
                            </v-tab>

                            <v-tab-item
                                    value="tab-1"
                                    class="tab-content"
                            >
                                <v-card flat>
                                    <bio-data :person="contact.person"/>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item
                                    value="tab-2"
                                    class="tab-content"
                            >
                                <v-card flat>
                                    <addresses/>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item
                                    value="tab-3"
                                    class="tab-content"
                            >
                                <v-card flat>
                                    <v-card-text>{{ text }}</v-card-text>
                                </v-card>
                            </v-tab-item>

                        </v-tabs>
                    </v-card>

                </v-flex>
            </v-layout>

            <v-layout row v-else>
                <v-flex>
                    <v-progress-circular

                            :size="70"
                            :width="7"
                            color="purple"
                            indeterminate
                    ></v-progress-circular>
                </v-flex>
            </v-layout>

        </v-container>
    </Main>
</template>

<script>
    import Main from '@/modules/base/Main.vue';
    import Addresses from '@/modules/contacts/details/addresses.vue';
    import BioData from '@/modules/contacts/details/bio-data.vue';
    import {mapActions} from 'vuex';
    import {contactActions} from '@/modules/contacts/data/vuexConfig';
    import {renderName} from '@/utils/helpers';
    import image from '@/assets/person.png'

    export default {
        components: {Main, Addresses, BioData},
        name: 'contact-details',
        data() {
            return {
                text: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                `,
                contactx: {
                    "category": "Person",
                    "person": {
                        "salutation": "Dr",
                        "firstName": "Kareem",
                        "middleName": "Wilkinson",
                        "lastName": "Romaguera",
                        "gender": "Female",
                        "dateOfBirth": "2018-11-08T04:42:56.743Z",
                        "civilStatus": "Divorced",
                        "about": "Quis maxime natus. Dolorem velit dolore ea totam itaque dicta debitis nostrum. Debitis porro commodi. Iusto non fugit commodi non ducimus possimus. Ut tenetur labore sit ea.",
                        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/naitanamoreno/128.jpg"
                    },
                    "company": null,
                    "identifications": [],
                    "phones": [
                        {
                            "category": "Mobile",
                            "number": "2340-306-298",
                            "isPrimary": true,
                            "id": "9fa57433-2dbb-4da1-b176-9dfbbbb834a9",
                            "createdAt": "2019-04-19T15:10:37.395Z"
                        }
                    ],
                    "emails": [
                        {
                            "category": "Personal",
                            "address": "Kareem_Wilkinson75@gmail.com",
                            "isPrimary": true,
                            "id": "5ea91733-c5fb-4c5b-875e-8685843ab2a6",
                            "createdAt": "2019-04-19T15:10:37.395Z"
                        }
                    ],
                    "addresses": [],
                    "tags": [
                        "customer",
                        "service provider",
                        "afro"
                    ],
                    "churchLocation": "WHKatiKati",
                    "cellGroup": "DUNAMIS",
                    "churchLocationName": "WHKatiKati",
                    "cellGroupName": "DUNAMIS",
                    "id": "68d95e48-2501-4293-ba94-ed369e130f92",
                    "createdAt": "2019-04-19T15:10:37.395Z",
                    "lastUpdated": null,
                    "referenceId": "00000000-0000-0000-0000-000000000000"
                }
            }
        },
        computed: {
            contact() {
                console.log('Computing contact')
                const {contactId} = this.$route.params
                return this.$store.getters.getContactById(contactId);
            }
        },
        methods: {
            ...mapActions([contactActions.fetchContact]),
            renderName,
            getAvatar() {
                console.log('Get Avatar', this.contact)
                const {person = {}} = this.contact
                return person.avatar || image
            }
        },
        mounted() {
            console.log('Mounted fetching contact')
            const {contactId} = this.$route.params
            this.fetchContact(contactId)
        }
    }
</script>

<style scoped>
    .tab-content {
        min-height: 300px;
    }
</style>
