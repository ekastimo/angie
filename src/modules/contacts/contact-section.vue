<template>
    <v-layout row v-if="$vuetify.breakpoint.smAndDown">
        <v-flex class="pt-3">
            <v-avatar :size="size">
                <v-icon>{{icon}}</v-icon>
            </v-avatar>
        </v-flex>
        <v-flex
        >
            <div class="d-block" style="width: 100%">
                <slot></slot>
            </div>
        </v-flex>
        <v-flex class="pt-3">
            <slot name="actions">
                <v-btn icon>
                    <v-icon>{{open?'expand_less':'expand_more'}}</v-icon>
                </v-btn>
            </slot>
        </v-flex>
    </v-layout>
    <v-layout row v-else>
        <v-flex shrink class="pt-3">
            <v-avatar :size="size">
                <v-icon>{{icon}}</v-icon>
            </v-avatar>
        </v-flex>
        <v-flex grow>
            <div class="d-block" style="width: 100%">
                <slot></slot>
            </div>
        </v-flex>
        <v-flex shrink class="pt-2">
            <slot name="actions">
                <v-btn icon>
                    <v-icon>{{open?'expand_less':'expand_more'}}</v-icon>
                </v-btn>
            </slot>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'contact-section',
        props: ['icon', 'size', 'open']
    }
</script>

<style scoped>

</style>
