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
            <div id="darkoverlay" :class="darkenBackground ? 'transparent' : ''"></div>
            <div id="imagecontainer" @click.self="onTabloClose" v-if="showImage">
                <div id="imageview">
                    <h1>{{ assets?.tablok[currentImage].img_title }}</h1>
                    <div id="imagebox">
                        <img
                            :src="assets?.tablok[currentImage].img_src"
                            :alt="assets?.tablok[currentImage].img_title"
                            :title="assets?.tablok[currentImage].img_title"
                            id="large-image"
                        />
                        <p>{{ assets?.tablok[currentImage].description }}</p>
                    </div>
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

    const isAnimating = ref(false);

    const darkenBackground = ref(false);
    const showImage = ref(false);
    const currentImage = ref(0);

    async function onTabloClick(e: MouseEvent, index: number) {
        if (isAnimating.value) return;
        isAnimating.value = true;
        darkenBackground.value = true;

        const elem = e.target as HTMLElement;
        currentImage.value = index;

        const { left: initX, top: initY } = elem.getBoundingClientRect();

        let cloned = elem.parentNode!.insertBefore(elem.cloneNode(true), elem.nextSibling) as HTMLElement;

        cloned.style.position = "absolute";
        cloned.style.zIndex = "1000";
        cloned.style.transform = `translate(-50%, -50%)`;
        cloned.style.left = `${initX + cloned.clientWidth / 2}px`;
        cloned.style.top = `${initY + cloned.clientHeight / 2}px`;
        console.log(cloned.clientWidth, cloned.clientHeight);
        cloned.style.transition = "all 0.4s ease";
        await new Promise(res => setTimeout(res, 1));
        cloned.style.width = "60%";
        cloned.style.top = "35%";
        cloned.style.left = "50%";
        // scale(${(1000 / 200) * 100}%)
        cloned.id = "active-tablo";
        window.scrollTo({ top: 0, behavior: "smooth" });
        cloned.ontransitionend = e => {
            isAnimating.value = false;
            showImage.value = true;
            const imageBox = document.getElementById("imagebox")!;
            const image = document.getElementById("large-image")!;
            // imageBox.style.top = `${image.clientHeight / 2}px`;
            imageBox.style.transform = `translateY(-${image.clientHeight / 2}px)`;
            cloned.remove();
        };
        // cloned.remove();
    }

    async function onTabloClose() {
        darkenBackground.value = false;
        showImage.value = false;
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

            #darkoverlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: black;
                transition: opacity 0.4s ease;
                opacity: 0;
                pointer-events: none;
                display: flex;
                align-items: center;
                justify-content: center;

                &.transparent {
                    opacity: 0.6;
                    pointer-events: all;
                }
            }

            #imagecontainer {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: stretch;

                #imageview {
                    pointer-events: none;
                    position: relative;
                    width: 60%;
                    display: flex;
                    flex-direction: column;

                    * {
                        margin: 0;
                        color: white;
                        text-align: center;
                    }

                    h1 {
                        position: absolute;
                        top: 0;
                        width: 100%;
                    }

                    #imagebox {
                        position: absolute;

                        pointer-events: all;
                        top: 35%;
                        left: 0;
                    }

                    img {
                        width: 100%;
                    }
                }
            }

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
                    transform-origin: center;
                    cursor: pointer;
                    flex: 1 0;
                    min-width: 20rem;
                    width: 20rem;
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
