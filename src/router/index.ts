import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import BevezetoView from "../views/BevezetoView.vue";
import EmlekekView from "../views/EmlekekView.vue";
import OsztalyokView from "../views/OsztalyokView.vue";
import TablokView from "../views/TablokView.vue";
import VideokView from "../views/VideokView.vue";
import MozaikView from "../views/MozaikView.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: IndexView,
        },
        {
            path: "/:menu/bevezeto",
            component: BevezetoView,
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
        {
            path: "/mozaik",
            component: MozaikView,
        },
    ],
});

export default router;
