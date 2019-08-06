import Vue from "vue";
import Router from "vue-router";
import store from "./store";

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
      component: () => import(/* webpackChunkName: "Info" */ "./views/Info.vue"),
    },
    {
      path: "/lesson/:chapter/:lesson",
      name: "Lesson",
      component: () => import(/* webpackChunkName: "Lesson" */ "./views/Lesson.vue"),
    },
    {
      path: "/editor",
      name: "ContentEditor",
      component: () => import(/* webpackChunkName: "ContentEditor" */ "./views/ContentEditor"),
      meta: { onlyAdmin: true },
    },
    {
      path: "/examEditor",
      name: "ExamEditor",
      component: () => import(/* webpackChunkName: "ExamEditor" */ "./views/ExamEditor"),
      meta: { onlyAdmin: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.onlyAdmin)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters["userManagement/loggedIn"] || !store.state.userManagement.currentUser.admin === true) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
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
