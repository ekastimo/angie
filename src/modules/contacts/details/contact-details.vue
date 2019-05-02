<template>
    <Main title="Contact Details">
        <v-container grid-list-md fluid>
            <v-layout v-if="contact" row wrap justify-center>
                <v-flex xs12 sm10>
                    <v-card class="mt-1">
                        <v-layout row wrap justify-center>
                            <v-flex xs4 sm3 justify-center>
                                <v-layout align-center justify-center row fill-height>
                                    <v-avatar
                                            size="70px"
                                            class="mt-4 elevation-10"

                                    >
                                        <v-img :src="getAvatar()" contain/>
                                    </v-avatar>
                                </v-layout>
                            </v-flex>
                            <v-flex xs8 sm9>
                                <v-layout align-left justify-center column fill-height>
                                    <div class="headline d-block">{{renderName(contact.person)}}</div>
                                    <div class="body-1 d-block">
                                        <span><v-icon small>account_balance</v-icon>{{contact.churchLocation}}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                                        <span><v-icon small>people</v-icon>{{contact.cellGroup}}</span>
                                    </div>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-card-actions class="pl-4">


                            <v-spacer/>
                        </v-card-actions>

                        <v-btn fab dark small color="primary"
                               absolute
                               top
                               right
                               @click="dialog=!dialog"
                        >
                            <v-icon dark>edit</v-icon>
                        </v-btn>
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
                                Info
                            </v-tab>
                            <v-tab href="#tab-2">
                                Relations
                            </v-tab>
                            <v-tab href="#tab-3">
                                Teams
                            </v-tab>
                            <v-tab-item
                                    value="tab-1"
                                    class="tab-content"
                            >
                                <v-card flat>
                                    <v-layout row wrap>
                                        <v-flex xs12 md6>
                                            <bio-data :person="contact.person"/>
                                        </v-flex>
                                        <v-flex xs12 md6>
                                            <addresses/>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item
                                    value="tab-2"
                                    class="tab-content"
                            >
                                <v-card flat>
                                    <v-card-text>{{ text }}</v-card-text>
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
            <v-dialog v-model="dialog" persistent :fullscreen="$vuetify.breakpoint.smAndDown" max-width="1000px">
                <new-person @cancel="dialog=false" @close="dialog=false"></new-person>
            </v-dialog>
        </v-container>
    </Main>
</template>

<script>
    import Main from '@/modules/base/Main.vue';
    import Addresses from '@/modules/contacts/details/addresses.vue';
    import BioData from '@/modules/contacts/details/bio-data.vue';
    import NewPerson from '@/modules/contacts/new-person.vue';
    import {mapActions} from 'vuex';
    import {contactActions} from '@/modules/contacts/data/vuexConfig';
    import {renderName} from '@/utils/helpers';
    import image from '@/assets/person.png'

    export default {
        components: {Main, Addresses, BioData, NewPerson},
        name: 'contact-details',
        data() {
            return {
                dialog: false,
                text: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                `,
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
        min-height: 350px;
    }
</style>
