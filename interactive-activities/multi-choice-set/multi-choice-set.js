// Questions
const questions = [
  {
    question: "Which of one of these items cannot be secured by IMS?",
    answers: [
      { text: "Transactions", correct: false },
      { text: "Commands", correct: false },
      { text: "Data sets", correct: false },
      { text: "Mobile applications", correct: true },
    ],
  },
  {
    question:
      "Security levels can be affected by the following IMS elements? Select all that apply.",
    answers: [
      { text: "The version of the application in use", correct: false },
      { text: "IMS JCL overrides", correct: true },
      { text: "RACF definitions", correct: true },
      { text: "IMS command options", correct: true },
    ],
  },
  {
    question:
      "Which of these security facilities are provided by the IMS product. Select all that apply.",
    answers: [
      { text: "SAF", correct: false },
      { text: "Encryption", correct: false },
      { text: "Parameters within the PSB generation", correct: true },
      { text: "Installation exit routines", correct: true },
    ],
  },
];

const quiz = document.getElementById("mc-quiz");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");

let currQuestionIndex = 0;
let score = 0;
let setComplete = false;

/**
 * Initializes the quiz
 */
function startQuiz() {
  currQuestionIndex = 0;
  score = 0;
  setComplete = false;

  feedback.innerHTML = "";
  nextBtn.innerHTML = "Next";

  showQuestion(currQuestionIndex);
}

/**
 * Show question and answers
 */
function showQuestion(index) {
  // Get current question based on current index
  let currQuestion = questions[index];
  // Update question with correct question number
  let newQuestion = index + 1;

  // Create question group and attach to quiz
  const questionGroup = document.createElement("div");
  questionGroup.id = "group" + index;
  quiz.appendChild(questionGroup);

  // Create question element and attach to group
  const question = document.createElement("h2");
  question.id = questionGroup.id + "_" + "question";
  question.innerHTML =
    newQuestion + "/" + questions.length + "<br/>" + currQuestion.question;
  questionGroup.appendChild(question);

  // Create answer group and attach to group
  const ansGroup = document.createElement("cds-checkbox-group");
  ansGroup.orientation = "vertical";
  ansGroup.classList.add("answer-btns");
  questionGroup.appendChild(ansGroup);

  // Button id
  let btnId = 0;
  // For each answer of current question...
  currQuestion.answers.forEach((answer) => {
    // Create new button
    const btn = document.createElement("cds-checkbox");
    // Set id and increment
    btn.id = questionGroup.id + "_" + btnId;
    btnId++;
    // Populate answer text
    btn.innerHTML = answer.text;
    btn.classList.add("btn");
    // Add button to answer button group
    ansGroup.appendChild(btn);

    // Set dataset property custom attribute correct to true if answer is correct
    if (answer.correct) {
      btn.dataset.correct = answer.correct;
    }

    // Event listener for checkbox change
    btn.addEventListener("cds-checkbox-changed", selectButton);
  });
}

/**
 * Hide question group
 */
function hideQuestionGroup(index) {
  const questionGroup = document.getElementById("group" + index);
  questionGroup.style.display = "none";
}

/**
 * Show question group
 */
function showQuestionGroup(index) {
  const questionGroup = document.getElementById("group" + index);
  questionGroup.style.display = "block";
}

/**
 * Remove question group
 */
function removeQuestionGroup(index) {
  const questionGroup = document.getElementById("group" + index);
  questionGroup.remove();
}

/**
 * When button is selected, toggle 'selected' class
 */
function selectButton(e) {
  const selectedBtn = e.target;
  selectedBtn.classList.toggle("selected");
}

/**
 * Calculate the score for question
 */
function calculateAnswer(index) {
  let tempScore = 0; // Stores whether the answer for current checkbox is correct
  let totalScore = 0; // Stores total number of checkboxes needed to be checked for entire question to be correct
  let incorrectAnswer = false;
  let group = document.getElementById("group" + index);
  let answerBtn = group.getElementsByClassName("answer-btns");
  let btnContainer = answerBtn[0];

  // Iterate through answers
  Array.from(btnContainer.children).forEach((btn) => {
    // If answer was selected, update checkbox class based on if answer is correct
    if (btn.classList.contains("selected")) {
      if (btn.dataset.correct === "true") {
        btn.classList.add("correct");
        tempScore++;
      } else {
        btn.classList.add("incorrect");
        incorrectAnswer = true;
      }
    }

    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
      totalScore++;
    }
    btn.disabled = true;
  });

  // If number of selected answers is equivalent to total number of correct answers and no incorrect answers were selected, increase the player's score
  if (totalScore === tempScore && !incorrectAnswer) {
    score++;
  }
}

function showScore() {
  feedback.innerHTML =
    "You scored " + score + " out of " + questions.length + ".";
  nextBtn.innerHTML = "Restart";
}

function handleNextBtn() {
  // If the quiz has not been completed...
  if (setComplete === false) {
    // Hide the current question
    hideQuestionGroup(currQuestionIndex);
    // Calcuate the score based on the current question
    calculateAnswer(currQuestionIndex);

    currQuestionIndex++;
    // If there are more questions to be answered...
    if (currQuestionIndex < questions.length) {
      // Show the next question
      showQuestion(currQuestionIndex);
    } else {
      // Show all questions and their correct answers
      for (let i = 0; i < questions.length; i++) {
        showQuestionGroup(i);
      }
      // Show the score
      showScore();
      setComplete = true;
    }
    // If the quiz is complete...
  } else {
    for (let i = 0; i < questions.length; i++) {
      // Remove all questions
      removeQuestionGroup(i);
    }
    // Restart the quiz
    startQuiz();
  }
}

// Add event listener to next button
nextBtn.addEventListener("click", () => handleNextBtn());

startQuiz();
