<template>
    <v-stepper non-linear vertical flat>
        <v-stepper-step
                editable
                step="1"
        >
            Bio-data
        </v-stepper-step>
        <v-stepper-content step="1">
            <slot name="bio-data"></slot>
        </v-stepper-content>

        <v-stepper-step
                editable
                step="2"
        >
            Contact Info
        </v-stepper-step>
        <v-stepper-content step="2">
            <slot name="contact"></slot>
        </v-stepper-content>

        <v-stepper-step
                step="3"
                editable
        >
            Church Info
        </v-stepper-step>
        <v-stepper-content step="3">
            <slot name="chc"></slot>
        </v-stepper-content>


        <v-stepper-step
                step="4"
                editable
        >
            Dates
        </v-stepper-step>
        <v-stepper-content step="4">
            <slot name="dates"></slot>
        </v-stepper-content>

        <v-stepper-step
                step="5"
                editable
        >
            About Me
        </v-stepper-step>
        <v-stepper-content step="5">
            <slot name="about"></slot>
        </v-stepper-content>
    </v-stepper>
</template>

<script>
    export default {
        name: 'contact-stepper',

    }
</script>

<style scoped>

</style>
