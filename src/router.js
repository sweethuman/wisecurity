import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
    {
      path: "/info",
      name: "info",
      component: () => import(/* webpackChunkName: "home" */ "./views/Info.vue"),
    },
  ],
});

router.beforeResolve((to, from, next) => {
  router.app.$wait.start("loading route");
  next();
});

router.afterEach((to, from) => {
  //needs a timeout to ensure that the progress barshows, otherwise it moves too fast and the change of '$wait.any' is not detected
  setTimeout(() => router.app.$wait.end("loading route"), 500);
});

export default router;
