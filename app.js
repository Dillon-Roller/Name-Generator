$(document).ready(() => {
  const namesTextBoxID = '#namesTextBox';
  const updateButtonID = '#updateButton';
  const generateButtonID = '#generateButton';
  const generatedNameTextBoxID = '#generatedName';
  const themeButtonID = '#themeButton';

  var markov = new MarkovChain(1);
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

  $(namesTextBoxID).keyup(event => {
    if (event.keyCode === 13) { //enter is pressed in textbox
      $(updateButtonID).click();
    }
  });

  $(file).change(event => {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = e => {
      markov.setNames(e.target.result);
      markov.updateCounts();
      markov.updateTransitions();
    };

    reader.readAsText(file);
  });

  //works
  $(updateButtonID).click(function() {
    markov.setNames($(namesTextBoxID).val());
    markov.updateCounts();
    markov.updateTransitions();
  });

  $(generateButtonID).click(function() {
    $(generatedNameTextBoxID).text(`Generated name: ${markov.generateName()}`);
  });
});
