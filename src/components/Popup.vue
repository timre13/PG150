<template>
    <Transition name="popup">
        <div id="popup" v-if="!hide">
            <div id="popup-content">
                <h3>Kedves Látogató!</h3>
                <p>
                    Ha nem rendelkezik még jubileumi emlékkönyvvel, azt hétköznap, oktatási időben 4.500 Ft-ért
                    beszerezheti az iskola titkárságán, vagy az iskola könyvtárában!
                </p>
                <button id="popup-btn" @click="onPopupBtnClick">Rendben</button>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    const hide = ref(localStorage.getItem("popup_hidden") != undefined);
    function onPopupBtnClick() {
        hide.value = true;
        if (localStorage.getItem("popup_hidden") == undefined) localStorage.setItem("popup_hidden", "true");
    }
</script>

<style lang="scss">
    #popup {
        display: flex;
        justify-content: center;
        width: 100%;
        background-color: rgba(234, 255, 0, 0.8);
        color: rgb(105, 86, 18);
        z-index: 100;
        position: fixed;
        bottom: 0;
        padding: 20px;
        animation: PopupSlideIn 0.8s;

        #popup-content {
            display: flex;
            align-items: center;
            flex-direction: column;
            width: fit-content;

            #popup-btn {
                background-color: rgba(0, 0, 255);
                padding: 10px 15px;
                width: fit-content;
                margin: 0 auto;
                margin-top: 10px;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
        }
    }

    .popup-enter-active,
    .popup-leave-active {
        transition: transform 0.4s ease-out;
    }

    .popup-enter-from {
        transform: TranslateY(100%);
    }

    .popup-leave-from,
    .popup-enter-to {
        transform: TranslateY(0%);
    }

    .popup-leave-to {
        transform: TranslateY(100%);
    }

    @keyframes PopupSlideIn {
        0% {
            transform: translateY(100%);
        }
        100% {
            transform: none;
        }
    }
</style>
