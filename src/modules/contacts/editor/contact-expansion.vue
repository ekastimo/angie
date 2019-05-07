<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <div class="d-flex justify-between align-center mb-3">
            <v-btn @click="all">all</v-btn>
            <v-btn @click="none">none</v-btn>
        </div>

        <v-expansion-panel
                v-model="panel"
                expand
        >
            <v-expansion-panel-content
                    v-for="(item,i) in items"
                    :key="i"
            >
                <template v-slot:header>
                    <div>Item</div>
                </template>
                <v-card>
                    <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
    export default {
        name: 'contact-expansion'
    }
</script>

<style scoped>

</style>
