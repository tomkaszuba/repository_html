//start.js
//alert("Hello from your Chrome extension!"); 
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    //  var firstHref = $("a[href^='http']").eq(0).attr("href");
        alert("Hello from your Chrome extension!");
        console.log(request);
        console.log(sender);
        console.log(sendResponse);
        chrome.runtime.sendMessage({"message": "open_new_tab", "url": "https://users.pja.edu.pl/~kaszubat/"});
      //  chrome.tabs.create({"url": "https://users.pja.edu.pl/~kaszubat/"});
    }
  }
);
