
chrome.runtime.onMessage.addListener(firePageProcessing);


function firePageProcessing(configData){
    
    if(configData.dictionaryName.substring(0, 8)=="https://"){ //z popup.js w obiekcie configData siedzi nazwa pliku, dodałem że może być też URL i to wtedy trzeba obsłużyć
        //z netu bo nazwa jest od https://
        getDictionaryFromHTTPS(configData,refreshlist);
    }
    else{ //jak nie ma to leci tak jak poprzednio
    
    $.getJSON(chrome.extension.getURL('/config/' + configData.dictionaryName), function (dictionary) {
       //to tak kontrolnie żeby zobaczyć co jest podmieniane
        // console.log([configData]);
        
        var wordsToUnderline = dictionary.words;
        wordsToUnderline.sort(function(a, b) {
            return a.length - b.length || a.localeCompare(b);
        });
     
        processPage(wordsToUnderline, configData.underlineWords, configData.blureWords);
    });
    
    }
    
}

function processPage(wordsToUnderline, underlineWords, blureWords) {
    
    var queue = [document.body];

    var currentElement;
    
    while (currentElement = queue.pop()) {
       
        for (var i = 0; i < currentElement.childNodes.length; ++i) {
      
            switch (currentElement.childNodes[i].nodeType) {
                
                case Node.TEXT_NODE:
        
                    processText(currentElement.childNodes[i], wordsToUnderline, underlineWords, blureWords);
                    break;
             
                case Node.ELEMENT_NODE:
                  
                    if (currentElement.childNodes[i].tagName === 'INPUT') {
                        processInput(currentElement.childNodes[i], wordsToUnderline, underlineWords, blureWords);
                    } else {
                       
                        queue.push(currentElement.childNodes[i]);
                    }
                    break;
            }
        }
    }
}


function processText(node, wordsToUnderline, underlineWords, blureWords) {
    var text = node.textContent;
   
    for(var j = 0; j < wordsToUnderline.length; j++) {
       
       
        var regex = new RegExp("(" + wordsToUnderline[j] + ")", "ig");
        if (underlineWords) {
       
            text = text.replace(regex, '<u>$1</u>')
        } else if (blureWords) {
       
            text = text.replace(regex, '<span style="color: transparent;text-shadow: 0 0 5px rgba(0,0,0,0.5);">$1</span>')
        }
    }
    
    $(node).replaceWith(text);
}


function getDictionaryFromHTTPS(configData,callback){ //tu podobna funkcja jak getListFromHTTP, ale ona odpala callback (z naszymi configamibo my tylko pobieramy (na żywo) słownik.
    var xhr = new XMLHttpRequest();
xhr.open("GET", configData.dictionaryName, true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    var resp = JSON.parse(xhr.responseText);
    console.log(resp);
    callback(resp,configData);
  }
}
xhr.send();
}
function refreshlist(dictionary, configData) { 
    // tutaj jest to samo co w liniach 17-22 tylko tu leci mój obiekt dictionary (z netu pobrany)
    
      var wordsToUnderline = dictionary.words;
        wordsToUnderline.sort(function(a, b) {
            return a.length - b.length || a.localeCompare(b);
        });
     
        processPage(wordsToUnderline, configData.underlineWords, configData.blureWords);
    
}

function processInput(inputElement, wordsToUnderline, underlineWords, blureWords) {

    var text = inputElement.value;

    var inputContainsWordsFromDictionary = false;

    for(var j = 0; j < wordsToUnderline.length; j++) {
     
        var regex = new RegExp("(" + wordsToUnderline[j] + ")", "ig");
      
        if (!inputContainsWordsFromDictionary && regex.test(text)) {
        inputContainsWordsFromDictionary = true;
        }
    }


    if (inputContainsWordsFromDictionary && underlineWords) {
        
        inputElement.style.textDecoration = 'underline';
    } else if (inputContainsWordsFromDictionary && blureWords) {
       
        inputElement.style.color = "transparent";

        inputElement.style.textShadow = "0 0 5px rgba(0,0,0,0.5)";
    }
}
