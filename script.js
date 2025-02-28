const questions = [
    {
    question: "Which of the following language we use to style an HTML document?",
options: ["CSS", "Java++", "C++", "Java"],
      correct: 0  // CSS is the correct answer
    },
    {
      question: "Choose the correct HTML element for the largest heading?",
options: ["<head>", "<h6>", "<heading>", "<h1>"],
      correct: 3 // <h1> is the correct answer
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      options: ["<br>", "<break>", "<lb>", "<b>"],
      correct: 0 // <br> is the correct answer
    },
    {
      question: "How do we write comments in HTML?",
      options: ["</...>", "<!...>", "</.../>", "<....!>"],
      correct: 1 // <!...> is the correct answer
    },
    {
        question: "Which is the HTML paragraph tag?",
        options: ["<p>", "<pre>", "<pr>", "<a>"],
        correct: 0 // <p> is the correct answer
      }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next");
  const skipButton = document.getElementById("skip");
  const marksElement = document.getElementById("marks");
  const playAgainButton = document.getElementById("play-again");
  const playAgainContainer = document.getElementById("play-again-container");
  
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
  
    currentQuestion.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.setAttribute("data-index", index);
      li.onclick = () => checkAnswer(index);
      optionsElement.appendChild(li);
    });
    // Trigger reanimation for each new question and options
  setTimeout(() => {
    questionElement.style.animation = "fadeInUp 0.8s ease-in-out forwards";
    const optionItems = optionsElement.querySelectorAll("li");
    optionItems.forEach((option, index) => {
      option.style.animation = `fadeInUp 0.5s ease-in-out forwards ${index * 0.1}s`;
    });
  }, 100); // Delay to ensure smooth animation on page load

  }
  
  function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionElements = optionsElement.querySelectorAll("li");
  
    if (selectedIndex === currentQuestion.correct) {
      score++;
      optionElements[selectedIndex].style.backgroundColor = "green";
    } else {
      optionElements[selectedIndex].style.backgroundColor = "red";
    }
  
    optionElements.forEach((li, index) => {
      if (index === currentQuestion.correct) {
        li.style.backgroundColor = "green"; // Mark correct option in green
      }
      li.onclick = null; // Disable further clicks on options
    });
  
    updateMarks();
    nextButton.disabled = false;
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
      nextButton.disabled = true;
    } else {
        showPlayAgain();
    }
  }
  
  function skipQuestion() {
    nextQuestion(); // Simply skip to the next question
  }
  
  function updateMarks() {
    marksElement.textContent = score;
  }
  function showPlayAgain() {
    nextButton.disabled = true;
    skipButton.disabled = true;
    playAgainContainer.style.animation = "fadeInUp 0.8s ease-in-out forwards"; 
    playAgainContainer.style.display = "block"; // Show Play Again button
  }
  
  function playAgain() {
    score = 0;
    currentQuestionIndex = 0;
    playAgainContainer.style.display = "none"; // Hide Play Again button
    nextButton.disabled = true;
    skipButton.disabled = false;
    loadQuestion();
    updateMarks();
  }
  
  loadQuestion();
  nextButton.disabled = true; // Disable Next button initially
  
