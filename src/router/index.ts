import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: IndexView,
        },
        {
            path: "/:menu/emlekek",
            name: "Emlekek",
            component: IndexView,
        },
        {
            path: "/:menu/osztalyok",
            name: "Emlekek",
            component: IndexView,
        },
        {
            path: "/:menu/tablok",
            name: "Emlekek",
            component: IndexView,
        },
        {
            path: "/:menu/videok",
            name: "Emlekek",
            component: IndexView,
        },
    ],
});

export default router;
