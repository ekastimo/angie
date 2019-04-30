<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-form v-model='valid' ref="form">
        <v-card>
            <v-card-title>
                <span class="title">New Person</span>
            </v-card-title>
            <v-card-text class="pa-0">
                <v-container grid-list-md fluid :class="$vuetify.breakpoint.smAndDown?'pa-0':''">
                    <template v-slot:actions>
                        <v-btn icon>
                            <v-icon>pencil</v-icon>
                        </v-btn>
                    </template>
                    <contact-section icon="person">
                        <v-layout wrap>
                            <v-flex xs12 md6>
                                <v-text-field
                                        label="First name*"
                                        v-model="formData.firstName"
                                        :rules="[rules.required()]"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                        v-model="formData.lastName"
                                        :rules="[rules.required()]"
                                        label="Last name*"
                                />
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs12 md6>
                                <v-text-field
                                        label="Middle name"
                                        v-model="formData.middleName"
                                        :rules="[rules.required()]"
                                />
                            </v-flex>
                            <v-flex xs12 md3>
                                <v-select
                                        v-model="formData.age"
                                        :rules="[rules.required()]"
                                        :items="config.ageRanges"
                                        label="Age"
                                />
                            </v-flex>
                            <v-flex xs12 md3>
                                <v-autocomplete
                                        v-model="formData.gender"
                                        :rules="[rules.required()]"
                                        :items="['Male','Female']"
                                        label="Gender"
                                />
                            </v-flex>
                        </v-layout>
                    </contact-section>
                    <contact-section icon="account_balance">
                        <v-layout wrap>
                            <v-flex xs12 sm6>
                                <remote-selector
                                        dark
                                        v-model="formData.churchLocation"
                                        :url='remoteRoutes.locations'
                                        :parser="parser"
                                        :rules="[rules.required()]"
                                        label="Location*"
                                />
                            </v-flex>
                            <v-flex xs12 sm6>
                                <remote-selector
                                        v-model="formData.cellGroup"
                                        :rules="[rules.required()]"
                                        :url='remoteRoutes.cellGroups'
                                        :parser="parser"
                                        label="Mc*"
                                />
                            </v-flex>
                        </v-layout>
                    </contact-section>

                    <contact-section icon="event">
                        <template v-slot:actions>
                            <v-btn icon @click="addEvent">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </template>
                        <v-layout row wrap v-for="(record,index) in formData.dates" :key="record.id">
                            <v-flex xs3>
                                <v-autocomplete
                                        v-model="record.category"
                                        :rules="[rules.required()]"
                                        :items="['Birthday','Anniversary','Other']"
                                        label="Tag"
                                />
                            </v-flex>
                            <v-flex xs9>
                                <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="record.value"
                                                :rules="[rules.required()]"
                                                label="Date"
                                                readonly
                                                v-on="on"
                                                append-outer-icon="delete"
                                                @click:append-outer="removeItem(index,'events')"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                            ref="picker"
                                            v-model="record.value"
                                            :max="new Date().toISOString().substr(0, 10)"
                                            min="1950-01-01"
                                            @change="save"
                                    ></v-date-picker>
                                </v-menu>
                            </v-flex>
                        </v-layout>
                    </contact-section>

                    <contact-section icon="email">
                        <template v-slot:actions>
                            <v-btn icon @click="addEmail">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </template>
                        <v-layout v-for="(record,index) in formData.emails" :key="record.id">
                            <v-flex xs3>
                                <v-autocomplete
                                        v-model="record.category"
                                        :rules="[rules.required()]"
                                        :items="config.phoneCategories"
                                        label="Tag"
                                />
                            </v-flex>
                            <v-flex xs9>
                                <v-text-field
                                        label="Email*"
                                        v-model="record.address"
                                        :rules="[rules.required(),rules.isEmail()]"
                                        append-outer-icon="delete"
                                        @click:append-outer="removeItem(index,'emails')"
                                />
                            </v-flex>
                        </v-layout>
                    </contact-section>
                    <contact-section icon="phone">
                        <template v-slot:actions>
                            <v-btn icon @click="addPhone">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </template>
                        <v-layout>
                            <v-flex xs3>
                                <v-autocomplete
                                        v-model="formData.gender"
                                        :rules="[rules.required()]"
                                        :items="config.phoneCategories"
                                        placeholder="Tag"
                                />
                            </v-flex>
                            <v-flex xs9>
                                <v-text-field
                                        label="Phone*"
                                        v-model="formData.phone"
                                        :rules="[rules.required()]"
                                        append-outer-icon="delete"
                                        @click:append-outer="removeItem(index,'phones')"

                                />
                            </v-flex>
                        </v-layout>
                    </contact-section>
                </v-container>

            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="blue darken-1" flat @click.prevent="$emit('cancel')">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="doSubmit">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
    import RemoteSelector from '@/components/remote-selector'
    import {remoteRoutes} from '@/data/constants'
    import {post, handleError} from '@/utils/ajax'
    import {random} from '@/utils/helpers'
    import * as config from '@/modules/contacts/data/config'
    import * as rules from '@/utils/validations';
    import ContactSection from '@/modules/contacts/contact-section'

    export default {
        name: 'new-person',
        components: {RemoteSelector, ContactSection},
        data: () => ({
            config,
            repo: null,
            remoteRoutes,
            valid: false,
            isSubmitting: false,
            rules,
            date: null,
            menu: false,
            formData: {
                churchLocation: null,
                cellGroup: null,
                lastName: null,
                middleName: null,
                civilStatus: null,
                gender: null,
                age: null,
                dates: [{category: null, value: null, key: random()}],
                emails: [{address: null, category: null, isPrimary: true, id: random()}],
                phones: [{number: null, category: null, isPrimary: true, id: random()}],
                addresses: [{freeForm: null, latLon: null, category: null, isPrimary: true, id: random()}],
                tags: [],
            }
        }),

        watch: {
            menu(val) {
                if (val) {
                    setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
                }
            }
        },
        methods: {

            save(date) {
                this.$refs.menu.save(date)
            },

            addEvent() {
                this.formData.dates.push({tag: '', value: null, id: random()})
            },

            addEmail() {
                this.formData.emails.push({
                    address: null, category: null, isPrimary: true, id: random()
                })
            },

            addPhone() {
                this.formData.phones.push({
                    number: null, category: null, isPrimary: true, id: random()
                })
            },
            addAddress() {
                this.formData.addresses.push({
                    freeForm: null, latLon: null, category: null, isPrimary: true, id: random()
                })
            },
            removeItem(index, name) {
                if (this.formData[name].length > 1) {
                    this.$delete(this.formData[name], index)
                }
            },


            doSubmit() {
                if (this.$refs.form.validate()) {
                    const {formData} = this;
                    const {tags} = formData
                    const toSubmit = {...formData, tags}
                    console.log('Submitting', toSubmit);
                    this.isSubmitting = true
                    post(remoteRoutes.contactsPerson, toSubmit,
                        (data) => {
                            this.$refs.form.reset()
                            console.log('Contact created', data)
                        },
                        (err) => {
                            handleError(err)
                        }, () => {
                            this.isSubmitting = false
                        }
                    )
                } else {
                    console.log('Do something')
                }

            },
            parser: (it) => ({label: it.name, value: it.id})
        }
    }
</script>

<style scoped>

</style>
