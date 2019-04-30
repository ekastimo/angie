<template>
    <div>
        <router-view v-if="user"/>
        <login v-else-if="login" @register="login=false"/>
        <register v-else @login="login=true"/>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import Login from '@/modules/base/Login'
    import Register from '@/modules/base/Register'
    import {coreActions} from '@/modules/base/data'

    export default {
        data() {
            return {
                login: true
            }
        },
        props: {
            source: String
        },
        computed: {
            ...mapState({
                token: state => state.core.token,
                user: state => state.core.user,
            })
        },
        methods: {
            ...mapActions([coreActions.handleLogout]),
        },
        components: {Login, Register}
    }
</script>
