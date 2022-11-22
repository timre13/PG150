<template>
    <div id="navbarcont">
        <a class="imagecont">
            <img src="../assets/logo150.png" class="logo" alt="logo" title="PG150" />
        </a>
        <nav id="navbar">
            <NavMenuItem class="menu-item" text="Tanítóképző"></NavMenuItem>
            <NavMenuItem class="menu-item" text="Testnevelési Gimnázium"></NavMenuItem>
            <NavMenuItem class="menu-item" text="Petőfi Gimnázium"></NavMenuItem>
            <NavMenuItem class="menu-item" text="Gépészeti Szakközépiskola"></NavMenuItem>
            <NavMenuItem class="menu-item" text="Szent Benedek Technikum"></NavMenuItem>
            <NavMenuItem class="menu-item" text="Mozaik" dest="/"></NavMenuItem>
        </nav>
    </div>
</template>

<script setup lang="ts">
    import NavMenuItem from "./NavMenuItem.vue";
</script>

<style lang="scss">
    #navbarcont {
        position: relative;
        background-color: hsl(0, 0%, 80%);
        width: 10rem;
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
                    }
                }

                &:hover {
                    background-position-x: 100%;
                    color: white;
                }
            }
        }
    }
</style>
