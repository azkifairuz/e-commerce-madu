import { createRouter, createWebHistory } from "vue-router";
export const router = createRouter({
  routes: [
    {
      path:'/',
      component: ()=> import("../pages/Get.vue"),
    },
    {
      path:'/edit/:produk',
      name:'edit',
      component: ()=> import("../pages/Edit.vue"),
    }
  ],
  history: createWebHistory(),
});
