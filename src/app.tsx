import ReactDOM from "react-dom";
import React from "react";
import TrayButton from "./tray-button";


// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElm(selector: string) {
  return new Promise<Element|null>((resolve, reject) => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

async function main() {
  // This will be executed every time Spotify starts up.
  while (!Spicetify?.showNotification) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }  

  // The tray may or may not be visible at this point, we must check and wait.
  const traySelector = ".mwpJrmCgLlVkJVtWjlI1";
  waitForElm(traySelector).then((tray) => {
    if (tray && !tray.querySelector("#st-container") && tray.firstChild) {
      const container = document.createElement("div");
      container.setAttribute("id", "st-container");
      tray.insertBefore(container, tray.firstChild.nextSibling);
      Spicetify.showNotification("Container inserted");
      ReactDOM.render(<TrayButton/>, container);
    }
  })

  // Show message on start.
  Spicetify.showNotification("sleep-timer loaded!");
}

export default main;
