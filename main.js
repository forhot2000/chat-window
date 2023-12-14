(function () {
  const windows = Array.from(window.frames);

  window.addEventListener("message", function ({ data, origin, source }) {
    if (data.type === "chat") {
      console.log(data, origin);
      broadcast(data);
    }
  });

  function broadcast(data) {
    for (let i = 0; i < windows.length; i++) {
      const client = windows[i];
      client.postMessage(data, { targetOrigin: "*" });
    }
  }
})();
