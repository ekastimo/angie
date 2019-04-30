<template>
    <Main title="Home">
        <div>
            <v-btn color='primary' @click.prevent='doLogout'>Logout</v-btn>
            <v-form v-model='valid' ref="form">
                <v-container>
                    <v-layout>
                        <v-flex
                                xs12
                                md4
                        >
                            <v-text-field
                                    v-model='firstName'
                                    :rules='nameRules'
                                    :counter='10'
                                    label='First name'
                                    required
                            ></v-text-field>
                        </v-flex>

                        <v-flex
                                xs12
                                md4
                        >
                            <v-text-field
                                    v-model='lastName'
                                    :rules='nameRules'
                                    :counter='10'
                                    label='Last name'
                                    required
                            ></v-text-field>
                        </v-flex>

                        <v-flex
                                xs12
                                md4
                        >
                            <v-text-field
                                    v-model='email'
                                    :rules='emailRules'
                                    label='E-mail'
                                    required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-btn  type="submit" color="primary" @click.prevent="submit">Submit</v-btn>
            </v-form>
        </div>
    </Main>
</template>

<script >
    import Main from './Main.vue';
    import {mapActions} from 'vuex';
    import {coreActions} from '@/modules/base/data';
    import * as rules from '@/utils/validations';

    export default {
        data: () => ({
            valid: false,
            firstName: '',
            lastName: '',
            nameRules: [
                rules.required(), rules.maxLength(10)
            ],
            email: '',
            emailRules: [
                rules.required('E-mail'), rules.isEmail('E-mail')
            ]
        }),
        methods: {
            ...mapActions([coreActions.doLogout]),
            submit() {
                if (this.$refs.form.validate()) {
                    const {firstName, lastName, email} = this;
                    console.log('Submitting', {firstName, lastName, email});
                }
            },

        },
        components: {
            Main
        }
    };
</script>
