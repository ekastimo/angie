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
                    v-if="withIcon"
                    v-bind:value="value"
                    v-on:input="$emit('input', $event)"
                    :label="label"
                    readonly
                    v-on="on"
                    :append-outer-icon="appendOuterIcon"
                    @click:append-outer="$emit('iconClick')"
            />
            <v-text-field
                    v-else
                    v-bind:value="value"
                    v-on:input="$emit('input', $event)"
                    :label="label"
                    readonly
                    v-on="on"
            />
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
        props: ['value', 'label', 'appendOuterIcon', 'withIcon'],
        data: () => ({
            date: null,
            modal: false,
        })
    }
</script>
<style scoped>

</style>
