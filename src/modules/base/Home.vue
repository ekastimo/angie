<template>
    <Main title="Home">
        <div>
            <new-person></new-person>
        </div>
    </Main>
</template>

<script>
    import Main from './Main.vue';
    import NewPerson from '@/modules/contacts/editor/new-person-copy';

    export default {
        components: {NewPerson, Main},
        data: () => ({}),
        methods: {}
    };
</script>
