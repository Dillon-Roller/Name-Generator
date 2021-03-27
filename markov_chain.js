'use strict'
//Create object for Markov Chain
class MarkovChain {
  //transitions[i][j] corresponds to the probability that letter i goes to letter j
  #transitions;

  //one long 
  #names;

  //letterCounts[i][j] corresponds to the number of times letter i goes to letter j
  #letterCounts; 

  constructor() {
    this.fillArrays();
  }

  //tested
  fillArrays() {
    this.#transitions = this.zeros([27, 27]);
  }

  zeros(dimensions) {
    var array = [];
    for (var i = 0; i < dimensions[0]; ++i) {
      array.push(dimensions.length == 1 ? 0 : this.zeros(dimensions.slice(1)));
    }
    return array;
  }

  //not tested
  static charToInt(c) {
    if(c == " ") {
      return 26; //blank character is end state for chain
    }
    else {
      return c.toLowerCase().charCodeAt(0) - 97;
    }
  }

  //not tested
  static intToChar(n) {
    return String.fromCharCode(97 + n);
  }

  //not tested
  updateTransitions() {
    for(let i = 0; i < this.#names.length - 1; i++) {
      this.update(this.#names[i], this.#names[i + 1]);
    }

    //last character in list always goes to end state
    this.update(this.#names[this.#names.length - 1], " ");
    
    //convert rows to stochastic vectors
    for(let i = 0; i < this.#transitions.length; i++) {
      MarkovChain.normalize(this.#transitions[i]);
    }
    console.log(this.#transitions);
  };

  update(from, to) {
    this.#transitions[MarkovChain.charToInt(from)][MarkovChain.charToInt(to)]++;
  }

  static normalize(v) {
    let sum = v.reduce((a, b) => a + b);
    for(let i in v) {
      if(v[i] !== 0) {
        v[i] /= sum;
      }  
    }
  }

  setNames(s) {
    //TODO: improve this method
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
  markov.updateTransitions();
});