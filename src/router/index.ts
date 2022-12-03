import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import EmlekekView from "../views/EmlekekView.vue";
import OsztalyokView from "../views/OsztalyokView.vue";
import TablokView from "../views/TablokView.vue";
import VideokView from "../views/VideokView.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: IndexView,
        },
        {
            path: "/:menu/emlekek",
            component: EmlekekView,
        },
        {
            path: "/:menu/osztalyok",
            component: OsztalyokView,
        },
        {
            path: "/:menu/tablok",
            component: TablokView,
        },
        {
            path: "/:menu/videok",
            component: VideokView,
        },
    ],
});

export default router;
