
document.addEventListener('DOMContentLoaded', function() {

  var processButton = document.getElementById('processButton');
 
  processButton.addEventListener('click', processPage);
  
  //zdarzenie klikniecia w napis do ladowania
  var loadbutton = document.getElementById('laduj');
  loadbutton.addEventListener('click', getListFromHTTP);
  
}, false);

function processPage() {

  var dictionarySelect = document.getElementById('dictionarySelect');
 
  var selectedDictionary = dictionarySelect.options[dictionarySelect.selectedIndex].value;

  var wordProcessingSelect = document.getElementById('wordProcessingSelect');
  var wordProcessing = wordProcessingSelect.options[wordProcessingSelect.selectedIndex].value;

  var dictionaryName;

  if (selectedDictionary === 'RESOURCE1') {
      dictionaryName = 'res1.json';
  } else if (selectedDictionary === 'RESOURCE2'){ //trzeba zrobic else if 
    
      dictionaryName = 'res2.json';
  }else{  //wtedy jak sie wybierze z online to mozna ten url to zaladowac do przetwarzania
      dictionaryName = selectedDictionary;
}

  var underlineWords = wordProcessing === 'UNDERLINE';
 
  var blureWords = wordProcessing === 'BLURE';


  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  
    chrome.tabs.executeScript(tabs[0].id , {
      file: 'jquery.js' //jquery 3.2.1
    }, function() {
      
      chrome.tabs.executeScript(tabs[0].id, {
        file: 'processPageScript.js'
      }, function() {
        
        chrome.tabs.sendMessage(tabs[0].id,{
            dictionaryName: dictionaryName,
            underlineWords: underlineWords,
            blureWords: blureWords
        });
       
        window.close();
      });
    });
  });

}

function getListFromHTTP(){
    //zapytanie o zasób ze słownikami
    //{
	//    "dictionaries": [
	//         "https://users.pja.edu.pl/~kaszubat/test.json",
	//         "https://users.pja.edu.pl/~kaszubat/test1.json"
	//     ]
    //}
    
    var xhr = new XMLHttpRequest();
xhr.open("GET", "https://users.pja.edu.pl/~kaszubat/dictionaries.json", true); //żeby chodziło trzeba dodać w manifeście FQDN - dodałem cały pjatk z https tu instrukcja https://developer.chrome.com/extensions/xhr
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    var resp = JSON.parse(xhr.responseText);
    
    var dictionarySelect = document.getElementById('dictionarySelect');
    
    for (var i = 0; i < resp.dictionaries.length; i++) {//dodanie do listy słowników najnowszych z netu. to na szybko - jak sie kliknie pare razy to doda wiecej wiec trzeba usunać poprzednie :)
		var btn = document.createElement("option");
		btn.value = resp.dictionaries[i];
		var t = document.createTextNode(resp.dictionaries[i]);
		btn.appendChild(t);
		dictionarySelect.appendChild(btn);        
	}
  }
}
xhr.send();
}
