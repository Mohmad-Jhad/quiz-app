// import local file json
import questionsJson from "../questions.json" assert { type: "json" };

//public variables
let bulletsNum = 0;
let correctAnswer = [];
// dom manipulation
const bullets = document.querySelector(".bullets");
let bullet = [];
const question = document.querySelector(".question");
const answers = document.querySelectorAll(".a");
const nextButton = document.querySelector(".nextButton");
const previousButton = document.querySelector(".previousButton");
const choiceCheck = document.getElementsByName("answer");
const box = document.querySelector(".box");
const tryAgainButton = document.querySelector(".tryAgain");

function main() {
  if (bulletsNum >= questionsJson.length) {
    showResult();
  }
  bulletsF();
  middleF();
}
main();
//init array
function initArray() {
  correctAnswer = Array.from({ length: questionsJson.length }, () => 0);
}

function bulletsF() {
  // in begin quiz
  if (bulletsNum < 1) {
    initArray();
    let str = ``;
    for (let i = 0; i < questionsJson.length - 1; i++) {
      if (i < 1) {
        str += `<span class="bullet-active bullet"></span>`;
      }
      str += `<span class="bullet bullet" ></span>`;
    }
    bullets.innerHTML = str;
    bullet = document.querySelectorAll(".bullet");
    return;
  }

  bullet.forEach(function (ele, index) {
    ele.classList.remove("bullet-active");
  });

  bullet.forEach(function (ele, index) {
    if (index <= bulletsNum) {
      ele.classList.add("bullet-active");
    }
  });
}

function middleF() {
  //set question
  question.innerHTML = questionsJson[bulletsNum].q;
  // set answers
  answers.forEach(function (ele, index) {
    const object = questionsJson[bulletsNum];
    ele.innerHTML = object[`a${++index}`];
    ele.setAttribute("value", object[`a${index}`]);
  });
}

// buttons
nextButton.onclick = function () {
  choiceProcess();
};

previousButton.onclick = function () {
  if (bulletsNum < 1) {
    showAlert("this is the first question");
    return;
  }
  bulletsNum -= 1;
  correctAnswer[bulletsNum] = 0;
  main();
};

// choice Process

function choiceProcess() {
  let selectedLabel = null;
  choiceCheck.forEach(function (ele) {
    if (ele.checked) {
      selectedLabel = ele.nextElementSibling.textContent;
      ele.checked = false;
    }
  });

  if (selectedLabel == questionsJson[bulletsNum].correctAnswer) {
    correctAnswer[bulletsNum] = 1;
  }

  if (selectedLabel !== null) {
    bulletsNum += 1;
    main();
  } else {
    showAlert("No answer selected.");
  }
}

//show result
function showResult() {
  showAlertResult();
  clear();
}
//clear
function clear() {
  let correctAnswer = 0;
  bulletsNum = 0;
  box.style.display = "none";
  tryAgainButton.style.display = "block";
}
//try again button = event click
tryAgainButton.onclick = function () {
  box.style.display = "block";
  tryAgainButton.style.display = "none";
  main();
};
// sweet alerts library

function showAlert(msg) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${msg}`,
  });
}
function showAlertResult() {
  let result = null;
  correctAnswer.forEach(function (ele) {
    if (ele == 1) ++result;
  });

  const mark = result >= questionsJson.length / 2 ? "sucss" : "faild";
  Swal.fire({
    title: `result : ${result}/${questionsJson.length} ${mark}`,
    color: "#716add",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
}
