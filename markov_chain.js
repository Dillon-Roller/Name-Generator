'use strict'
//Create object for Markov Chain
class MarkovChain {
  #transitions;
  #names;
  #startLetterCounts;
  #endLetterCounts;
  #letterCounts;

  constructor() {
    //fill arrays
  }

  //not tested
  static charToInt(c) {
    result = c.toLowerCase().charCodeAt(0) - 97
    console.log(c + "-->" + result)
    return result;
  }

  //not tested
  static intToChar(n) {
    return String.fromCharCode(97 + n);
  }

  //not tested
  updateTransitions() {

  };

  setNames(s) {
    this.#names = s.replace(/,/g, " ");
  };

  getNames() {
    return this.#names;
  }
}

//works
$("#namesTextBox").keyup(function(event) {
  if (event.keyCode === 13) { //enter is pressed in textbox
    $("#namesButton").click();
  }
});

//create markov object
let markov = new MarkovChain();

//works
$("#namesButton").click(function() {
  markov.setNames($("#namesTextBox").val());
  console.log("Names: " + markov.getNames());
});