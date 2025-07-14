import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("src/layouts/main-layout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/home-page.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/not-found-page.vue"),
  },
];

export default routes;
