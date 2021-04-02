'use strict'
//Create object for Markov Chain
class MarkovChain {
  //transitions[i][j] corresponds to the probability that letter i goes to letter j
  #transitions = [];

  //one long 
  #names;

  //letterCounts[i][j] corresponds to the number of times letter i goes to letter j
  #letterCounts; 

  constructor(order) {
    this.fillCountArray(order);
  }

  generateName() {
    let result = this.generateLetters(" ", 0);
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  generateLetters(c, i) {
    if(i > 10) { 
      //if outside bounds
      return "";
    }
    let index = MarkovChain.charToInt(c);
    let row = this.#transitions[index];
    let letter = this.realizeLetter(row);
    if(letter == " ") { 
      if(i > 1) {
        //only end on a blank character if we are more than 1 character.
        return "";
      }
      //else try this letter again
      return this.generateLetters(c, i);
    }
    return letter + this.generateLetters(letter, i + 1);
  }
  //works
  realizeLetter(v) {
    let sum = 0.0
    let num = Math.random();

    for(let i = 0; i < 27; i++) {
      sum += v[i];
      if(num <= sum) {
        return MarkovChain.intToChar(i);
      }
    }
  }
  //tested
  fillCountArray(order) {
    this.#letterCounts = this.zeros([26**order + 1, 27]);
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
  }

  updateCount(from, to) {
    this.#letterCounts[MarkovChain.charToInt(from)][MarkovChain.charToInt(to)] += 1;
  }

  updateTransitions() {
    MarkovChain.copy2dArray(this.#letterCounts, this.#transitions)
  
    //convert rows to stochastic vectors
    for(let i = 0; i < this.#transitions.length; i++) {
      MarkovChain.normalize(this.#transitions[i]);
    }
  }
  static copy2dArray(from, to) {
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
    s = s.replace(/\s/g, "");
    this.#names =  " " + s.replace(/,/g, " ");
  };

  getNames() {
    return this.#names;
  }
}

