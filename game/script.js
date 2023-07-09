// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");
const nextBtn = document.querySelector(".Bnext");

const scoreNumberComputer = document.querySelector(".score__number1");
const scoreNumberUser = document.querySelector(".score__number2");

let computerScore = 0;
let userScore = 0;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultDivs[0].classList.toggle("winner");
      playAgainBtn.innerText = "Play again";
      updateScoreUser(1);

      if (userScore >= 15) {
        nextBtn.style.display = "block";
      }
    } else if (aiWins) {
      resultDivs[1].classList.toggle("winner");
      playAgainBtn.innerText = "Play again";
      updateScoreComputer(1);
    } else {
      playAgainBtn.innerText = "Replay";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");

    if (userScore == 15) {
      resultText.innerHTML = `
      <span class="you-win">You win</span>
      <span class="against-pc">against PC</span>
    `;
      nextBtn.style.display = "block";
    } else if (computerScore == 15) {
      resultText.innerHTML = `
      <span class="you-win">You lose</span>
      <span class="against-pc">against PC!</span>
    `;
    }
    localStorage.setItem("computerScore", computerScore.toString());
    localStorage.setItem("userScore", userScore.toString());
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function updateScoreComputer(points) {
  computerScore += points;
  scoreNumberComputer.textContent = computerScore;
}

function updateScoreUser(points) {
  userScore += points;
  scoreNumberUser.textContent = userScore;
}

function resetScores() {
  computerScore = 0;
  userScore = 0;
  scoreNumberComputer.textContent = computerScore;
  scoreNumberUser.textContent = userScore;
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");

  if (userScore == 15 || computerScore == 15) {
    resetScores();
  }

  nextBtn.style.display = "none";
});

// Next Button Event Listener
nextBtn.addEventListener("click", () => {
  goToHurrayPage();
});

function goToHurrayPage() {
  window.location.href = "win.html";
}

function goToIndexPage() {
  window.location.href = "index.html";
}

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
