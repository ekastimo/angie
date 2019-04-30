<template>
    <div class='holder mb-0' :style="'background-color: '+$vuetify.theme.primary" >
        <div class='row'>
            <v-avatar
                    size='70px'
                    class='avatar'
            >
                <img v-if="profile.avatar" :src='profile.avatar' alt='avatar'>
                <v-icon v-else size="70px" dark>account_circle</v-icon>
            </v-avatar>
        </div>
        <div class='row' >
            <span  class="subheading white--text" >{{profile.fullName}}</span>
        </div>
        <div class='row'>
            <span class="body-2 white--text" >{{profile.email}}</span>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        computed: {
            ...mapState({profile: state => state.core.user})
        },
    }
</script>

<style scoped>
    .holder {
        height: 170px;
        background-color: white;
    }

    .row {
        display: flex;
        justify-content: center;
    }

    .avatar {
        margin: 10px;
    }

    .big-avatar {
        width: 60px;
        height: 60px;
    }

    .profile-text {
        color: #fff;
    }
</style>
