<template xmlns:v-slot='http://www.w3.org/1999/XSL/Transform'>
    <v-app id='inspire'>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class='elevation-12'>
                            <v-toolbar dark color='primary'>
                                <v-toolbar-title>Register</v-toolbar-title>
                                <v-spacer/>


                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            prepend-icon='person'
                                            name='login'
                                            label='Login'
                                            type='text'
                                    />
                                    <v-text-field
                                            id='password'
                                            prepend-icon='lock'
                                            name='password'
                                            label='Password'
                                            type='password'
                                    />
                                    <v-text-field
                                            id='passwordAgain'
                                            prepend-icon='lock'
                                            name='passwordAgain'
                                            label='Retype Password'
                                            type='password'
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" @click.prevent="$emit('login')">Login</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color='primary'>Sign Up</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import {localRoutes} from '@/data/constants';

    export default {
        data: () => ({
            drawer: null,
            localRoutes
        }),
        props: {
            source: String
        }
    }
</script>
