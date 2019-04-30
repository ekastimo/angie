<template>
    <div>
        <v-list-tile @click="" v-for="(record,index) in contact.phones" :key="record.id">
            <v-list-tile-action>
                <v-icon v-if="index===0" color="indigo">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-title>{{record.number}}</v-list-tile-title>
                <v-list-tile-sub-title>{{record.category}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action v-if="index===0">
                <v-btn flat icon @click="dialog=!dialog">
                    <v-icon>edit</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
        <v-dialog
                v-model="dialog"
                persistent
                :fullscreen="$vuetify.breakpoint.smAndDown"
                max-width="800px"
        >
            <form-wrap title="Edit Phones" @cancel="dialog=false" @submit="doSubmit">
                <v-form v-model="valid">
                    <v-container fluid>
                        <v-layout wrap v-for="(record,index) in records" :key="record.id">
                            <v-flex xs2>
                                <v-switch
                                        v-model="record.isPrimary"
                                        :label="$vuetify.breakpoint.smAndDown?'':'Primary'"
                                ></v-switch>
                            </v-flex>
                            <v-flex xs5>
                                <v-text-field
                                        v-model="record.number"
                                        label="Phone"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-select
                                        v-model="record.category"
                                        :items="config.phoneCategories"
                                        label="Label"
                                        required
                                />
                            </v-flex>
                            <v-flex xs1>
                                <v-btn flat icon>
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-divider/>
                        </v-layout>

                    </v-container>

                    <v-container fluid align-center>
                        <v-layout align-center justify-center row>
                            <v-btn flat icon @click="dialog=!dialog">
                                <v-icon>add</v-icon>
                                Add New
                            </v-btn>
                        </v-layout>
                        <v-divider/>
                    </v-container>
                </v-form>
            </form-wrap>
        </v-dialog>
    </div>

</template>
<script>

    import FormWrap from '@/components/form-wrap'
    import * as config from '@/modules/contacts/data'

    export default {
        name: 'Emails',
        props: {contact: {}},
        components: {FormWrap},
        data() {
            return {
                config,
                dialog: false,
                valid: false,
                records: [
                    {
                        id: '11',
                        isPrimary: false,
                        category: '',
                        number: '',
                    },
                    {
                        id: '12',
                        isPrimary: false,
                        category: '',
                        number: '',
                    }
                ],
                record: {
                    id: '',
                    isPrimary: false,
                    category: '',
                    number: '',
                }
            }
        },
        methods: {
            doSubmit() {
                console.log('Do submision')
                const {records} = this
                console.log(JSON.stringify(records))
            }
        }
    }
</script>
