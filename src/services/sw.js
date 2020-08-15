if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/service-worker.js").then(
      function (registration) {
        // Registration was successful
        console.log("ServiceWorker registration successful");
      },
      function (err) {
        // registration failed :(
        console.error("ServiceWorker registration failed: ", err);
      }
    );
  });
}
