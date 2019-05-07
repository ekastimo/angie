<template>
    <v-app app>
        <v-navigation-drawer
                v-model="drawer"
                fixed
                app
        >
            <NavProfile/>
            <nav-content/>
        </v-navigation-drawer>
        <v-toolbar fixed app v-if="withSearch && searching" dark color="primary" >
            <v-btn icon class="hidden-xs-only" @click.stop="searching = !searching">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-text-field
                    v-bind:value="value"
                    v-on:input="$emit('input', $event)"
                    placeholder="Search here..."
                    prepend-inner-icon="search"
                    append-icon="settings"
                    @click:append="advancedSearch"
            ></v-text-field>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-toolbar fixed app v-else dark color="primary">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title >
                {{title}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="withSearch" icon @click.stop="searching = !searching">
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-card flat>
                <slot></slot>
            </v-card>
        </v-content>
    </v-app>
</template>

<script>
    import NavContent from './NavContent'
    import NavProfile from './NavProfile'

    export default {
        components: {NavContent, NavProfile},
        data: () => ({
            drawer: null,
            searching: false
        }),
        methods: {
            advancedSearch() {
                console.log('foooo')
            }
        }
        ,
        props: ['title', 'value', 'withSearch']
    }
</script>


<style scoped>

</style>
