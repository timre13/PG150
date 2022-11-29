<template>
    <div id="content">
        <main>
            <h1>Kedves Látogatónk!</h1>
            <h1>Kedves Öregdiákunk!</h1>
            <p>
                Iskolánk – a Kiskunfélegyházi Szent Benedek PG Két Tanítási Nyelvű Technikum és Kollégium - 2021.
                szeptember 18-án ünnepelte fennállásának 150. évfordulóját.
            </p>
            <p>
                A jeles alkalomból rendezett nagyszabású ünnepi programon túl kiadtunk egy jubileumi emlékkönyvet is –
                PG 150. EMLÉKKÖNYV címmel - melyben szerettünk volna emléket állítani az elmúlt másfél évszázadban
                történteknek, az intézményben tanulóknak, dolgozóknak, továbbá bemutatni intézményünk jelenét,
                mindennapjait.
            </p>
            <p>
                Az emlékkönyv készítése kapcsán, ahogy iskolánk történetét kutattuk, sok tárgyi emlék, fénykép,
                személyes beszámoló, interjú került összegyűjtésre és rögzítésre.
            </p>
            <p>
                Az itt található oldalakon – a jubileumi emlékkönyv felépítését követve - a különböző fejezetekből
                „kimaradt” képeket és kapcsolódó interjúkat, összegyűjtött anyagokat szeretnénk megtekinthetővé és
                elérhetővé tenni.
            </p>
            <p>
                Látható és elérhető továbbá ezen a felületen az évfordulóra való készületünk és ünneplésünk során
                létrejött tartalom – visszaemlékező videók, az ünnepségen készült felvételek stb.
            </p>
            <p>
                Szeretettel bíztatjuk a Kedves Látogatót, hogy forgassa a jubileumi emlékkönyvünket és lapozza át itt is
                a virtuális oldalakat tartalmakat. Tekintsék meg azt a gazdag háttéranyagot, melyet öregdiákjaink,
                elődeink rendelkezésünkre bocsátottak – szóban, képben, tárgyi emlékekben.
            </p>
            <p id="ending">Iskolaközösségünk nevében: a Jubileumi Emlékbizottság</p>
        </main>
    </div>
</template>

<script setup lang="ts"></script>

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
