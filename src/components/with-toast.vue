<template>

</template>

<script>
    export default {
        name: 'with-toast',
        data() {
            return {
                snack: {
                    color: 'success',
                    show: false,
                    message: 'I am a message'
                },
            }
        },
        methods: {
            info(text) {
                this.snack.color = 'success'
                this.snack.message = text
                this.snack.show = true
            },
            warn(text) {
                this.snack.color = 'error'
                this.snack.message = text
                this.snack.show = true
            },
            error(text) {
                this.snack.color = 'error'
                this.snack.message = text
                this.snack.show = true
            }
        }
    }
</script>

<style scoped>

</style>
