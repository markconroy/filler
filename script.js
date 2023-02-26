const filler = document.querySelector("#filler");
const start = document.querySelector("#start");
const timer = document.querySelector("#timer");
let time = 0;
let number = 0;
let checkboxesFilled = 0;
let checkboxes = document.createDocumentFragment();
let checkboxesRendered;
let amountOfCheckboxes = 250;
let startTimer;
let randomChaos;

function randomNumber(number) {
  Math.floor(Math.random() * (number + 1)); 
}

for (let index = 0; index < amountOfCheckboxes; index++) {
  const element = document.createElement('div');
  element.classList.add('filler__item');
  element.innerHTML = `
    <label for="checkbox-${index}">
      <span class="sr-only">Check checkbox-${index} for a point</span>
    </label>
    <input class="sr-only" type="checkbox" id="checkbox-${index}" disabled>
  `
  checkboxes.appendChild(element);
}

filler.appendChild(checkboxes);
checkboxesRendered = document.querySelectorAll('.filler__item [type="checkbox"]');

function handleTap(e) {
  const checkbox = e.target;
  if (checkbox.checked === true) {
    checkbox.closest('.filler__item').classList.add('filler__item--filled');
    number = number + 1;
  } else {
    checkbox.closest('.filler__item').classList.remove('filler__item--filled');
    number = number - 1;
  }
  score.innerText = number;

  if (number === amountOfCheckboxes) {
    checkboxesRendered.forEach(checkbox => {
      checkbox.setAttribute('disabled', true);
    });
    start.removeAttribute('disabled');
    start.classList.add('start--ready');
    clearInterval(startTimer);
  }
}

function handleStart() {
  time = 0;
  number = 0;
  timer.innerText = time;
  score.innerText = number
  filler.removeAttribute("disabled");
  start.setAttribute('disabled', true);
  start.classList.remove('start--ready');
  checkboxesRendered.forEach(checkbox => {
    checkbox.removeAttribute('disabled');
    checkbox.checked = false;
    checkbox.closest('.filler__item').classList.remove('filler__item--filled');
  });
  startTimer = setInterval(() => {
    time = time + 1;
    timer.innerText = time;
  }, 1000);
}
  
  start.addEventListener("click", handleStart);

  checkboxesRendered.forEach(checkbox => {
    checkbox.addEventListener('click', handleTap);
  });
