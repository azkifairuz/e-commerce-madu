import { createRouter, createWebHistory } from "vue-router";
export const router = createRouter({
  routes: [
    {
      path: "/",
      component: () => import("../pages/Get.vue"),
    },
    {
      path: "/edit/:produk",
      name: "edit",
      component: () => import("../pages/Edit.vue"),
    },
    {
      path: "/admin",
      name: 'admin',
      component: () => import("../pages/admin/layout/Main.vue"),
      children: [
        {
          path: "/product",
          component: () => import("../pages/admin/Product.vue"),
        },
      ],
    },
  ],
  history: createWebHistory(),
});
