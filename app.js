'use strict'

const switcher = document.getElementById('theme');

var darkmode_enabled = true;

switcher.addEventListener('click', function() {
  if(!darkmode_enabled) {
    document.body.className = "dark-theme";
    this.textContent = "Light"
  }
  else {
    document.body.className = "light-theme";
    this.textContent = "Dark"
  }
  darkmode_enabled = !darkmode_enabled;
}); 