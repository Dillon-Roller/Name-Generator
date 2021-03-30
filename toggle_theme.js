'use strict'

//run when DOM is ready
$(document).ready(function(){
  const themeButtonID = '#themeButton';
  var darkmode_enabled = true;

  $(themeButtonID).click(function() {
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
});
