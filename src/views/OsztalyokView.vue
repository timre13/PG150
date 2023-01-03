<template>
    <div id="content">
        <main v-if="!doneLoading">
            <h1>Betöltés...</h1>
        </main>
        <main v-else>
            <h1>{{ assets?.title || "Alapértelmezett" }}</h1>
            <div class="paragraph" v-for="(item, index) in assets?.items" :key="index">
                <h2>{{ item.title }}</h2>
                <p class="text">
                    <img :src="item.img_src" :alt="item.img_title" :title="item.img_title" class="image" />
                    <span v-for="(student, i) in item.students">
                        {{ student }}<span v-if="i < item.students.length - 1">, </span>
                    </span>
                </p>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { useRoute } from "vue-router";
    //Ha mindegyik ugyanolyan nevű json file ugyanolyan template alapján müködik
    import type jsonType from "../assets/page-data/tanito/osztalyok.json";

    const route = useRoute();
    const doneLoading = ref(false);
    const assets = ref<typeof jsonType>();
    import(`../assets/page-data/${route.params.menu}/osztalyok.json`).then(res => {
        assets.value = res;
        doneLoading.value = true;
    });
</script>

<style scoped lang="scss">
    #content {
        background-color: rgb(255, 255, 255);

        main {
            padding: 1rem;
            //background-color: rgb(169, 174, 183);
            display: flex;
            flex-direction: column;
            align-items: stretch;
            color: rgb(20, 20, 50);
            min-height: 100%;
            height: auto;

            h1 {
                color: rgb(30, 30, 80);
                font-size: 2.6rem;
            }

            p {
                font-size: 1.4rem;
                margin-top: 1.2rem;
                font-weight: 400;
                text-align: justify;
            }

            .paragraph {
                margin-bottom: 1.5rem;
                .text {
                    float: right;
                }
                .image {
                    width: clamp(1rem, 50%, 35rem);
                    float: left;
                }
            }
        }
    }

    @media screen and (max-width: 602px) {
        #content main {
            text-align: center;

            .paragraph .image {
                width: 100%;
            }
        }
    }
</style>
