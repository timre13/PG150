<template>
    <div :iden="props.text" class="cont" @click="onClick">
        <span class="text"> {{ props.dest == undefined ? "&blacktriangleleft;" : "" }} {{ props.text }}</span>
        <Transition name="submenu">
            <div class="submenu offset-color-background" :class="props.opensUp ? 'up' : 'down'" v-if="showSubMenu">
                <div class="marker main-color-background"></div>
                <div class="submenu-item">
                    Emlékeink
                    <div class="filter"></div>
                </div>
                <div class="submenu-item">
                    Osztályok
                    <div class="filter"></div>
                </div>
                <div class="submenu-item">
                    Tablók
                    <div class="filter"></div>
                </div>
                <div class="submenu-item">
                    Videók
                    <div class="filter"></div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    import router from "@/router";
    import { onMounted, ref } from "vue";

    const props = defineProps({
        text: {
            type: String,
            required: true,
        },
        dest: {
            type: String,
            required: false,
        },
        opensUp: {
            type: Boolean,
            default: false,
            required: false,
        },
    });

    const showSubMenu = ref(false);

    function onClick(e: MouseEvent) {
        if (props.dest != undefined) {
            router.push(props.dest);
            return;
        }
        if (
            (e.target as HTMLElement).parentElement?.classList.contains("submenu") ||
            (e.target as HTMLElement).classList.contains("submenu") ||
            (e.target as HTMLElement).classList.contains("filter")
        ) {
            return;
        }
        showSubMenu.value = !showSubMenu.value;
    }

    onMounted(() => {
        document.addEventListener("mouseup", e => {
            const target = e.target as HTMLElement;
            if (
                target.getAttribute("iden") != props.text &&
                !(
                    target.parentElement?.classList.contains("submenu") ||
                    target.classList.contains("submenu") ||
                    target.classList.contains("filter")
                )
            ) {
                if (showSubMenu.value) showSubMenu.value = false;
            }
        });
    });
</script>

<style lang="scss" scoped>
    .cont {
        position: relative;
        user-select: none;

        .text {
            pointer-events: none;
        }
        .submenu {
            position: absolute;
            left: -100%;
            // border: 1px solid black;
            width: 10rem;
            display: flex;
            align-items: stretch;
            background-color: var(--main-color);
            border-width: 1px 1px 1px 0;
            border-color: black;
            border-style: solid;

            .marker {
                content: "";
                display: block;
                position: absolute;
                height: 100%;
                width: 0.2rem;
                left: 0;
                top: 0;
                z-index: 3;
            }

            &.up {
                bottom: 0;
                flex-direction: column-reverse;
            }
            &.down {
                top: 0;
                flex-direction: column;
            }

            .submenu-item {
                position: relative;
                padding: 2rem;
                color: black;
                font-weight: 500;
                text-align: center;

                .filter {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;

                    &:hover {
                        background-color: rgba(0, 0, 0, 0.2);
                    }
                }
            }
        }
    }
    .submenu-enter-active.down,
    .submenu-leave-active.down {
        transition: transform 0.4s ease;
        transform-origin: top right;
        z-index: 1;
    }

    .submenu-enter-active.up,
    .submenu-leave-active.up {
        transition: transform 0.4s ease;
        transform-origin: bottom right;
        z-index: 1;
    }

    .submenu-enter-from {
        transform: scale(0%);
    }

    .submenu-leave-from,
    .submenu-enter-to {
        transform: scale(100%);
    }

    .submenu-leave-to {
        transform: scale(0%);
    }
</style>
