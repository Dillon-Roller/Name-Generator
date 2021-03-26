'use strict'
//Create object for Markov Chain
function MarkovChain() {
  this.transitions = [];
  this.names = [];
  
  this.ctoi = function(c) {
    c.toLowerCase()
    c.charCodeAt(0) - 97
  };
  this.updateTransitions = function(word) {
    return;
  };
  this.setNames = function(s) {
    this.names = s.split(',');
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


