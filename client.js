(function () {
  const output = document.querySelector("#output");

  let seed = Math.floor(Math.random() * 10e10);
  function nextId() {
    seed++;
    const s = seed.toString(16);
    return s.substring(s.length - 7, s.length);
  }

  const log = {
    debug() {
      const args = Array.from(arguments);
      // console.log.apply(console, args);
      if (output) {
        // clear message out of buffer
        while (output.children.length >= 100) {
          output.children.item(0).remove();
        }

        // write new message
        const d = document.createElement("div");
        d.innerText = args.join(" ");
        output.appendChild(d);

        // scroll to end
        output.scrollTo({
          top: output.scrollHeight,
          behavior: "smooth",
        });
      }
    },
  };

  window.addEventListener("message", function ({ data, origin, source }) {
    if (data.type === "chat") {
      log.debug(`${data.id}: ${data.data}`);
    }
  });

  const input = document.querySelector("#input");

  input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      send();
    }
  });

  function send() {
    const text = input.value || "<empty>";
    input.value = "";
    parent.postMessage(
      { type: "chat", id: nextId(), data: text.trim() },
      { targetOrigin: "*" }
    );
  }

  document.querySelector("#send")?.addEventListener("click", function (e) {
    send();
  });
})();
