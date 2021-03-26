//Create object for Markov Chain
function MarkovChain() {
  this.transitions = [];
  
  this.ctoi = function(c) {
    c.toLowerCase()
    c.charCodeAt(0) - 97
  }
}