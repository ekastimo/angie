<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-treeview
            :active.sync="active"
            :items="items"
            :load-children="fetchContacts"
            :open.sync="open"
            activatable
            active-class="primary--text"
            class="grey lighten-5"
            open-on-click
            transition
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
</template>

<script>

    import {mapActions, mapState} from 'vuex';
    import {contactActions} from "@/modules/contacts/data/vuexConfig";

    export default {
        name: 'contacts-list',
        data: () => ({
            active: [],
            avatar: null,
            open: [],
            selected: undefined
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
                console.log('Select Contact', id)
                return this.$emit('select', id)
            }
        },

        methods: {
            ...mapActions([contactActions.fetchContacts])
        }
    }
</script>

<style scoped>

</style>
