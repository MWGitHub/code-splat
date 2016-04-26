import IntroJS from 'intro.js';

let played = {};
let current = null;

let Tour = {
  play: function(name) {
    if (localStorage && localStorage.getItem(name)) return;
    if (played[name]) return;
    localStorage.setItem(name, true);
    played[name] = true;
    let intro = IntroJS.introJs()
    current = intro;
    current.setOptions({
      showBullets: false,
      showStepNumbers: false
    });
    current.start();
  },

  exit: function() {
    current && current.exit();
  }
};

export default Tour;
