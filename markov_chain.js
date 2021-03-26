'use strict'
//Create object for Markov Chain
function MarkovChain() {
  this.transitions;
  this.names;
  this.startLetterCounts;
  this.endLetterCounts;
  this.letterCounts;
  
  this.charToInt = function(c) {
    return c.toLowerCase().charCodeAt(0) - 97;
  };

  this.intToChar = function(n) {
    return String.fromCharCode(97 + n)
  }

  this.updateTransitions = function() {

  };
  
  this.setNames = function(s) {
    this.names = s.replace(/,/g, " ");
  };
}

$("#namesTextBox").keyup(function(event) {
  if (event.keyCode === 13) { //enter is pressed in textbox
    $("#namesButton").click();
  }
});

let markov = new MarkovChain();

const enterNamesButton = document.getElementById('namesButton');
enterNamesButton.addEventListener('click', function() {
  markov.setNames(document.getElementById('namesTextBox').value)
}); 


