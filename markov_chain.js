'use strict'
//Create object for Markov Chain
const ALPHABET_SIZE = 26;
class MarkovChain {
  //transitions[i][j] corresponds to the probability that letter i goes to letter j
  #transitions = [];

  //string to hold all names. Space is appended to beginning and end
  #names;

  //order of this markov chain
  #order;

  //letterCounts[i][j] corresponds to the number of times letter i goes to letter j
  #letterCounts; 

  constructor(order) {
    this.#order = order;
    this.fillCountArray();
  }

  generateName() {
    let first = this.generateFirstLetters();
    let result = first + this.generateNextLetter(first);
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  generateFirstLetters() {
    let result = ""; 
    //first letter is probability of getting that letter after a blank space
    let letter = " "; 

    for(let i = 0; i < this.#order; i++) {
      letter = this.realizeLetter(this.#transitions[this.charToInt(letter)]);
      result += letter;
    }
  }

  generateNextLetter(letters) {
    let next_letter = this.realizeLetter(this.#transitions[this.charToInt(letters)]);

    if(next_letter == " ") { //base
      return "";
    }
    return next_letter + this.generateNextLetter(letters.slice(1) + next_letter);
  }
  
  realizeLetter(v) {
    let sum = 0.0
    let num = Math.random();

    for(let i = 0; i < v.length; i++) {
      sum += v[i];
      if(num <= sum) {
        return this.intToChar(i);
      }
    }
  }
  
  fillCountArray() {
    //+1 for whitespace character
    this.#letterCounts = this.zeros([ALPHABET_SIZE**this.#order + 1, ALPHABET_SIZE + 1]);
  }

  zeros(dimensions) {
    var array = [];
    for (let i = 0; i < dimensions[0]; i++) {
      array.push(dimensions.length == 1 ? 0 : this.zeros(dimensions.slice(1)));
    }
    return array;
  }

  charToInt(c) {
    if(c.length == 1) {
      return c == " " ? ALPHABET_SIZE**this.#order + 1 : c.toLowerCase().charCodeAt(0) - 97;
    }

    let sum = 0;
    let power = c.length - 1;

    for(let i = 0; i < c.length - 1; i++) {
      sum += this.charToInt(c[i]) * ALPHABET_SIZE**power
      power--;
    }
    return sum;
  }

  intToChar(n) {
    if(n == ALPHABET_SIZE**this.#order + 1) {
      return " ";
    }
    if(n > ALPHABET_SIZE) {
      return this.intToChar(Math.trunc(n / ALPHABET_SIZE)) + this.intToChar(n % ALPHABET_SIZE);
    }
    return String.fromCharCode(97 + n);
  }

  updateCounts() {
    for(let i = 0; i < this.#names.length - 1; i++) {
      this.updateCount(this.#names[i], this.#names[i + 1]);
    }
  }

  updateCount(from, to) {
    this.#letterCounts[this.charToInt(from)][this.charToInt(to)]++;
  }

  updateTransitions() {
    MarkovChain.copy2dArray(this.#letterCounts, this.#transitions)
  
    //convert rows to stochastic vectors
    for(let i = 0; i < this.#transitions.length; i++) {
      MarkovChain.normalize(this.#transitions[i]);
    }
  }
  static copy2dArray(from, to) {
    for (let i = 0; i < from.length; i++) {
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
    this.#names =  " " + s.replace(/,/g, " ") + " ";
  };

  getNames() {
    return this.#names;
  }
}

