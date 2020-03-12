const s = document.createElement('script');
const r = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.runtime.getURL('inject3.js');
r.src = chrome.runtime.getURL('injectRusty.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
(document.head || document.documentElement).appendChild(r);
