<script setup lang="ts">
    import { RouterView, useRoute } from "vue-router";
    import Footer from "./components/Footer.vue";
    import NavBar from "./components/NavBar.vue";
    const route = useRoute();
</script>

<template>
    <div id="screen">
        <RouterView :key="route.fullPath" class="view" />
        <NavBar class="nav" />
    </div>
    <Footer />
</template>

<style scoped lang="scss">
    #screen {
        width: 100%;
        min-height: 100vh;
        display: flex;
        align-items: stretch;

        .view {
            flex: 1;
            background-color: hsl(0, 0%, 95%);
        }
    }
</style>
