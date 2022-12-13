<template>
    <div id="content">
        <main v-if="!doneLoading">
            <h1>Betöltés...</h1>
        </main>
        <main v-else>
            <h1>{{ assets?.title || "Alapértelmezett" }}</h1>
            <div id="tablok">
                <div
                    v-for="(item, index) in assets?.tablok"
                    :key="item.img_src"
                    class="tablo"
                    @click="onTabloClick($event, index)"
                >
                    <img :src="item.img_src" :title="item.img_title" :alt="item.img_title" />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { useRoute } from "vue-router";
    //Ha mindegyik ugyanolyan nevű json file ugyanolyan template alapján müködik
    import type jsonType from "../assets/page-data/tanito/tablok.json";

    const route = useRoute();
    const doneLoading = ref(false);
    const assets = ref<typeof jsonType>();
    import(`../assets/page-data/${route.params.menu}/tablok.json`).then(res => {
        assets.value = res;
        doneLoading.value = true;
    });

    async function onTabloClick(e: MouseEvent, index: number) {
        const elem = e.target as HTMLElement;

        const { left: initX, top: initY } = elem.getBoundingClientRect();

        let cloned = elem.parentNode?.insertBefore(elem.cloneNode(true), elem.nextSibling) as HTMLElement;

        cloned.style.position = "absolute";
        cloned.style.zIndex = "1000";
        cloned.style.left = initX + "px";
        cloned.style.top = initY + "px";
        cloned.style.transition = "all 1s";
        await new Promise(res => setTimeout(res, 1));
        cloned.style.width = "70%";
        cloned.style.left = "50%";
        cloned.style.top = "25%";
        // scale(${(1000 / 200) * 100}%)
        cloned.style.transform = `translate(-50%, -50%)`;
        cloned.id = "active-tablo";
        window.scrollTo({ top: 0, behavior: "smooth" });
        // cloned.remove();
    }
</script>

<style scoped lang="scss">
    #content {
        background-color: rgb(255, 255, 255);

        main {
            max-width: 100%;
            padding: 1rem;
            //background-color: rgb(169, 174, 183);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            color: rgb(20, 20, 50);
            min-height: 100%;
            height: auto;

            h1 {
                color: rgb(30, 30, 80);
                font-size: 2.6rem;
            }

            p {
                font-size: 1.3rem;
                margin-top: 1.2rem;
                font-weight: 400;
                text-align: justify;
            }

            #ending {
                align-self: flex-end;
                //margin-top: 2rem;
                //margin-right: 5rem;
                text-align: right;
            }

            #tablok {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 15px;

                .tablo {
                    cursor: pointer;
                    width: 200px;
                    img {
                        width: 100%;
                        pointer-events: none;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 602px) {
        main {
            text-align: center;
            align-items: flex-start;
        }
    }
</style>
