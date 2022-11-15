<template>
    <main>
        <NavBar></NavBar>
        <h1>Hello World</h1>
    </main>
</template>

<script setup lang="ts">
  import NavBar from '@/components/NavBar.vue';
</script>

<style scoped lang="scss">
    main {
        h1 {
            font-family: 'Comic Sans Ms';
        }
    }
</style>