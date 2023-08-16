import { createApp, ref } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router/index";

router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem("isLogin");
  const level = sessionStorage.getItem("levelUser");

  if (to.meta.requireAuth) {
    if (isLogin === "true") {
      //buat ngecek level
      if (to.meta.roles === level) {
        next();
        return;
      }
      next({
        name: "notAuth",
      });
      return;
    }
    next({
      name: "notAuth",
    });
  } else {
    next();
  }
});

createApp(App).use(router).mount("#app");
