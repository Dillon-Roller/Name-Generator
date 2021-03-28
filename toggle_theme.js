'use strict'

var darkmode_enabled = true;

//get reference to theme button and add event
$('#themeButton').click(() => {
  if(!darkmode_enabled) {
    $('body').attr('class', 'dark-theme');
    $(this).text('Light');
  }
  else {
    $('body').attr('class', 'light-theme');
    $(this).text('Dark');
  }
  darkmode_enabled = !darkmode_enabled;
});