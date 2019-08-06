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
    {
      path: "/exam/:exam",
      name: "Exam",
      component: () => import(/* webpackChunkName: "ExamEditor" */ "./views/Exam"),
    },
    {
      path: "/simple",
      name: "Simple",
      component: () => import(/* webpackChunkName: "ExamEditor" */ "./views/Simple"),
    },
    {
      path: "/game/0",
      name: "Scena0",
      component: () => import(/* webpackChunkName: "ExamEditor" */ "./views/Game/Scena0"),
    },
    {
      path: "/game/1",
      name: "Scena1",
      component: () => import(/* webpackChunkName: "ExamEditor" */ "./views/Game/Scena1"),
    },
    {
      path: "/game/2",
      name: "Scena2",
      component: () => import(/* webpackChunkName: "ExamEditor" */ "./views/Game/Scena2"),
    },
    {
      path: "/game/1.1",
      name: "Scena1.1",
      component: () => import(/* webpackChunkName: "ExamEditor" */ "./views/Game/Scena1.1"),
    },
    {
      path: "/game/1.2",
      name: "Scena1.2",
      component: () => import(/* webpackChunkName: "ExamEditor" */ "./views/Game/Scena1.2"),
    },
    {
      path: "/game/1.3",
      name: "Scena1.3",
      component: () => import(/* webpackChunkName: "ExamEditor" */ "./views/Game/Scena1.3"),
    },
    {
      path: "/game/2.1",
      name: "Scena2.1",
      component: () => import(/* webpackChunkName: "ExamEditor" */ "./views/Game/Scena2.1"),
    },
    {
      path: "/game/2.2",
      name: "Scena2.2",
      component: () => import(/* webpackChunkName: "ExamEditor" */ "./views/Game/Scena2.2"),
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
