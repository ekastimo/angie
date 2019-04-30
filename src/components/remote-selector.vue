<template>
    <v-autocomplete
            v-bind:value="value"
            v-on:input="$emit('input', $event)"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            hide-no-data
            hide-selected
            item-text="label"
            item-value="value"
            :label="label"
            :return-object="false"
            :rules="rules"
            cache-items
            small-chips
    ></v-autocomplete>
</template>

<script>
    import {search, handleError} from '@/utils/ajax'

    export default {
        name: 'remote-selector',
        props: ['value', 'url', 'parser', 'label', 'icon', 'rules'],
        data: () => ({
            isLoading: false,
            model: null,
            search: null,
            items: []
        }),

        methods: {
            loadData(query = {}) {
                const {parser, filter, url} = this
                this.isLoading = true
                search(url, query, data => {
                    const fine = parser ? data.map(parser) : data
                    this.items = filter ? fine.filter(filter) : fine
                }, (err) => {
                    this.items = []
                    handleError(err)
                }, () => {
                    this.isLoading = false
                })
            }
        },
        mounted() {
            this.loadData({})
        },
        watch: {
            search(val) {
                this.loadData({query: val})
            }
        }
    }
</script>

<style scoped>

</style>
