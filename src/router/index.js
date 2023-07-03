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
      name: "admin",
      component: () => import("../pages/admin/layout/Admin.vue"),
      children: [
        {
          path: "/product",
          name: "product",
          component: () => import("../pages/admin/product/Product.vue"),
          children: [
            {
              path: "",
              redirect: { name: "showProduct" },
            },
            {
              path: "show",
              name: "showProduct",
              component: () => import("../pages/admin/product/ShowProduct.vue"),
            },
            {
              path: "add",
              name: "addProduct",
              component: () => import("../pages/admin/product/AddProduct.vue"),
            },
            {
              path: "edit/:product",
              name: "editProduct",
              component: () => import("../pages/admin/product/EditProduct.vue"),
            },
          ],
        },
      ],
    },
  ],
  history: createWebHistory(),
});
