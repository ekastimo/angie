<template>
    <v-layout>
        <v-flex xs12 >
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{location.name}}</h3>
                        <div class="">
                            <v-chip label>
                                <v-icon left>label</v-icon>
                                #{{location.id}}
                            </v-chip>
                            <v-chip v-for="time in location.meetingTimes" :key="time">{{time}}</v-chip>
                        </div>
                        <div> {{ location.details }}</div>
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
        name: 'location-details',
        props: ['location']
    }
</script>

<style scoped>

</style>
