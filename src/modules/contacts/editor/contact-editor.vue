<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="pa-0" grid-list-md>
        <v-card>
            <v-card-actions v-if="$vuetify.breakpoint.smAndDown">
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
                                <v-flex xs9 md6>
                                    <v-text-field
                                            label="Middle name"
                                            v-model="formData.person.middleName"
                                            :rules="[rules.required()]"
                                    />
                                </v-flex>
                                <v-flex xs3 md6>
                                    <v-select
                                            v-model="formData.person.salutation"
                                            :items="config.salutation"
                                            label="Title"
                                    />
                                </v-flex>
                                <v-flex xs6 md4>
                                    <v-select
                                            v-model="formData.person.ageRange"
                                            :rules="[rules.required()]"
                                            :items="config.ageRanges"
                                            label="Age"
                                    />
                                </v-flex>
                                <v-flex xs6 md4>
                                    <v-select
                                            v-model="formData.person.gender"
                                            :rules="[rules.required()]"
                                            :items="config.gender"
                                            label="Gender"
                                    />
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-select
                                            v-model="formData.person.civilStatus"
                                            :items="config.civilStatus"
                                            label="Civil Status"
                                    />
                                </v-flex>
                            </v-layout>
                        </template>
                        <template v-slot:about>
                            <v-layout wrap>
                                <v-flex xs12 >
                                    <v-textarea
                                            label="About"
                                            v-model="formData.person.about"
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>
                        </template>
                        <template v-slot:chc>
                            <v-layout wrap>
                                <v-flex xs12 sm6>
                                    <remote-selector
                                            dark
                                            v-model="formData.metaData.churchLocation"
                                            :url='remoteRoutes.locations'
                                            :parser="parser"
                                            :rules="[rules.required()]"
                                            label="Location*"
                                            item-text="label"
                                            item-value="value"
                                    />
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <remote-selector
                                            v-model="formData.metaData.cellGroup"
                                            :rules="[rules.required()]"
                                            :url='remoteRoutes.cellGroups'
                                            :parser="parser"
                                            label="Mc*"
                                            item-text="label"
                                            item-value="value"
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
                                        event
                                    </v-icon>
                                    <span class="body-2">Events</span>
                                    <v-spacer></v-spacer>
                                    <v-btn flat small @click="addEvent">
                                        <v-icon small>add</v-icon>
                                        New
                                    </v-btn>
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text class="pa-0">
                                    <v-layout row wrap v-for="(record,index) in formData.events" :key="record.id">
                                        <v-flex xs3>
                                            <v-autocomplete
                                                    v-model="record.category"
                                                    :rules="[rules.required()]"
                                                    :items="config.contactEventCategories"
                                                    label="Tag"
                                            />
                                        </v-flex>
                                        <v-flex xs9>
                                            <date-picker
                                                    v-model="record.value"
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
                            <v-layout row wrap>
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
                                                            v-model="record.value"
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
                                                            v-model="record.value"
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
                                                    <remote-selector
                                                            return-object
                                                            :value="record"
                                                            v-on:input="handleAddress(index,$event)"
                                                            :url='remoteRoutes.googleMaps'
                                                            :rules="[rules.required()]"
                                                            label="Location*"
                                                            item-text="freeForm"
                                                            item-value="placeId"
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
            <v-card-actions v-if="$vuetify.breakpoint.mdAndUp">
                <v-spacer/>
                <v-btn color="blue darken-1" flat @click.prevent="$emit('cancel')">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="doSubmit">Save</v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar
                v-model="snack.show"
                :color="snack.color"
                :multi-line="true"
                top
                absolute
        >
            {{ snack.message }}
            <v-btn
                    dark
                    flat
                    @click="snack.show = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    import RemoteSelector from '@/components/remote-selector'
    import {remoteRoutes} from '@/data/constants'
    import {handleError, put} from '@/utils/ajax'
    import {copyObject, guid} from '@/utils/helpers'
    import * as config from '@/modules/contacts/data/config'
    import {newContact} from '@/modules/contacts/data/config'
    import * as rules from '@/utils/validations';
    import ContactSection from '@/modules/contacts/contact-section'
    import ContactStepper from '@/modules/contacts/editor/contact-stepper'
    import DatePicker from '@/components/date-picker';
    import WithToast from '@/components/with-toast';
    import {fetchDetailsSuccess} from '@/modules/contacts/data/vuexConfig';

    export default {
        name: 'contact-editor',
        props: ['contact'],
        mixins: [WithToast],
        components: {RemoteSelector, ContactSection, ContactStepper, DatePicker},
        data: () => ({
            config,
            repo: null,
            remoteRoutes,
            valid: false,
            isSubmitting: false,
            rules,
            formData: {...newContact}
        })
        ,
        mounted() {
            if (this.contact) {
                this.formData = {...copyObject(this.contact)}
            }
        },
        watch: {
            contact(newVal, oldVal) {
                console.log('Properties changed', {newVal, oldVal})
                this.formData = {...copyObject(newVal)}
            }
        },

        methods: {

            save(date) {
                this.$refs.menu.save(date)
            },

            addEmail() {
                this.formData.emails.push({
                    address: null, category: null, isPrimary: true, id: guid()
                })
            },

            addPhone() {
                this.formData.phones.push({
                    number: null, category: null, isPrimary: true, id: guid()
                })
            },
            handleAddress(index, address) {
                const newData = copyObject(address)
                const {id, ...rest} = newData
                const toEdit = copyObject(this.formData.addresses[index])
                this.$set(this.formData.addresses, index, {...toEdit, ...rest});
            },
            addAddress() {
                this.formData.addresses.push({
                    freeForm: null, latLon: null, category: null, isPrimary: true, id: guid()
                })
            },
            addEvent() {
                this.formData.events.push({
                    category: null, value: null, key: guid()
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
                    this.isSubmitting = true
                    put(remoteRoutes.contacts, toSubmit,
                        (data) => {
                            this.$store.commit(fetchDetailsSuccess, data)
                            this.$emit('cancel')
                        },
                        (err) => {
                            handleError(err)
                        }, () => {
                            this.isSubmitting = false
                        }
                    )
                } else {
                    this.error('Please fill In all required fields')
                }
            },
            parser: (it) => ({label: it.name, value: it.id}),
        }
    }
</script>

<style scoped>

</style>
