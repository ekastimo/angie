<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login</v-toolbar-title>
                                <v-spacer/>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            prepend-icon="person"
                                            name="login"
                                            label="Login"
                                            type="text"
                                            v-model="email"
                                    />
                                    <v-text-field
                                            id="password"
                                            prepend-icon="lock"
                                            name="password"
                                            label="Password"
                                            type="password"
                                            v-model="password"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" @click.prevent="$emit('register')">Sign Up</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click.prevent="submit">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import {mapActions} from 'vuex'
    import {localRoutes} from '@/data/constants';
    import {coreActions} from '@/modules/base/data';

    export default {
        data: () => ({
            drawer: null,
            localRoutes,
            email: 'ekastimo@gmail.com',
            password: 'Xpass@123',
        }),
        props: {
            source: String
        },
        methods: {
            ...mapActions([coreActions.doLogin]),
            submit() {
                const {email, password} = this
                this.doLogin({email, password})
            }
        }
    }
</script>
