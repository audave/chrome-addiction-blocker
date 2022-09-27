
async function loadSettings() {
  chrome.storage.sync.get("sites", async ({sites}) => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    let url = new URL(tab.url);
    if (typeof sites[url.hostname] != 'undefined') {
      console.log(sites);
      document.getElementById("greyscale").checked = sites[url.hostname].greyscale;
      document.getElementById("autologout").checked = sites[url.hostname].autologout;
      document.getElementById("delay").value = sites[url.hostname].delay;

    }
  });
}

loadSettings();

let annoyanceOptions = document.getElementsByClassName('form-input');
for(var i = 0; i < annoyanceOptions.length; i++) {
  (function(index) {
    annoyanceOptions[index].addEventListener("change", function() {
      saveSettings();
    })
  })(i);
}

async function saveSettings() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let url = new URL(tab.url);
  var site_config = {
    url: url.hostname,
    greyscale: document.getElementById("greyscale").checked,
    autologout: document.getElementById("autologout").checked,
    delay: document.getElementById("delay").value,
  }
  let somevar = chrome.storage.sync.get('sites', ({ sites }) => {
    if(typeof sites === 'undefined') {
      sites = new Object();
    }
    sites[url.hostname] = site_config;
    // let url = new URL(tab.url);
    // sites.url.hostname = site_config
    // sites.push(site_config);
    chrome.storage.sync.set({sites});
  });
}
