<script setup lang="ts">
    import { RouterView, useRoute } from "vue-router";
    import Footer from "./components/Footer.vue";
    import NavBar from "./components/NavBar.vue";
    import Popup from "./components/Popup.vue";
    const route = useRoute();
</script>

<template>
    <div id="screen">
        <div id="view-container">
            <RouterView :key="route.fullPath" class="view" />
        </div>
        <NavBar class="nav" />
    </div>
    <Footer />
    <Popup />
</template>

<style scoped lang="scss">
    #screen {
        width: 100%;
        min-height: 100vh;
        display: flex;
        align-items: stretch;

        #view-container {
            flex: 1;
        }

        .view {
            width: 100%;
            height: 100%;
            background-color: hsl(0, 0%, 80%);
            position: relative;
        }
    }
</style>
