
async function loadSettings() {
  chrome.storage.sync.get("sites1", async ({sites1}) => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    let url = new URL(tab.url);
    if (typeof sites1[url.hostname] != 'undefined') {
      console.log(sites1);
      document.getElementById("greyscale").checked = sites1[url.hostname].greyscale;
      document.getElementById("autologout").checked = sites1[url.hostname].autologout;
      document.getElementById("delay").value = sites1[url.hostname].delay;

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
  let somevar = chrome.storage.sync.get('sites1', ({ sites }) => {
    if(typeof sites1 === 'undefined') {
      sites1 = new Object();
    }
    sites1[url.hostname] = site_config;
    // let url = new URL(tab.url);
    // sites.url.hostname = site_config
    // sites.push(site_config);
    chrome.storage.sync.set({sites1});
  });
  // chrome.storage.sync.set({sites1});
  // console.log(sites);
  // console.log(site_config);
}
