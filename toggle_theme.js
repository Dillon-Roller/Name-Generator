'use strict'

var darkmode_enabled = true;

$('#themeButton').click(function() {
  if(!darkmode_enabled) {
    $('body').attr('class', 'dark-theme');
    $(this).text("Light");
  }
  else {
    $('body').attr('class', 'light-theme');
    $(this).text("Dark");
  }
  darkmode_enabled = !darkmode_enabled;
});