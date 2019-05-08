<template>
    <Main title="Contact Details">
        <v-container grid-list-md fluid>
            <v-layout>
                <v-flex v-if="$vuetify.breakpoint.mdAndUp" md4>
                    <contact-list @select="onContactSelected"/>
                </v-flex>
                <v-flex xs12 md8>
                    <v-layout v-if="contact" row wrap justify-center>
                        <v-flex xs12 sm10 >
                            <v-card class="mt-1" flat>
                                <v-layout row wrap justify-center>
                                    <v-flex xs4 sm3 justify-center>
                                        <v-layout align-center justify-center row fill-height>
                                            <v-avatar
                                                    size="70px"
                                                    class="mt-4 elevation-10"
                                            >
                                                <v-img :src="avatar" contain/>
                                            </v-avatar>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs8 sm9>
                                        <v-layout align-left justify-center column fill-height>
                                            <div class="headline d-block">{{fullName}}</div>
                                            <div class="body-1 d-block">
                                                <span><v-icon small>account_balance</v-icon>{{contact.metaData.churchLocation}}</span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <span><v-icon small>people</v-icon>{{contact.metaData.cellGroup}}</span>
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
                            <v-card flat>
                                <v-tabs>
                                    <v-tabs-slider color="primary"></v-tabs-slider>
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
                                    >
                                        <v-card flat>
                                            <v-card-text class="pa-1">
                                                <v-layout row wrap>
                                                    <v-flex xs12 md6>
                                                        <bio-data :contact="contact"/>
                                                    </v-flex>
                                                    <v-flex xs12 md6>
                                                        <addresses :contact="contact"/>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card-text>
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
                    <v-dialog v-if="contact" v-model="dialog" persistent :fullscreen="$vuetify.breakpoint.smAndDown"
                              max-width="1000px">
                        <contact-editor
                                @cancel="dialog=false"
                                @close="dialog=false"
                                :contact="contact"
                        />
                    </v-dialog>
                </v-flex>
            </v-layout>
        </v-container>
    </Main>
</template>

<script>
    import Main from '@/modules/base/Main.vue';
    import Addresses from '@/modules/contacts/details/addresses.vue';
    import BioData from '@/modules/contacts/details/bio-data.vue';
    import ContactEditor from '@/modules/contacts/editor/contact-editor';
    import ContactList from '@/modules/contacts/details/contacts-list.vue';
    import {contactActions} from '@/modules/contacts/data/vuexConfig';
    import {renderName} from '@/utils/helpers';
    import image from '@/assets/person.png'

    export default {
        components: {Main, Addresses, BioData, ContactEditor, ContactList},
        name: 'contact-details',
        data() {
            return {
                contactId: this.$route.params.contactId,
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
            isLoading() {
                return this.$store.state.contacts.isLoadingDetails
            },
            contact() {
                return this.$store.getters.getContactById(this.contactId)
            },
            avatar() {
                const {person = {}} = this.contact
                return person.avatar || image
            },
            fullName() {
                return renderName(this.contact.person)
            }
        },
        methods: {
            async loadContact() {
                await this.$store.dispatch(contactActions.fetchDetails, this.contactId)
            },
            async onContactSelected(contactId) {
                this.contactId = contactId
                await this.loadContact()
            }
        },
        async mounted() {
            await this.$store.dispatch(contactActions.fetchDetails, this.contactId)
        }
    }
</script>

<style scoped>
    .tab-content {
        min-height: 350px;
    }
</style>
