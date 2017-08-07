<template>
    <header class="bar bar-nav ld-bar-nav">
        <a @click="goback"  class="button button-link button-nav pull-left">
            <span class="icon icon-left"></span>
        </a>
        <h1 class="title" v-text="titleText"></h1>
    </header>
</template>
<script>
export default {
    name: 'm-header',
    props:{
        titleText:String
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            title: this.$route.meta.title
        }
    },
    beforeCreate: function () {
       
    },
    mouted: function () {
        
    },
    methods: {
        goback: function () {
            console.log(this.$router);
            this.$router.back();
        }
    }
}
</script>
