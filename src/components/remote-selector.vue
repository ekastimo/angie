<template>
    <v-autocomplete
            v-bind:value="value"
            v-on:input="$emit('input', $event)"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            hide-selected
            :item-text="itemText"
            :item-value="itemValue"
            :label="label"
            :return-object="returnObject"
            :rules="rules"
            no-data-text="Type to search..."
            clearable
            open-on-clear
            cache-items
            small-chips
    ></v-autocomplete>
</template>

<script>
    import {search, handleError} from '@/utils/ajax'

    export default {
        name: 'remote-selector',
        props: {
            value: [String, Object],
            label: String,
            url: String,
            parser: Function,
            icon: String,
            rules: Array,
            itemText: String,
            itemValue: String,
            returnObject: {
                type: Boolean,
                default: false
            }
        },
        data() {
            const items = this.value ? [this.value] : [];
            return {
                isLoading: false,
                model: null,
                search: null,
                items
            }
        },

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
            },
            value(newVal) {
                const isEmpty = this.items.length === 0
                if (isEmpty && newVal) {
                    this.items.push(newVal)
                }
            }
        }
    }
</script>

<style scoped>

</style>
