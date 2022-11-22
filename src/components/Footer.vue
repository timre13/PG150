<template>
    <footer>
        <div id="columns">
            <div class="column">
                <a href="">Főoldal</a>
                <a href="">Tanítóképző</a>
                <a href="">Testnevelési Gimnázium</a>
                <a href="">Petőfi Gimnázium</a>
            </div>
            <div class="column">
                <a href="">Gépészei szakközépiskola</a>
                <a href="">Szent Benedek Technikum</a>
                <a href="">Adatkezelési tájékoztató</a>
            </div>
            <div class="column">
                <h2>Elérhetőségek</h2>
                <div>
                    <p>Kiskunfélegyházi Szent Benedek PG Két Tanítási Nyelvű Technikum és Kollégium</p>
                    <p>OM: 203365</p>
                    <p>6100 Kiskunfélegyháza, Kossuth u. 24.</p>
                </div>
                <div>
                    <div><a href="mailto:titkarsag@szbi-pg.hu">titkarsag@szbi-pg.hu</a></div>
                    <div><a href="tel:+36 76 462 332">+36 76 462 332</a></div>
                </div>
            </div>
        </div>

        <div id="copyright">Copyright © PG150</div>
    </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
    footer {
        width: 100%;
        background-color: hsl(0, 0%, 30%);
        color: rgb(220, 220, 220);
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: end;
        gap: 30px;

        #columns {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 0.5rem 100px;

            .column {
                width: fit-content;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                gap: 10px;
                color: rgb(220, 220, 220);

                a {
                    width: fit-content;
                    color: rgb(220, 220, 220);

                    &:hover {
                        color: white;
                    }
                }

                h2 {
                    font-size: medium;
                }
            }
        }

        #copyright {
            text-align: center;
            margin-bottom: 10px;
        }
    }
</style>
