<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            lazy
            full-width
            width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    v-bind:value="value"
                    v-on:input="$emit('input', $event)"
                    :label="label"
                    readonly
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
                v-bind:value="value"
                v-on:input="$emit('input', $event)"
                scrollable
        >
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
    </v-dialog>
</template>
<script>
    export default {
        name: 'date-picker',
        props: ['value', 'label'],
        data: () => ({
            date: null,
            modal: false,
        })
    }
</script>
<style scoped>

</style>
