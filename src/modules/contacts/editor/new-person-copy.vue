<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="pa-0" grid-list-md>
        <v-card>
            <v-card-actions>
                <v-btn color="blue darken-1" flat @click.prevent="$emit('cancel')">Close</v-btn>
                <v-spacer/>
                <v-btn color="blue darken-1" flat @click="doSubmit">Save</v-btn>
            </v-card-actions>
            <v-card-text class="pa-0">
                <v-form v-model='valid' ref="form">
                    <contact-stepper>
                        <template v-slot:bio-data>
                            <v-layout row wrap>
                                <v-flex xs12 md6>
                                    <v-text-field
                                            label="First name*"
                                            v-model="formData.person.firstName"
                                            :rules="[rules.required()]"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6>
                                    <v-text-field
                                            v-model="formData.person.lastName"
                                            :rules="[rules.required()]"
                                            label="Last name*"
                                    />
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 md6>
                                    <v-text-field
                                            label="Middle name"
                                            v-model="formData.person.middleName"
                                            :rules="[rules.required()]"
                                    />
                                </v-flex>
                                <v-flex xs12 md3>
                                    <v-select
                                            v-model="formData.person.ageRange"
                                            :rules="[rules.required()]"
                                            :items="config.ageRanges"
                                            label="Age"
                                    />
                                </v-flex>
                                <v-flex xs12 md3>
                                    <v-autocomplete
                                            v-model="formData.person.gender"
                                            :rules="[rules.required()]"
                                            :items="['Male','Female']"
                                            label="Gender"
                                    />
                                </v-flex>
                            </v-layout>
                        </template>
                        <template v-slot:chc>
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
                        </template>
                        <template v-slot:dates>
                            <v-card flat>
                                <v-card-title class="pa-0 elevation-2">
                                    <v-icon
                                            left
                                            color="primary"
                                            small
                                    >
                                        calendar
                                    </v-icon>
                                    <span class="body-2">Dates</span>
                                    <v-spacer></v-spacer>
                                    <v-btn flat small @click="addDate">
                                        <v-icon small>add</v-icon>
                                        New
                                    </v-btn>
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text class="pa-0">
                                    <v-layout row wrap v-for="(record,index) in formData.dates" :key="record.id">
                                        <v-flex xs3>
                                            <v-autocomplete
                                                    v-model="record.category"
                                                    :rules="[rules.required()]"
                                                    :items="config.dateCategories"
                                                    label="Tag"
                                            />
                                        </v-flex>
                                        <v-flex xs9>
                                            <date-picker
                                                    v-model="record.category"
                                                    label="Date*"
                                                    append-outer-icon="delete"
                                                    @iconClick="removeItem(index,'dates')"
                                                    :with-icon="true"
                                            />
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </template>
                        <template v-slot:contact>
                            <v-layout column>
                                <v-flex xs12>
                                    <v-card flat>
                                        <v-card-title class="pa-0 elevation-2">
                                            <v-icon
                                                    left
                                                    color="primary"
                                                    small
                                            >
                                                email
                                            </v-icon>
                                            <span class="body-2">Emails</span>
                                            <v-spacer></v-spacer>
                                            <v-btn flat small @click="addEmail">
                                                <v-icon small>add</v-icon>
                                                New
                                            </v-btn>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text class="pa-0">
                                            <v-layout
                                                    v-for="(record,index) in formData.emails"
                                                    :key="record.id"
                                            >
                                                <v-flex xs3>
                                                    <v-autocomplete
                                                            v-model="record.category"
                                                            :rules="[rules.required()]"
                                                            :items="config.emailCategories"
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
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                                <v-flex xs12>
                                    <v-card flat>
                                        <v-card-title class="pa-0 elevation-2">
                                            <v-icon
                                                    left
                                                    color="primary"
                                                    small
                                            >
                                                phone
                                            </v-icon>
                                            <span class="body-2">Phones</span>
                                            <v-spacer></v-spacer>
                                            <v-btn flat small @click="addPhone">
                                                <v-icon small>add</v-icon>
                                                New
                                            </v-btn>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text class="pa-0">
                                            <v-layout
                                                    v-for="(record,index) in formData.phones"
                                                    :key="record.id"
                                            >
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
                                                            label="Phone*"
                                                            v-model="record.number"
                                                            :rules="[rules.required()]"
                                                            append-outer-icon="delete"
                                                            @click:append-outer="removeItem(index,'phones')"
                                                    />
                                                </v-flex>
                                            </v-layout>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                                <v-flex xs12>
                                    <v-card flat>
                                        <v-card-title class="pa-0 elevation-2">
                                            <v-icon
                                                    left
                                                    color="primary"
                                                    small
                                            >
                                                location_on
                                            </v-icon>
                                            <span class="body-2">Addresses</span>
                                            <v-spacer></v-spacer>
                                            <v-btn flat small @click="addAddress">
                                                <v-icon small>add</v-icon>
                                                New
                                            </v-btn>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text class="pa-0">
                                            <v-layout
                                                    v-for="(record,index) in formData.addresses"
                                                    :key="record.id"
                                            >
                                                <v-flex xs3>
                                                    <v-autocomplete
                                                            v-model="record.category"
                                                            :rules="[rules.required()]"
                                                            :items="config.addressCategories"
                                                            label="Tag"
                                                    />
                                                </v-flex>
                                                <v-flex xs9>
                                                    <v-text-field
                                                            label="Location*"
                                                            v-model="record.freeForm"
                                                            :rules="[rules.required()]"
                                                            append-outer-icon="delete"
                                                            @click:append-outer="removeItem(index,'addresses')"
                                                    />
                                                </v-flex>
                                            </v-layout>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </template>
                    </contact-stepper>
                </v-form>
            </v-card-text>
        </v-card>
        <v-card>
            <pre>
                {{JSON.stringify(formData,null,2)}}
            </pre>
        </v-card>
    </v-container>
</template>

<script>
    import RemoteSelector from '@/components/remote-selector'
    import {remoteRoutes} from '@/data/constants'
    import {handleError, post} from '@/utils/ajax'
    import {random} from '@/utils/helpers'
    import * as config from '@/modules/contacts/data/config'
    import * as rules from '@/utils/validations';
    import ContactSection from '@/modules/contacts/contact-section'
    import ContactStepper from '@/modules/contacts/editor/contact-stepper'
    import DatePicker from '@/components/date-picker';

    export default {
        name: 'new-person',
        components: {RemoteSelector, ContactSection, ContactStepper, DatePicker},
        data: () => ({
            config,
            repo: null,
            remoteRoutes,
            valid: false,
            isSubmitting: false,
            rules,
            formData: {
                churchLocation: null,
                cellGroup: null,
                person: {
                    lastName: null,
                    middleName: null,
                    civilStatus: null,
                    gender: null,
                    ageRange: null,
                    avatar: '',
                    about: '',
                },
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
            addDate() {
                this.formData.dates.push({
                    category: null, value: null, key: random()
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
