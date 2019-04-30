<template>
    <Main title="Contact Details">
        <v-layout v-if="contact" row wrap>
            <v-flex xs12 md5>
                <v-card style="min-height: 190px" class="mt-1">
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
                                    <div class="title">{{renderName(contact.person)}}</div>
                                </div>
                            </v-card-title>
                        </v-flex>

                    </v-layout>
                    <v-divider light></v-divider>
                    <v-card-actions class="pa-3">
                        <span><v-icon small>account_balance</v-icon>{{contact.churchLocation}}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                        <span><v-icon small>people</v-icon>{{contact.cellGroup}}</span>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs12 md7>
                <bio-data :person="contact.person"/>
            </v-flex>

            <v-flex xs12 md7>
                <v-card>
                    <v-tabs
                            centered
                            icons-and-text
                    >
                        <v-tabs-slider></v-tabs-slider>

                        <v-tab href="#tab-1">
                            Teams
                            <v-icon>people</v-icon>
                        </v-tab>

                        <v-tab href="#tab-2">
                            Favorites
                            <v-icon>favorite</v-icon>
                        </v-tab>

                        <v-tab href="#tab-3">
                            Nearby
                            <v-icon>account_box</v-icon>
                        </v-tab>
                        <v-tab-item value="#tab-1">
                            <addresses/>
                        </v-tab-item>
                        <v-tab-item value="#tab-2">
                            <v-card flat>
                                <v-card-text>{{ text }}</v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item value="#tab-3">
                            <v-card flat>
                                <v-card-text>{{ text }}</v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-card>

            </v-flex>
        </v-layout>
        <v-progress-circular
                v-else
                :size="70"
                :width="7"
                color="purple"
                indeterminate
        ></v-progress-circular>
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
                profile: image,
                text: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                `
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

</style>
