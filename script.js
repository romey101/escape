// Elements
const body = document.querySelector('body');
const logo = document.querySelector('.logo__img');
const mainHeading = document.querySelector('.main__heading');
const mainSection = document.querySelector('.main');
const introSection = document.querySelector('.intro');
const introBtn = document.querySelector('.intro__btn');
const gameSection = document.querySelector('.game');
const gameAnswerSection = document.querySelector('.game__answer');
const gameQuestionSection = document.querySelector('.game__question');
const form = document.querySelector('.quiz__form');
const formInput = document.querySelector('.quiz__input');
const submitBtn = document.querySelector('.btn__submit');
const feedbackImg = document.querySelector('.quiz__feedback-img');
const quizFeedback = document.querySelector('.quiz__message');

// Variables
let userAnswer;
const quizAnswer = 'air';
const errorSound = new Audio('./assets/error.mp3');
const successSound = new Audio('./assets/ping.mp3');

// Functions
const playSound = (sound) => {
  sound.play();
};

const animateElement = (element, animation) => {
  element.classList.add(animation);
  element.addEventListener(
    'animationend',
    () => {
      element.classList.remove(animation);
    },
    { once: true }
  );
};

const hideElement = (element) => {
  element.addEventListener(
    'animationend',
    () => {
      element.classList.add('hide');
    },
    { once: true }
  );
};

const initGame = () => {
  repositionElements();
  showGame();
};

const repositionElements = () => {
  logo.classList.add('logo__img--after');
  mainHeading.classList.remove('glitch');
  mainHeading.classList.add('main__heading--after');
  animateElement(introSection, 'intro--after');
  hideElement(introSection);
};

const showGame = () => {
  gameSection.classList.remove('hide');
  animateElement(gameSection, 'game--after');
  gameSection.addEventListener(
    'animationend',
    () => {
      mainSection.classList.add('main--after');
    },
    { once: true }
  );
};

const verifyAnswer = (answer) => {
  if (answer) {
    if (answer === quizAnswer) {
      showVictory();
    } else {
      showError();
    }
  }
};

const showVictory = () => {
  animateElement(gameQuestionSection, 'game_hide');
  hideElement(gameQuestionSection);
  animateElement(gameAnswerSection, 'game_hide');
  hideElement(gameAnswerSection);
  showFeedback();
  playSound(successSound);
};

const showFeedback = () => {
  feedbackImg.classList.remove('hide');
  quizFeedback.classList.remove('hide');
};

const showError = () => {
  formInput.classList.add('quiz__input_invalid');
  playSound(errorSound);
};

const clearError = () => {
  formInput.classList.remove('quiz__input_invalid');
};

// Events
introBtn.addEventListener('click', () => {
  initGame();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  userAnswer = formInput.value.trim().toLowerCase();
  verifyAnswer(userAnswer);
});

formInput.addEventListener('input', () => {
  clearError();
});
