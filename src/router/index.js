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
      component: () => "../pages/admin/layout/Main.vue",
      children: [
        {
          path: "/product",
          component: () => "../pages/admin/Product.vue",
          children: [
            {
              path: "/add",
          component: () => "../pages/admin/AddProduct.vue",

            },
          ],
        },
      ],
    },
  ],
  history: createWebHistory(),
});
