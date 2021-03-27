'use strict'

var darkmode_enabled = true;

//get reference to theme button and add event
$('#themeButton').click(() => {
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
