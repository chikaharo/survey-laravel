import {
    createMemoryHistory,
    createRouter,
    createWebHistory,
} from "vue-router";

import HomeView from "../App.vue";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import { useUserStore } from "@/store/user";
import AuthLayout from "@/components/AuthLayout.vue";
import Survey from "@/views/Survey.vue";
import SurveyView from "@/views/SurveyView.vue";
import SurveyPublicView from "@/views/SurveyPublicView.vue";

const routes = [
    {
        path: "/view/survey/:slug",
        name: "surveypublicview",
        component: SurveyPublicView,
    },
    {
        path: "/",
        redirect: "/dashboard",
        component: DefaultLayout,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: { requireAuth: true },
                component: Dashboard,
            },
            {
                path: "/surveys",
                name: "surveys",
                meta: { requireAuth: true },
                component: Survey,
            },
            {
                path: "/surveys/create",
                name: "survey-create",
                meta: { requireAuth: true },
                component: SurveyView,
            },
            {
                path: "/surveys/:id",
                name: "survey-view",
                meta: { requireAuth: true },
                component: SurveyView,
            },
        ],
    },
    {
        path: "/auth",
        redirect: "/login",
        component: AuthLayout,
        children: [
            {
                path: "/login",
                name: "login",
                meta: { isGuest: true },
                component: Login,
            },
            {
                path: "/register",
                name: "register",
                meta: { isGuest: true },
                component: Register,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _, next) => {
    const token = localStorage.getItem("token");
    // const { token } = useUserStore();
    if (to.meta.requireAuth && !token) {
        next({ name: "login" });
    } else if (to.meta.isGuest && token) {
        next({ name: "dashboard" });
    } else {
        next();
    }
});

export default router;
