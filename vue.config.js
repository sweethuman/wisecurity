module.exports = {
  pwa: {
    name: "EduPLus",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/sw.js",
      swDest: "service-worker.js"
    }
  }
};
