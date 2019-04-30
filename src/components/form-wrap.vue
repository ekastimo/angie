<template>
    <v-card>
        <v-card-title pb-0>
            <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text>
            <slot></slot>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn color="blue darken-1" flat @click.prevent="$emit('cancel')">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.prevent="$emit('submit')">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: 'form-wrap',
        props: ['title']
    }
</script>
