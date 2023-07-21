import { createRouter, createWebHistory } from "vue-router";
export const router = createRouter({
  routes: [
    {
      path: "/",
      redirect: { name: "madu" },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/pages/admin/layout/Admin.vue"),
      children: [
        {
          path: "product",
          name: "product",
          component: () => import("@/pages/admin/product/Product.vue"),
          redirect: { name: "showProduct" },
          children: [
            {
              path: "show",
              name: "showProduct",
              component: () => import("@/pages/admin/product/ShowProduct.vue"),
            },
            {
              path: "add",
              name: "addProduct",
              component: () => import("@/pages/admin/product/AddProduct.vue"),
            },
            {
              path: "edit/:product",
              name: "editProduct",
              component: () => import("@/pages/admin/product/EditProduct.vue"),
            },
          ],
        },
        {
          path: "category",
          name: "category",
          component: () => import("@/pages/admin/category/Category.vue"),
          redirect: { name: "showCategory" },
          children: [
            {
              path: "show",
              name: "showCategory",
              component: () =>
                import("@/pages/admin/category/ShowCategory.vue"),
            },
            {
              path: "add",
              name: "addCategory",
              component: () => import("@/pages/admin/category/AddCategory.vue"),
            },
            {
              path: "edit/:category",
              name: "editCategory",
              component: () =>
                import("@/pages/admin/category/EditCategory.vue"),
            },
          ],
        },
        {
          path: "employee",
          name: "employee",
          component: () => import("@/pages/admin/employee/Employee.vue"),
          redirect: { name: "showEmployee" },
          children: [
            {
              path: "show",
              name: "showEmployee",
              component: () =>
                import("@/pages/admin/employee/ShowEmployee.vue"),
            },
            {
              path: "add",
              name: "addEmployee",
              component: () => import("@/pages/admin/employee/AddEmployee.vue"),
            },
            {
              path: "edit/:employe",
              name: "editEmployee",
              component: () =>
                import("@/pages/admin/employee/EditEmployee.vue"),
            },
          ],
        },
        {
          path: "order",
          name: "order",
          component: () => import("@/pages/admin/order/Order.vue"),
          redirect: { name: "showOrder" },
          children: [
            {
              path: "show",
              name: "showOrder",
              component: () => import("@/pages/admin/order/ShowOrder.vue"),
            },
          ],
        },
        {
          path: "dataCustomer",
          name: "dataCustomer",
          component: () => import("@/pages/admin/customer/Customer.vue"),
          redirect: { name: "showCustomer" },
          children: [
            {
              path: "show",
              name: "showCustomer",
              component: () =>
                import("@/pages/admin/customer/ShowCustomer.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/madu",
      name: "madu",
      redirect: { name: "home" },
      component: () => import("@/pages/customer/layout/Customer.vue"),
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("@/pages/customer/layout/landing.vue"),
        },
        {
          path: "productByCategory/:idProduct",
          name: "productByCategory",
          component: () => import("@/pages/customer/ProductByCategory.vue"),
        },
        {
          path: "detailProduct",
          name: "detailProduct",
          component: () => import("@/pages/customer/detailProduct.vue"),
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("@/pages/customer/Cart.vue"),
        },
        {
          path: "payment",
          name: "payment",
          component: () => import("@/pages/customer/Payment.vue"),
        },
      ],
    },
    {
      path: "/auth",
      redirect: { name: "loginUser" },
      children: [
        {
          path: "login",
          name: "loginUser",
          component: () => import("@/pages/customer/auth/LoginPage.vue"),
        },
        {
          path: "loginAdmin",
          name: "loginAdmin",
          component: () => import("@/pages/admin/auth/LoginPage.vue"),
        },
        {
          path: "register",
          name: "registerUser",
          component: () => import("@/pages/customer/auth/RegisterPage.vue"),
        },
        {
          path: "registerAdmin",
          name: "pegawai",
          component: () => import("@/pages/admin/auth/RegisterPage.vue"),
        },
        {
          path: "forget",
          name: "forgetPwUser",
          component: () => import("@/pages/customer/auth/ForgetPw.vue"),
        },
      ],
    },
  ],
  history: createWebHistory(),
});
