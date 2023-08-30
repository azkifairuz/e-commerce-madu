import { createRouter, createWebHistory } from "vue-router";
export const router = createRouter({
  routes: [
    {
      path: "/",
      redirect: { name: "madu" },
    },
    {
      path: "/notAuth",
      name: "notAuth",
      component: () => import("@/pages/NotAuthorize.vue"),

    },
    {
      path: "/admin",
      name: "admin",
      meta: {
        requireAuth:true,
        roles:'admin'
      },
      component: () => import("@/pages/admin/layout/Admin.vue"),
      redirect: { name: "dashboard" },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/pages/admin/layout/Dashboard.vue"),
        },
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
              component: () => import("@/pages/admin/auth/RegisterPage.vue"),
            },
            {
              path: "edit/:pegawai",
              name: "editEmployee",
              component: () => import("@/pages/admin/employee/EditEmployee.vue"),
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
            {
              path: "detailOrder/:nota/:status/:idPelanggan/:image",
              name: "detailOrder",
              meta: {
                requireAuth:true,
                roles:'admin'
              },
              component: () => import("@/pages/admin/order/DetailOrder.vue"),
            },
            {
              path: "sendOrder/:idPemesanan",
              name: "sendOrder",
              meta: {
                requireAuth:true,
                roles:'admin'
              },
              component: () => import("@/pages/admin/order/SendOrder.vue"),
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
          component: () => import("@/pages/customer/layout/Landing.vue"),
        },
        {
          path: "aboutus",
          name: "aboutus",
          component: () => import("@/pages/customer/AboutUs.vue"),
        },
        {
          path: "productByCategory/:idCategory",
          name: "productByCategory",
          meta: {
            requireAuth:true,
            roles:'cust'
          },
          component: () => import("@/pages/customer/productByCategory.vue"),
        },
        {
          path: "detailProduct/:idProduct",
          name: "detailProduct",
          meta: {
            requireAuth:true,
            roles:'cust'
          },
          component: () => import("@/pages/customer/detailProduct.vue"),
        },
        {
          path: "cart",
          name: "cart",
          meta: {
            requireAuth:true,
            roles:'cust'
          },
          component: () => import("@/pages/customer/Cart.vue"),
        },
        {
          path: "payment/:invoice",
          name: "payment",
          meta: {
            requireAuth:true,
            roles:'cust'
          },
          component: () => import("@/pages/customer/Payment.vue"),
        },
        {
          path: "catalog",
          name: "catalog",
          meta: {
            requireAuth:true,
            roles:'cust'
          },
          component: () => import("@/pages/customer/Catalog.vue"),
        },
        {
          path: "allCategory",
          name: "allCategory",
          meta: {
            requireAuth:true,
            roles:'cust'
          },
          component: () => import("@/pages/customer/ListCategory.vue"),
        },
        {
          path: "profile",
          name: "profile",
          meta: {
            requireAuth:true,
            roles:'cust'
          },
          component: () => import("@/pages/customer/Profile.vue"),
        },
        {
          path: "history",
          name: "history",
          meta: {
            requireAuth:true,
            roles:'cust'
          },
          component: () => import("@/pages/customer/History.vue"),
        },
        {
          path: "detailHistory/:nota/:status/:image",
          name: "detailHistory",
          meta: {
            requireAuth:true,
            roles:'cust'
          },
          component: () => import("@/pages/customer/DetailHistory.vue"),
        },
        {
          path: "editProfilCustomer",
          name: "editProfilCustomer",
          meta: {
            requireAuth:true,
            roles:'cust'
          },
          component: () => import("@/pages/customer/EditProfile.vue"),
        },
      ],
    },
    {
      path: "/auth",
      name:"auth",
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
