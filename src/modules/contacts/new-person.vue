<template>
    <v-form v-model='valid' ref="form">
        <v-card>
            <v-card-title class="pb-0 pl-4">
                <span class="headline">New Person</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-sm>
                    <v-layout wrap grid-list-sm>
                        <v-flex xs12 sm6>
                            <remote-selector
                                    dark
                                    v-model="formData.churchLocation"
                                    :url='remoteRoutes.locations'
                                    :parser="parser"
                                    :rules="rules.churchLocation"
                                    label="Location*"
                                    icon="location_city"
                                    item-text="label"
                                    item-value="value"
                            />
                        </v-flex>
                        <v-flex xs12 sm6>
                            <remote-selector
                                    v-model="formData.cellGroup"
                                    :rules="rules.cellGroup"
                                    :url='remoteRoutes.cellGroups'
                                    :parser="parser"
                                    label="Mc*"
                                    icon="nature_people"
                                    item-text="label"
                                    item-value="value"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                    label="First name*"
                                    v-model="formData.firstName"
                                    :rules="rules.firstName"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                    v-model="formData.lastName"
                                    :rules="rules.lastName"
                                    label="Last name*"
                                    persistent-hint
                                    required
                            />
                        </v-flex>
                        <v-flex xs12 sm12 md4>
                            <v-text-field
                                    label="Other name"
                                    v-model="formData.middleName"
                                    :rules="rules.middleName"
                            />
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    label="Email*"
                                    v-model="formData.email"
                                    :rules="rules.email"
                            />
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    label="Phone*"
                                    v-model="formData.phone"
                                    :rules="rules.phone"
                            />
                        </v-flex>
                        <v-flex xs12 sm4>
                            <v-select
                                    v-model="formData.ageRange"
                                    :rules="rules.ageRange"
                                    :items="config.ageRanges"
                                    label="Age range*"
                                    required
                            />
                        </v-flex>
                        <v-flex xs12 sm4>
                        <v-autocomplete
                                v-model="formData.gender"
                                :rules="rules.gender"
                                :items="['Male','Female']"
                                label="Gender*"
                        />
                    </v-flex>
                        <v-flex xs12 sm4>
                            <v-autocomplete
                                    v-model="formData.civilStatus"
                                    :rules="rules.gender"
                                    :items="['Married','Single']"
                                    label="Marital status*"
                            />
                        </v-flex>
                        <v-flex xs12>
                            <date-picker
                                    v-model="formData.dateOfBirth"
                                    label="Birthday*"
                            ></date-picker>
                        </v-flex>
                    </v-layout>
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
    import {handleError, post} from '@/utils/ajax'
    import * as config from '@/modules/contacts/data/config'
    import DatePicker from '@/components/date-picker';

    export default {
        name: 'new-person',
        components: {DatePicker, RemoteSelector},
        data: () => ({
            config,
            repo: null,
            remoteRoutes,
            rules: config.validationRules,
            valid: false,
            isSubmitting: false,
            formData: {
                churchLocation: null,
                cellGroup: null,
                firstName: '',
                lastName: '',
                civilStatus: '',
                gender: '',
                dateOfBirth: null,
                email: '',
                phone: '',
                ageRange: '',
                tags: [],
            }
        }),
        methods: {
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
                            this.$emit('close')
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
