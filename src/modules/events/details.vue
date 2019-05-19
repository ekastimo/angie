<template>
    <v-layout>
        <v-flex xs12 >
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{record.name}}</h3>
                        <div> {{ record.details }}</div>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary" flat @click.prevent="$emit('close')">Close</v-btn>
                    <v-btn color="primary" flat @click.prevent="$emit('edit')">Edit</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'details',
        props: ['record']
    }
</script>

<style scoped>

</style>
