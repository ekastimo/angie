<template>
    <v-layout row justify-center class="pa-3">
        <v-flex xs12 sm8 md6 >
            <v-layout row wrap>
                <v-flex xs4>
                    <div class="caption">Gender</div>
                    <div>{{person.gender}}</div>
                </v-flex>
                <v-flex xs4>
                    <div class="caption">Status</div>
                    <div>
                        <v-icon small>person_add</v-icon>
                        {{person.civilStatus}}
                    </div>
                </v-flex>
                <v-flex xs4>
                    <div class="caption">Birthday</div>
                    <div>
                        <v-icon small>event</v-icon>
                        {{person.dateOfBirth|printBirthday}}
                    </div>
                </v-flex>
                <v-flex xs12>
                    <div class="caption">About Me</div>
                    <div>{{person.about}}</div>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'bio-data',
        props: ['person']
    }
</script>

<style scoped>

</style>
