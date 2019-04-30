<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">

        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        name: 'my-dialog',
        props: ['value'],
        data: () => ({
            dialog: false
        })
    }
</script>

<style scoped>

</style>
