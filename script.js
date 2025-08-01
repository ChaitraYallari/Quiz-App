const quizIntro = document.getElementById("quizIntro");
const quizContent = document.getElementById("quizContent");
const quizResult = document.getElementById("quizResult");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const timerDisplay = document.getElementById("timer");
const finalScore = document.getElementById("finalScore");
const answersReview = document.getElementById("answersReview");

// Quiz JSON data
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: "Paris"
  },
  {
    question: "Which language is used for web development?",
    options: ["Python", "C++", "JavaScript", "Java"],
    correct: "JavaScript"
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Newton", "Einstein", "Tesla", "Edison"],
    correct: "Einstein"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correct: "Mars"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let userAnswers = [];

// Start Quiz
startBtn.addEventListener("click", () => {
  quizIntro.classList.add("hide");
  quizContent.classList.remove("hide");
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  loadQuestion();
});

// Load Question
function loadQuestion() {
  clearInterval(timer);
  timeLeft = 60;
  timerDisplay.textContent = `⏱️ ${timeLeft}s`;

  const currentQ = quizData[currentQuestionIndex];
  questionText.textContent = currentQ.question;
  optionsContainer.innerHTML = "";

  currentQ.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(button, currentQ.correct));
    optionsContainer.appendChild(button);
  });

  nextBtn.classList.add("hide");

  // Start Timer
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏱️ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      score--; // deduct for skipping
      userAnswers.push({ 
        question: currentQ.question, 
        answer: "Skipped", 
        correct: currentQ.correct 
      });
      goNext();
    }
  }, 1000);
}

// Select Answer
function selectAnswer(button, correctAnswer) {
  clearInterval(timer);
  const options = optionsContainer.querySelectorAll("button");
  options.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
    if (btn !== button && btn.textContent !== correctAnswer) {
      btn.classList.remove("wrong");
    }
  });

  if (button.textContent === correctAnswer) {
    button.classList.add("correct");
    score++;
    userAnswers.push({ 
      question: questionText.textContent, 
      answer: button.textContent, 
      correct: correctAnswer 
    });
  } else {
    button.classList.add("wrong");
    userAnswers.push({ 
      question: questionText.textContent, 
      answer: button.textContent, 
      correct: correctAnswer 
    });
  }

  nextBtn.classList.remove("hide");
}

// Next Question
nextBtn.addEventListener("click", goNext);

function goNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// End Quiz
function endQuiz() {
  quizContent.classList.add("hide");
  quizResult.classList.remove("hide");
  finalScore.textContent = `Your Score: ${score} / ${quizData.length}`;

  answersReview.innerHTML = "<h3>Review:</h3>";
  userAnswers.forEach(item => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>Q:</strong> ${item.question}<br>
                   <strong>Your Answer:</strong> ${item.answer}<br>
                   <strong>Correct:</strong> ${item.correct}`;
    answersReview.appendChild(p);
  });
}

// Restart Quiz
restartBtn.addEventListener("click", () => {
  quizResult.classList.add("hide");
  quizIntro.classList.remove("hide");
});
