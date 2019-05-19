<template>
    <v-form v-model='valid' ref="form">
        <v-card>
            <v-card-title class="pb-0 pl-4">
                <span class="headline">Location Editor</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-sm>
                    <v-layout wrap grid-list-sm>

                        <v-flex xs12 sm6>
                            <v-text-field
                                    label="Id*"
                                    v-model="formData.id"
                                    :rules="[rules.required()]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                                    label="Name*"
                                    v-model="formData.name"
                                    :rules="[rules.required()]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                                    v-model="formData.meetingTimes"
                                    :items="config.meetingTimes"
                                    attach
                                    chips
                                    small-chips
                                    label="Meeting Times"
                                    multiple
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <remote-selector
                                    return-object
                                    v-model="formData.venue"
                                    :url='remoteRoutes.googleMaps'
                                    :rules="[rules.required()]"
                                    label="Location*"
                                    item-text="freeForm"
                                    item-value="placeId"
                            />
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                    label="About"
                                    v-model="formData.details"
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="blue darken-1" flat @click.prevent="$emit('close')">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="doSubmit">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>

    import RemoteSelector from '@/components/remote-selector'
    import {remoteRoutes} from '@/data/constants'
    import {handleError, post, put} from '@/utils/ajax'
    import * as config from '@/modules/chc-locations/data/config'
    import DatePicker from '@/components/date-picker';
    import * as rules from '@/utils/validations';
    import {copyObject} from '@/utils/helpers'

    export default {
        name: 'editor',
        props: ['seedData'],
        components: {DatePicker, RemoteSelector},
        data: () => ({
            config,
            repo: null,
            remoteRoutes,
            rules,
            valid: false,
            isSubmitting: false,
            formData: {
                name: null,
                details: null,
                venue: null,
                meetingTimes: [],
            }
        }),
        mounted() {
            if (this.seedData) {
                this.formData = {...copyObject(this.seedData)}
            }
        },
        watch: {
            seedData(newVal) {
                this.formData = {...copyObject(newVal)}
            }
        },
        methods: {
            handleAddress(address) {
                const newData = copyObject(address)
                const toEdit = copyObject(this.formData.venue)
                this.$set(this.formData, 'venue', {...toEdit, ...newData});
            },
            doSubmit() {
                if (this.$refs.form.validate()) {
                    const dataToSave = copyObject(this.formData)
                    this.isSubmitting = true
                    const httpAction = this.seedData ? put : post;
                    httpAction(remoteRoutes.locations, dataToSave,
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
