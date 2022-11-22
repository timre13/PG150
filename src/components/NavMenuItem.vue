<template>
    <div :iden="props.text" class="cont" @click="onClick">
        <span class="text"> {{ props.dest == undefined ? "&blacktriangleleft;" : "" }} {{ props.text }}</span>
        <Transition name="submenu">
            <div class="submenu" v-if="showSubMenu">
                <slot />
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
    });

    const showSubMenu = ref(false);
    const windowWidth = ref(window.innerWidth);

    function onClick() {
        if (props.dest != undefined) {
            router.push(props.dest);
            return;
        }
        showSubMenu.value = !showSubMenu.value;
    }

    onMounted(() => {
        window.onresize = () => {
            windowWidth.value = window.innerWidth;
        };
        document.querySelector("#navbarcont")?.addEventListener("mouseup", e => {
            const target = e.target as HTMLElement;
            if (target.getAttribute("iden") != props.text) {
                if (showSubMenu.value) showSubMenu.value = false;
            }
        });
        document.querySelector(".view")?.addEventListener("mouseup", () => {
            if (showSubMenu.value) showSubMenu.value = false;
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
            top: 0;
            border: 1px solid black;
            background-color: aqua;
            width: 10rem;
            height: 20rem;
        }
    }
    .submenu-enter-active,
    .submenu-leave-active {
        transition: transform 0.4s ease;
        transform-origin: top right;
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
