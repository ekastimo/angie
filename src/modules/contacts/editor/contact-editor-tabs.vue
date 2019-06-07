<template>
    <div>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <template v-for="(config,index) in configs">
                    <v-stepper-step
                            :key="config.name"
                            editable
                            :step="index+1"
                    >
                        {{config.title}}
                    </v-stepper-step>
                    <v-divider></v-divider>
                </template>
            </v-stepper-header>
            <v-stepper-items flat>
                <v-stepper-content v-for="(config,index) in configs" :step="index+1" :key="config.name">
                    <v-card>
                        <slot :name="config.name"></slot>
                        <v-card-actions v-if="$vuetify.breakpoint.mdAndUp">
                            <v-spacer/>
                            <v-btn color="blue darken-1" flat @click.prevent="$emit('cancel')">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.prevent="$emit('submit')">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
    export default {
        name: 'contact-editor-tabs',
        data() {
            return {
                e1: 1,
                configs: [
                    {name: 'bio-data', title: 'Bio-data'},
                    {name: 'contact', title: 'Contact Data'},
                    {name: 'chc', title: 'Church Info'},
                    {name: 'dates', title: 'Dates'},
                    {name: 'about', title: 'About Me'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>
