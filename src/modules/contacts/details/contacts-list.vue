<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card>
        <v-sheet class="pa-3 ">
            <v-text-field
                    v-model="search"
                    label="Search here"
                    flat
                    solo-inverted
                    hide-details
                    clearable
                    clear-icon="mdi-close-circle-outline"
            ></v-text-field>
        </v-sheet>
        <v-card-text>
            <v-treeview
                    :active.sync="active"
                    :items="items"
                    :load-children="loadData"
                    :open.sync="open"
                    activatable
                    active-class="primary--text"
                    class="grey lighten-5"
                    open-on-click
                    transition
                    open-all
            >
                <template v-slot:prepend="{ item, active }">
                    <v-icon
                            v-if="!item.children"
                            :color="active ? 'primary' : ''"
                    >
                        person
                    </v-icon>
                </template>
            </v-treeview>
        </v-card-text>
    </v-card>

</template>

<script>

    import {mapState} from 'vuex';
    import {contactActions} from '@/modules/contacts/data/vuexConfig';

    export default {
        name: 'contacts-list',
        data: () => ({
            active: [],
            avatar: null,
            open: [],
            selected: undefined,
            search: null
        }),

        computed: {
            ...mapState({
                items: state => {
                    return [
                        {
                            name: 'People',
                            children: state.contacts.data
                        }
                    ]
                }
            })
        },

        watch: {
            active() {
                if (!this.active.length) {
                    return undefined
                }
                const id = this.active[0]
                return this.$emit('select', id)
            },
            search() {
                this.loadData(this.search)
            }
        },
        methods: {
            async loadData(query = '') {
                await this.$store.dispatch(contactActions.fetchAll, {query, limit: 20})
            },
        },
        async loaded() {
            await this.loadData()
        },


    }
</script>

<style scoped>

</style>
