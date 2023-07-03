import { createRouter, createWebHistory } from "vue-router";
export const router = createRouter({
  routes: [
    {
      path: "/",
      component: () => import("../pages/Get.vue"),
    },  
    {
      path: "/admin",
      name: "admin",
      component: () => import("../pages/admin/layout/Admin.vue"),
      children: [
        {
          path: "product",
          name: "product",
          component: () => import("../pages/admin/product/Product.vue"),
          redirect: { name: "showProduct" },
          children: [
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
        {
          path: "category",
          name: "category",
          component: () => import("../pages/admin/category/Category.vue"),
          redirect: { name: "showCategory" },
          children: [
            {
              path: "show",
              name: "showCategory",
              component: () => import("../pages/admin/category/ShowCategory.vue"),
            },
            {
              path: "add",
              name: "addCategory",
              component: () => import("../pages/admin/category/AddCategory.vue"),
            },
            {
              path: "edit/:category",
              name: "editCategory",
              component: () => import("../pages/admin/category/EditCategory.vue"),
            },
          ],
        },
      ],

    },
  ],
  history: createWebHistory(),
});
