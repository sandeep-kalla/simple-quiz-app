const questions = [
    {
        question: "which team won the first IPL?",
        answer: [
            { text: "Rajasthan Royals", correct: true},
            { text: "Chennai Super Kings", correct: false},
            { text: "Mumbai Indians", correct: false},
            { text: "Deccan Chargers", correct: false},
        ]
    },
    {
        question: "Who holds the record for the fastest IPL century?",
        answer: [
            { text: "Virat Kohli", correct: false},
            { text: "Rohit Sharma", correct: false},
            { text: "AB de Villiers", correct: false},
            { text: "Chris Gale", correct: true},
        ]
    },
    {
        question: " How many teams currently participate in the IPL?",
        answer: [
            { text: "8", correct: false},
            { text: "10", correct: true},
            { text: "12", correct: false},
            { text: "14", correct: false},
        ]
    },
    {
        question: " Who lifted the IPL trophy in 2019, defeating MS Dhoni-led Chennai Super Kings in the finals?",
        answer: [
            { text: "Rajasthan Royals", correct: false},
            { text: "Royal Challengers Bengaluru", correct: false},
            { text: "Mumbai Indians", correct: true},
            { text: "Sunrisers Hyderabad", correct: false},
        ]
    },
    {
        question: "which batsman have taken a hattrick in two Balls?",
        answer: [
            { text: "Rohit Sharma", correct: false},
            { text: "Sunil Narine", correct: false},
            { text: "Praveen Tambe", correct: true},
            { text: "Sam Curran", correct: false},
        ]
    }
    // {
    //     question: "which team won the first IPL ?",
    //     answer: [
    //         { text: "Rajasthan Royals", correct: true},
    //         { text: "Chennai Super Kings", correct: false},
    //         { text: "Mumbai Indians", correct: false},
    //         { text: "Deccan Chargers", correct: false},
    //     ]
    // },
    // {
    //     question: "which team won the first IPL ?",
    //     answer: [
    //         { text: "Rajasthan Royals", correct: true},
    //         { text: "Chennai Super Kings", correct: false},
    //         { text: "Mumbai Indians", correct: false},
    //         { text: "Deccan Chargers", correct: false},
    //     ]
    // },
    // {
    //     question: "which team won the first IPL ?",
    //     answer: [
    //         { text: "Rajasthan Royals", correct: true},
    //         { text: "Chennai Super Kings", correct: false},
    //         { text: "Mumbai Indians", correct: false},
    //         { text: "Deccan Chargers", correct: false},
    //     ]
    // },
    // {
    //     question: "which team won the first IPL ?",
    //     answer: [
    //         { text: "Rajasthan Royals", correct: true},
    //         { text: "Chennai Super Kings", correct: false},
    //         { text: "Mumbai Indians", correct: false},
    //         { text: "Deccan Chargers", correct: false},
    //     ]
    // },
    // {
    //     question: "which team won the first IPL ?",
    //     answer: [
    //         { text: "Rajasthan Royals", correct: true},
    //         { text: "Chennai Super Kings", correct: false},
    //         { text: "Mumbai Indians", correct: false},
    //         { text: "Deccan Chargers", correct: false},
    //     ]
    // },
];

//intro audio IPL surprise :)
document.addEventListener('DOMContentLoaded', (event) => {
    const introAudio = new Audio('intro.mp3');
    introAudio.play();
});


window.addEventListener('DOMContentLoaded', (event) => {
    const introAudio = document.getElementById('introAudio');
    introAudio.play();
});

const questionElement = document.getElementById("question");
const answerButtonElement = document.querySelector(".answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const finalMessageElement = document.getElementById("final-message");

let currentQuestionNumber = 0;
let score = 0;
let answered = false; // Flag to check if the user has already answered the current question

function startQuiz() {
    currentQuestionNumber = 0;
    score = 0;
    answered = false;
    nextButton.innerText = "Next";
    finalMessageElement.style.display = "none"; // Hide final message
    showQuestion();
}

function showQuestion() {
    answerButtonElement.innerHTML = "";
    let currentQuestion = questions[currentQuestionNumber];
    let questionNumber = currentQuestionNumber + 1;
    questionElement.innerText = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => {
            if (!answered) { // Only allow answer selection if not already answered
                selectAnswer(button, answer.correct);
                answered = true;
            }
        });
        answerButtonElement.appendChild(button);
    });
}

function selectAnswer(button, correct) {
    if (correct) {
        button.classList.add("btn-correct"); // Add class for correct answer
        score++;
    } else {
        button.classList.add("btn-incorrect"); // Add class for incorrect answer
    }
    // Disable all buttons after an answer is selected
    document.querySelectorAll(".btn").forEach(btn => btn.disabled = true);

    updateScore();
}

nextButton.addEventListener("click", () => {
    if (answered || currentQuestionNumber === questions.length - 1) {
        currentQuestionNumber++;
        if (currentQuestionNumber < questions.length) {
            showQuestion();
            answered = false; // Reset the answered flag for the next question
        } else {
            // Quiz ended
            nextButton.style.display = "none"; // Hide next button
            finalMessageElement.style.display = "block"; // Show final message container

            // Display final message with emoji based on score
            if (score === 5) {
                finalMessageElement.innerHTML = "Congratulations! 🎉 You passed the quiz with Perfect Score!";
                finalMessageElement.classList.add("final-message-passed");
            }else if (score >= Math.floor(questions.length / 2)) {
                finalMessageElement.innerHTML = "Congratulations! 🤯 You passed the quiz!";
                finalMessageElement.classList.add("final-message-passed");
            }else {
                finalMessageElement.innerHTML = "Oops! 😭 You didn't pass the quiz.Cricket is not made for you !";
                finalMessageElement.classList.add("final-message-failed");
            }
        }
    } else {
        // Show message in main quiz container
        finalMessageElement.innerHTML = "Please select an answer before moving to the next question.";
        finalMessageElement.style.display = "block";
    }
});


function updateScore() {
    scoreElement.innerText = "Score: " + score + "/" + questions.length;
}



startQuiz();





