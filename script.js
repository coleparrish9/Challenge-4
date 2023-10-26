var startGameButton = document.getElementById("startGameButton");
var timer = document.getElementById("timer");
var scoresList = document.querySelector("#scoresListButton");
var mainQuestion = document.querySelector("#question1");

var allQuestions = [
    {
        question: "Which planet is closest in size to Earth?",
        options: ["Saturn", "Jupiter", "Venus", "Mars"],
        answer: "Venus",
    },
    {
        question: "Which ocean is largest by area?",
        options: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean",
    },
    {
        question: "What is the longest river in the world?",
        options: ["The Nile River", "Colorado River", "Amazon River", "Sacramento River"],
        answer: "The Nile River",
    },
    {
        question: "Game over! Enter first name then press enter to record score!",
        options: []

    },
]

var currentIndex = 0;
var storedScores = [];

var correctAnswers = 0;

var timeLeft = 30;
timer.textContent = timeLeft + " Seconds remaining";

var initialsValue = null;


startGameButton.addEventListener("click", function () {
    timerCountdown();
    updateQuestionText();
    clear();
    scoresList.style.display = "none";
})


function updateQuestionText() {
    document.querySelector("#buttonArea").textContent = "";
    mainQuestion.style.display = "";
    mainQuestion.textContent = allQuestions[currentIndex].question;
    for (var i = 0; i < allQuestions[currentIndex].options.length; i++) {
        var questionButton = document.createElement("button");

        questionButton.textContent = allQuestions[currentIndex].options[i];

        document.querySelector("#buttonArea").appendChild(questionButton);
        questionButton.addEventListener("click", function (event) {
            var element = event.target;
            if (element.textContent === allQuestions[currentIndex].answer) {
                nextQuestion();
                correctAnswers++;
            } else {
                nextQuestion();
                timeLeft = timeLeft - 5;
            }
        })
    }

}

function nextQuestion() {
    if (allQuestions[currentIndex].question === "Game over! Enter first name for your score then press enter!") {
        return
    }
    currentIndex++;
    updateQuestionText();
}

function timerCountdown() {
    timeLeft = 30;
    timeLeft--;
    var timeInterval = setInterval(function () {
        if (allQuestions[currentIndex].question === "Game over! Enter first name for your score then press enter!") {
            timer.textContent = timeLeft + " Your Time Score";

            document.querySelector("#buttonArea").textContent = "";

            currentIndex = 0;

            clearInterval(timeInterval);

            var score = document.getElementById("score");
            score.textContent = correctAnswers + "/3 Correct Answers";
            score.style.display = "";
            getUserInitials();



        } else if (timeLeft > 1) {
            timer.textContent = timeLeft + ' seconds remaining';
            timeLeft--;

        } else if (timeLeft === 1) {
            timer.textContent = timeLeft + ' second remaining';
            timeLeft--;

        } else {
            timer.textContent = "Times Up!";
            mainQuestion.textContent = allQuestions[allQuestions.length - 1].question;

            document.querySelector("#buttonArea").textContent = "";

            currentIndex = 0;

            clearInterval(timeInterval);

            var score = document.getElementById("score");
            score.textContent = correctAnswers + "/3 Correct Answers";
            getUserInitials();

        }
    }, 1000);
}

scoresList.addEventListener("click", function () {
    viewPastScores();
    clear();
});
document.getElementById("reset").addEventListener("click", function () {
    window.location.reload();
});

function viewPastScores() {
    timer.textContent = "";
    document.querySelector("#buttonArea").innerHTML = "";
    startGameButton.style.display = "none";

    mainQuestion.innerHTML = "";
    currentIndex = 0;
    var scoresSheet = document.getElementById("scoreSheet");
    var scoresSheetArrayValue = JSON.parse(localStorage.getItem("Stored Scores"));
    if (scoresSheetArrayValue !== "") {
        for (var i = 0; i < scoresSheetArrayValue.length; i++) {
            var element = document.createElement("p");
            element.textContent = scoresSheetArrayValue[i].name + ", " + scoresSheetArrayValue[i].time + " Time Left, " + scoresSheetArrayValue[i].score + "/3 Questions Correct";
            scoresSheet.appendChild(element);
        }
    }
}

function saveToLocalStorage() {

    const oldScores = JSON.parse(localStorage.getItem("Stored Scores")) || []
    var highScores = {
        name: initialsValue,
        score: " " + correctAnswers,
        time: " " + timeLeft,
    }
    oldScores.push(highScores);
    console.log(oldScores);
    localStorage.setItem("Stored Scores", JSON.stringify(oldScores));

}

function clear() {
    score.style.display = "none";
    startGameButton.style.display = "none";
}

function getUserInitials() {
    var userInitials = document.createElement("input");
    var quizArea = document.getElementById("quizArea");
    quizArea.appendChild(userInitials);
    userInitials.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            initialsValue = userInitials.value
            saveToLocalStorage();
            clear();
            correctAnswers = 0;
            quizArea.removeChild(userInitials);
            mainQuestion.style.display = "none";
            startGameButton.style.display = "";
            startGameButton.textContent = "Play Again?";
            scoresList.style.display = "";
        }
    })
}