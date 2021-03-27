'use strict'
//Create object for Markov Chain
class MarkovChain {
  //transitions[i][j] corresponds to the probability that letter i goes to letter j
  #transitions = [];

  //one long 
  #names;

  //letterCounts[i][j] corresponds to the number of times letter i goes to letter j
  #letterCounts; 

  constructor() {
    this.fillArrays();
  }

  generateName() {
    return this.generateLetters("a");
  }

  generateLetters(c) {
    if(c == " ") { //base case
      return "";
    }
    let row = this.#transitions[MarkovChain.charToInt(c)];
    let letter = this.realizeLetter(row)
    return letter + this.generateLetters(letter);
  }

  realizeLetter(v) {
    let sum = 0.0
    let num = Math.random();

    for(let i = 0; i < 26; i++) {
      sum += v[i];
      if(num <= sum) {
        return MarkovChain.intToChar(i);
      }
    }
  }
  //tested
  fillArrays() {
    //this.#transitions = this.zeros([27, 27]);
    this.#letterCounts = this.zeros([27, 27]);
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
    return c == " " ? 26 : c.toLowerCase().charCodeAt(0) - 97;
  }

  //not tested
  static intToChar(n) {
    return n == 26 ? " " : String.fromCharCode(97 + n);
  }

  //not tested
  updateCounts() {
    for(let i = 0; i < this.#names.length - 1; i++) {
      this.updateCount(this.#names[i], this.#names[i + 1]);
    }

    //last character in list always goes to end state
    this.updateCount(this.#names[this.#names.length - 1], " ");
    console.log(this.#letterCounts);
  };

  updateCount(from, to) {
    this.#letterCounts[MarkovChain.charToInt(from)][MarkovChain.charToInt(to)] += 1;
  }

  updateTransitions() {
    this.copy2dArray(this.#letterCounts, this.#transitions)
    
    console.log(this.#transitions);
    //convert rows to stochastic vectors
    for(let i = 0; i < this.#transitions.length; i++) {
      MarkovChain.normalize(this.#transitions[i]);
    }
  }
  copy2dArray(from, to) {
    for (var i = 0; i < from.length; i++) {
      to[i] = from[i].slice();
    }
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
    s = s.replace(/\s/g, "");
    this.#names =  " " + s.replace(/,/g, " ");
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
  markov.updateCounts();
  markov.updateTransitions();
  markov.generateName();
});
