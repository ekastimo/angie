<template>
    <v-card flat >
        <v-list two-line>
            <v-list-tile @click="">
                <v-list-tile-action>
                    <v-icon color="primary">wc</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-sub-title>Gender</v-list-tile-sub-title>
                    <v-list-tile-title>{{person.gender}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-list-tile @click="">
                <v-list-tile-action>
                    <v-icon color="primary">person_add</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-sub-title>Marital Status</v-list-tile-sub-title>
                    <v-list-tile-title>{{person.civilStatus}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click="">
                <v-list-tile-action>
                    <v-icon color="primary">event</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-sub-title>Birthday</v-list-tile-sub-title>
                    <v-list-tile-title>{{person.dateOfBirth|printBirthday}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-card flat>
            <v-card-title>
                <v-icon
                        left
                        color="primary"
                >
                    event_note
                </v-icon>
                <span class="subheading">About Me</span>
            </v-card-title>
            <v-card-text class="body-2 px-4 pt-0">
                "{{person.about}}"
            </v-card-text>
        </v-card>
    </v-card>

</template>

<script>
    export default {
        name: 'bio-data',
        props: ['person']
    }
</script>

<style scoped>

</style>
