<template>
    <v-stepper non-linear vertical flat>
        <template v-for="(config,index) in configs" >
            <v-stepper-step
                    :key="config.name"
                    editable
                    :step="index"
            >
                {{config.title}}
            </v-stepper-step>
            <v-stepper-content :step="index" :key="config.title">
                <slot :name="config.name"></slot>
            </v-stepper-content>
        </template>
    </v-stepper>
</template>

<script>
    export default {
        name: 'contact-stepper',
        data() {
            return {
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
