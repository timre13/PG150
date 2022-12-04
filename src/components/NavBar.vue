<template>
    <div :class="windowWidth < 602 ? 'float' : ''" id="wrapper">
        <div v-if="windowWidth < 602 && !showNav" id="menu-button-cont">
            <div id="menu-container" :class="showNav ? 'animate' : 'revanimate'">
                <div id="menu" @click="showNav = !showNav">
                    <MenuIcon class="icon" />
                </div>
            </div>
        </div>
        <Transition name="slide">
            <div id="navbarcont" v-if="windowWidth > 602 || showNav">
                <RouterLink class="imagecont" to="/">
                    <img src="../assets/logo150.png" class="logo" alt="logo" title="PG150" />
                </RouterLink>
                <nav id="navbar">
                    <NavMenuItem :has-sub="true" class="menu-item" text="Tanítóképző" dest="tanito" />
                    <NavMenuItem :has-sub="true" class="menu-item" text="Testnevelési Gimnázium" dest="testnevelesi" />
                    <NavMenuItem :has-sub="true" class="menu-item" text="Petőfi Gimnázium" dest="petofi" />
                    <NavMenuItem
                        class="menu-item"
                        :has-sub="true"
                        :opens-up="true"
                        text="Gépészeti Szakközépiskola"
                        dest="gepeszet"
                    />
                    <NavMenuItem
                        class="menu-item"
                        :has-sub="true"
                        :opens-up="true"
                        text="Szent Benedek Technikum"
                        dest="szentbenedek"
                    />
                    <NavMenuItem :has-sub="false" class="menu-item" text="Mozaik" dest="/" />
                </nav>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from "vue";
    import NavMenuItem from "./NavMenuItem.vue";
    import MenuIcon from "./MenuIcon.vue";

    const windowWidth = ref(window.innerWidth);
    const showNav = ref(false);

    const funct = () => {
        if (showNav.value) showNav.value = false;
        //console.log("asd");
    };

    onMounted(() => {
        window.onresize = () => {
            windowWidth.value = window.innerWidth;
        };
        document.querySelector(".view")?.addEventListener("mouseup", funct);
        document.querySelector(".view")?.addEventListener("touchend", funct);
    });

    onUnmounted(() => {
        document.querySelector(".view")?.removeEventListener("mouseup", funct);
        document.querySelector(".view")?.removeEventListener("touchend", funct);
    });
</script>

<style lang="scss">
    #wrapper {
        display: flex;
        flex: 0 0;
        height: 100vh;
        align-items: stretch;
        position: sticky;
        right: 0;
        top: 0;

        &.float {
            position: fixed;
        }
    }
    #menu-button-cont {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        #menu-container {
            display: flex;
            justify-content: end;
            align-items: center;
            box-sizing: border-box;
            padding: 1rem;

            #menu {
                background-color: white;
                border: 2px solid black;
                box-sizing: border-box;
                padding: 0.3rem;
                display: grid;
                place-items: center;
                border-radius: 0.3rem;
                aspect-ratio: 1 / 1;
                cursor: pointer;
                &:active {
                    transform: translate(1px, 2px);
                }
                .icon {
                    width: 1.5rem;
                    pointer-events: none;
                }
            }
        }
    }
    #navbarcont {
        position: relative;
        width: 10rem;
        height: 100vh;
        background-color: hsl(0, 0%, 70%);
        display: flex;
        flex-direction: column;
        text-align: center;
        .imagecont {
            display: block;
            justify-self: flex-start;
            width: 100%;
            cursor: pointer;
            img {
                width: 100%;
                pointer-events: none;
            }
        }
        #navbar {
            flex: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            color: hsl(0, 0%, 00%);

            .menu-item {
                cursor: pointer;
                width: 100%;
                padding: 1rem;

                @for $i from 1 through length($chapter-colors1) {
                    &:nth-of-type(#{$i}) {
                        $offset-color: nth($chapter-colors2, $i);
                        $main-color: nth($chapter-colors1, $i);
                        color: nth($chapter-colors2, $i);
                        background: linear-gradient(
                            90deg,
                            nth($chapter-colors1, $i) 50%,
                            scale-color(nth($chapter-colors1, $i), $saturation: 30%, $lightness: 30%) 50%
                        );
                        background-size: 200% 200%;
                        transition-duration: 200ms;
                        transition-property: background-position-x, color;
                        transition-timing-function: ease-in;

                        .main-color-background {
                            background-color: $main-color;
                        }
                        .offset-color-background {
                            background-color: $offset-color;
                        }
                    }
                }

                &:hover {
                    background-position-x: 100%;
                    color: white;
                }
            }
        }
    }
    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.4s ease;
        z-index: 1;
    }

    .slide-enter-from {
        transform: TranslateX(100%);
    }

    .slide-leave-from,
    .slide-enter-to {
        transform: TranslateX(0%);
    }

    .slide-leave-to {
        transform: TranslateX(100%);
    }
</style>
