<template>
    <Main title="Home">
        <contact-list/>
    </Main>
</template>

<script>
    import Main from './Main.vue';
    import ContactEditor from '@/modules/contacts/editor/contact-editor';
    import ContactList from '@/modules/contacts/details/contacts-list.vue';

    export default {
        components: {ContactEditor, Main, ContactList},
        data() {
            return {
                text: '' +
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
                    'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ' +
                    'enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
                    'nisi ut aliquip ex ea commodo consequat.'
            }
        },
        methods: {}
    };
</script>
