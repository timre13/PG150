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
                    <img class="tablo-image" :src="item.img_src" :title="item.img_title" :alt="item.img_title" />
                    <span class="nocursor">{{ item.img_title }}</span>
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

        const parent = e.target as HTMLElement;
        const elem = parent.querySelector(".tablo-image");
        if (!elem) return;
        currentImage.value = index;
        const isPhone = window.innerWidth < 602;

        const { left: initX, top: initY } = elem.getBoundingClientRect();

        let cloned = parent.parentNode!.insertBefore(elem.cloneNode(true), parent.nextSibling) as HTMLElement;

        cloned.style.position = "absolute";
        cloned.style.zIndex = "1000";
        cloned.style.transform = `translate(-50%, -50%)`;
        cloned.style.left = `${initX + cloned.clientWidth / 2}px`;
        cloned.style.top = `${initY + cloned.clientHeight / 2}px`;
        cloned.style.transition = "all 0.4s ease";
        await new Promise(res => setTimeout(res, 1));
        cloned.style.width = "60%";
        cloned.style.top = isPhone ? "10%" : "35%";
        cloned.style.left = "50%";
        // scale(${(1000 / 200) * 100}%)
        //cloned.id = "active-tablo";
        window.scrollTo({ top: 0, behavior: "smooth" });
        cloned.ontransitionend = e => {
            isAnimating.value = false;
            showImage.value = true;
            const imageBox = document.getElementById("imagebox");
            const image = document.getElementById("large-image");
            if (!imageBox || !image) return;
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
            position: relative;
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
                    min-width: 20rem;
                    display: flex;
                    flex-direction: column;

                    * {
                        margin: 0;
                        color: white;
                        text-align: center;
                    }

                    h1 {
                        position: fixed;
                        top: 0;
                        left: 0;
                        z-index: 10;
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
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0.5rem;
                    border: 0.1rem solid black;
                    border-radius: 0.4rem;
                    gap: 0.5rem;
                    span {
                        font-weight: bold;
                        font-size: 1.3rem;
                    }
                    img {
                        width: 100%;
                        pointer-events: none;
                    }
                }
                .tablo-image {
                    width: 20rem;
                }
            }
        }
    }

    @media screen and (max-width: 602px) {
        main {
            text-align: center;
            align-items: flex-start;
        }
        #imagebox {
            top: 10% !important;
        }
    }

    .nocursor {
        pointer-events: none;
    }
</style>
