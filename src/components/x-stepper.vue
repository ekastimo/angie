<template>
    <v-stepper non-linear vertical class="no-transition">
        <v-stepper-step
                editable
                step="1"
        >
            Bio-data
        </v-stepper-step>
        <v-stepper-content step="1">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step
                editable
                step="2"
        >
            Contact Info
        </v-stepper-step>
        <v-stepper-content step="2">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step
                step="3"
                editable
        >
            Teams
        </v-stepper-step>
        <v-stepper-content step="3">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
    </v-stepper>
</template>

<script>
    export default {
        name: 'x-stepper',
        data() {
            return {
                e6: 1
            }
        }
    }
</script>

<style scoped>
    .no-transition .v-stepper__content { transition: none; }
</style>
