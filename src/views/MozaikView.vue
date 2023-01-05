<template>
    <div id="content">
        <main v-if="!doneLoading">
            <h1>Betöltés...</h1>
        </main>
        <main v-else>
            <h1>Mozaik</h1>
            <div id="item-cont">
                <div class="item" v-for="(item, index) in assets?.items" :key="index">
                    <img :src="item.img_src" :alt="item.img_title" class="image" />
                    <p class="img-descr">{{ item.img_descr ?? item.img_title }}</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import type jsonType from "../assets/page-data/mozaik.json";

    const doneLoading = ref(false);
    const assets = ref<typeof jsonType>();
    import(`../assets/page-data/mozaik.json`).then(res => {
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

            #item-cont {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;

                .item {
                    position: relative;
                    max-height: 150px;
                    overflow: hidden;
                    img {
                        width: 21rem;
                        transition: filter 400ms ease-in-out 0ms;
                    }

                    .img-descr {
                        font-size: 0.5rem;
                        //visibility: hidden;
                        position: absolute;
                        z-index: 100;
                        bottom: 0;
                        left: 0;
                        height: 150px;
                        padding: 0.4rem 1rem 0 1rem;
                        background-image: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.9));
                        transform: translateY(100%);
                        transition: transform 500ms ease-in-out 50ms;
                    }

                    &:hover {
                        img {
                            filter: blur(5px);
                        }

                        .img-descr {
                            transform: none;
                        }
                    }
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
