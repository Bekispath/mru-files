const $ = id => document.getElementById(id);

function show(id) {
  document.querySelectorAll('.screen').forEach(x => x.classList.remove('active'));

  const target = $(id);

  if (target) {
    target.classList.add('active');
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


// ================================
// CINEMATIC BOOT SEQUENCE
// ================================

const bootMessages = [
  'Decrypting...',
  'Cross-checking evidence...',
  'Matching identities...',
  'Opening final file...'
];

let progress = 0;

const bootTimer = setInterval(() => {

  progress += 2;

  const bar = $('bar');
  const bootText = $('bootText');

  if (bar) {
    bar.style.width = progress + '%';
  }

  const messageIndex = Math.min(
    bootMessages.length - 1,
    Math.floor(progress / 25)
  );

  if (bootText) {
    bootText.textContent = bootMessages[messageIndex];
  }

  if (progress >= 100) {

    clearInterval(bootTimer);

    setTimeout(() => {
      show('lock');
    }, 500);

  }

}, 35);


// ================================
// SECRET CODE INPUT
// ================================

const input = $('code');

const slots = [
  ...document.querySelectorAll('.slots b')
];

if (input) {

  input.oninput = () => {

    input.value = input.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 5);

    slots.forEach((slot, i) => {
      slot.textContent = input.value[i] || '?';
    });

  };

}


// ================================
// UNLOCK
// ================================

function unlock() {

  const err = $('err');

  if (input && input.value === 'MRU24') {

    show('reveal');

    if (err) {
      err.textContent = '';
    }

  } else {

    if (err) {
      err.textContent =
        '❌ The file rejected that code. Check the five pieces again.';
    }

    if (input) {

      input.animate(
        [
          { transform: 'translateX(-7px)' },
          { transform: 'translateX(7px)' },
          { transform: 'translateX(0)' }
        ],
        {
          duration: 250
        }
      );

    }

  }

}


const unlockButton = $('unlock');

if (unlockButton) {
  unlockButton.onclick = unlock;
}


if (input) {

  input.onkeydown = event => {

    if (event.key === 'Enter') {
      unlock();
    }

  };

}


// ================================
// LOVE LETTER
// ================================

const readButton = $('read');

if (readButton) {

  readButton.onclick = () => {

    show('letter');

    const text =
      'If someone had told me that meeting you would become one of the best parts of my life, I probably would not have believed them.';

    const typed = $('typed');
    const rest = $('rest');

    if (!typed) {
      return;
    }

    let i = 0;

    typed.textContent = '';

    if (rest) {
      rest.hidden = true;
    }

    const timer = setInterval(() => {

      typed.textContent += text[i];

      i++;

      if (i >= text.length) {

        clearInterval(timer);

        setTimeout(() => {

          if (rest) {
            rest.hidden = false;
          }

        }, 450);

      }

    }, 24);

  };

}


// ================================
// VOICE MESSAGE
// ================================

const voiceButton = $('voiceBtn');
const voice = $('voice');

if (voiceButton && voice) {

  voiceButton.onclick = () => {

    voice.style.display = 'block';

    voice.play().catch(() => {});

  };

}
