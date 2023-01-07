<template>
    <div id="content">
        <main v-if="!doneLoading">
            <h1>Betöltés...</h1>
        </main>
        <main v-else>
            <h1>{{ assets?.title || "Alapértelmezett" }}</h1>
            <div v-for="item in assets?.content">
                <div v-if="item.url && item.url.includes('youtube.com/embed')" class="yt-thumbnail-div">
                    <img
                        class="yt-thumbnail"
                        :src="'https://img.youtube.com/vi' + item.url.substring(item.url.lastIndexOf('/')) + '/0.jpg'"
                        :width="item.width * ((winWidth * 0.8) / item.width)"
                        :height="item.height * ((winWidth * 0.8) / item.width)"
                        @click="onYoutubeVidClick"
                    />
                    <img
                        class="yt-play-btn"
                        src="https://enviro.com/wp-content/uploads/2020/06/Play-Button-copy.png"
                        @click="onYoutubeVidClick"
                    />
                    <iframe
                        class="yt-video"
                        :width="item.width * ((winWidth * 0.8) / item.width)"
                        :height="item.height * ((winWidth * 0.8) / item.width)"
                        :data-src="item.url"
                        style="display: none"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
                <p v-else-if="item.text">{{ item.text }}</p>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { useRoute } from "vue-router";
    //Ha mindegyik ugyanolyan nevű json file ugyanolyan template alapján müködik
    import type jsonType from "../assets/jsonTypes/videok.json";

    const route = useRoute();
    const doneLoading = ref(false);
    const assets = ref<typeof jsonType>();
    fetch(`page-data/${route.params.menu}/videok.json`)
        .then(res => res.json())
        .then(body => {
            assets.value = body;
            doneLoading.value = true;
        });

    let winWidth = window.innerWidth;

    function onYoutubeVidClick(e: MouseEvent) {
        let clicked = e.target as HTMLElement;
        let parent = clicked.parentElement;

        let thumbnail = parent?.querySelector(".yt-thumbnail");
        thumbnail?.remove();

        let playBtn = parent?.querySelector(".yt-play-btn");
        playBtn?.remove();

        let iframe = parent?.querySelector(".yt-video") as HTMLElement;
        let vidUrl = iframe.getAttribute("data-src") as string;
        iframe.setAttribute("src", vidUrl);
        iframe.style.display = "initial";
    }
</script>

<style scoped lang="scss">
    #content {
        background-color: rgb(255, 255, 255);

        main {
            padding: 1rem;
            //background-color: rgb(169, 174, 183);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
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

            .yt-thumbnail-div {
                box-shadow: 5px 5px 15px black;
                cursor: pointer;
                position: relative;

                .yt-play-btn {
                    width: 150px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            #ending {
                align-self: flex-end;
                //margin-top: 2rem;
                //margin-right: 5rem;
                text-align: right;
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
