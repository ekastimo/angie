<template>
    <v-card flat>
        <v-list two-line>
            <v-list-tile @click="" v-for="(rec,index) in contact.phones" :key="rec.id">
                <v-list-tile-action>
                    <v-icon v-if="index===0" color="primary">phone</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{rec.value}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{rec.category}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click="" v-for="(rec,index) in contact.emails" :key="rec.id">
                <v-list-tile-action>
                    <v-icon v-if="index===0" color="primary">mail</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{rec.value}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{rec.category}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click="" v-for="(rec,index) in contact.addresses" :key="rec.id">
                <v-list-tile-action>
                    <v-icon v-if="index===0" color="primary">location_on</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{rec.freeForm}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{rec.category}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: 'addresses',
        props: ['contact']
    }
</script>

<style scoped>

</style>
