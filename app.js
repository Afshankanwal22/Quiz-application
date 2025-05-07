const form = document.getElementById('user-form');
const formBox = document.getElementById('form-box');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const questionTitle = document.getElementById('question-title');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');

let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Tool Multi Language"],
    correct: 1
  },
  {
    question: "Which tag is used to define an image in HTML?",
    options: ["<img>", "<src>", "<pic>", "<image>"],
    correct: 0
  },
  {
    question: "What is the correct CSS syntax to change the background color?",
    options: ["body:color=blue;", "body {background-color: blue;}", "{body:blue;}", "{body;color=blue;}"],
    correct: 1
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<h3>", "<h1>", "<head>"],
    correct: 2
  },
  {
    question: "How do you write a comment in CSS?",
    options: ["// comment", "/* comment */", "<!-- comment -->", "** comment **"],
    correct: 1
  },
  {
    question: "Which property is used to change font size in CSS?",
    options: ["text-size", "font-style", "font-size", "text-style"],
    correct: 2
  },
  {
    question: "How can we link CSS to HTML?",
    options: ["<link rel='stylesheet' href='style.css'>", "<style src='style.css'>", "<css>style.css</css>", "<stylesheet>"],
    correct: 0
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Method", "Digital Output Machine", "Document Oriented Model"],
    correct: 0
  },
  {
    question: "How do you declare a variable in JavaScript?",
    options: ["var name;", "int name;", "let = name;", "declare name;"],
    correct: 0
  },
  {
    question: "Which of the following is a JavaScript data type?",
    options: ["paragraph", "float", "number", "style"],
    correct: 2
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheet", "Computer Style Sheet", "Creative Style System", "Colorful Style Sheet"],
    correct: 0
  },
  {
    question: "What is used to style HTML?",
    options: ["JavaScript", "Python", "CSS", "C++"],
    correct: 2
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["/* */", "//", "<!-- -->", "** **"],
    correct: 1
  },
  {
    question: "How do you call a function in JS?",
    options: ["function()", "call.function", "function call", "invoke function"],
    correct: 0
  },
  {
    question: "Which tag is used to create a hyperlink?",
    options: ["<a>", "<href>", "<link>", "<url>"],
    correct: 0
  }
];

function escapeHTML(str) {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  formBox.classList.add('hidden');
  quizBox.classList.remove('hidden');
  loadQuestion();
});

function loadQuestion() {
  nextBtn.disabled = true;
  const q = questions[currentQuestion];
  questionTitle.innerHTML = `Q${currentQuestion + 1}: ${escapeHTML(q.question)}`;
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="option" value="${index}"> ${escapeHTML(option)}`;
    optionsContainer.appendChild(label);
  });

  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      nextBtn.disabled = false;
    });
  });
}

nextBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) return;
  const answer = parseInt(selected.value);
  const correct = questions[currentQuestion].correct;

  if (answer === correct) {
    score += 2;
    correctAnswers++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add('hidden');
  resultBox.classList.remove('hidden');

  const totalMarks = questions.length * 2;
  const percentage = ((correctAnswers / questions.length) * 100).toFixed(0);

  resultBox.innerHTML = `  
    <h2>🎉 Quiz Completed</h2>
    <div class="circle-container">
      <div class="progress-circle">
        <span id="percentage-text">0%</span>
      </div>
    </div>
    <p><strong>Marks:</strong> ${score} / ${totalMarks}</p>
    <p><strong>Percentage:</strong> ${percentage}%</p>
    <button onclick="location.reload()">Restar Quiz</button>
  `;
const circle = document.querySelector('.progress-circle');
const percentageText = document.getElementById('percentage-text');
let current = 0;
const target = parseInt(percentage);

const progressInterval = setInterval(() => {
  if (current >= target) {
    clearInterval(progressInterval);
  } else {
    current++;
    let gradient = `conic-gradient(#5a4141 ${current * 3.6}deg, #d082d1 ${current * 3.6}deg)`; 
    circle.style.background = gradient;
    percentageText.textContent = `${current}%`;
  }
}, 20);
}

