<template>
    <div id="content">
        <main></main>
    </div>
</template>

<script setup lang="ts">
    import router from "../router/index";
    console.log(router.getRoutes());
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
