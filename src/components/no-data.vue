<template>
    <v-container grid-list-md fluid>
        <v-layout row wrap>
            <v-flex xs4 offset-xs4 class="text-xs-center">
                <span>No records!&nbsp;&nbsp;</span>
                <v-btn v-if="withNew"  flat small color="primary" @click.prevent="$emit('create')">Add New</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'no-data',
        props: ['withNew']
    }
</script>
