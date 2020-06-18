// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// @ts-ignore
window.addEventListener("DOMContentLoaded", () => {
  let replaceText = (selector, text) => {
    // @ts-ignore
    let element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (let type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, (process.versions)[type]);
  }
});
