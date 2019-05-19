<template>
    <v-form v-model='valid' ref="form">
        <v-card>
            <v-card-title class="pb-0 pl-4">
                <span class="headline">MC</span>
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
                        <v-flex xs12 sm4>
                            <remote-selector
                                    dark
                                    v-model="formData.location"
                                    :url='remoteRoutes.locations'
                                    :parser="parser"
                                    :rules="[rules.required()]"
                                    label="Location*"
                                    icon="location_city"
                                    item-text="label"
                                    item-value="value"
                            />
                        </v-flex>
                        <v-flex xs12 sm4>
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
                        <v-flex xs12 sm4>
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
    import * as config from '@/modules/chc-cellgroups/data/config'
    import * as vuexConfig from '@/modules/chc-cellgroups/data/vuexConfig'
    import DatePicker from '@/components/date-picker';
    import * as rules from '@/utils/validations';
    import {copyObject} from '@/utils/helpers'

    export default {
        name: 'cell-group-editor',
        props: ['seedData'],
        components: {DatePicker, RemoteSelector},
        data: () => ({
            config,
            repo: null,
            remoteRoutes,
            rules,
            valid: false,
            isSubmitting: false,
            formData: config.newCellGroup
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
                    httpAction(remoteRoutes.cellGroups, dataToSave,
                        (data) => {
                            this.$refs.form.reset()
                            this.$emit('close')
                            if (this.seedData) {
                                this.$store.commit(vuexConfig.updateRecord, data)
                            } else {
                                this.$store.commit(vuexConfig.addRecord, data)
                            }
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
