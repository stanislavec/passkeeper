// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, remote } = require("electron");
const { Base64 } = require("base64-string");
const fs = require("fs");

const base64 = new Base64();

const app = remote.app;

const readFromJson = () => {
  try {
    const row = fs.readFileSync(app.getPath("home") + "/passkeeper.json");
    return JSON.parse(row).map((item) => ({
      ...item,
      password: base64.decode(item.password),
      repeat: base64.decode(item.repeat),
    }));
  } catch (e) {
    return [];
  }
};

const writeJson = (content) => {
  fs.writeFile(
    app.getPath("home") + "/passkeeper.json",
    JSON.stringify(
      content.map((item) => {
        const { password, repeat } = item;

        return {
          ...item,
          password: base64.encode(password),
          repeat: base64.encode(repeat),
        };
      })
    ),
    "utf8",
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
};

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once("loaded", () => {
  contextBridge.exposeInMainWorld("versions", process.versions);
  contextBridge.exposeInMainWorld("passkeeper", {
    readFromJson,
    writeJson,
  });
});
