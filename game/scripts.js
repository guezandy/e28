console.log("JS LOADED");

const PAPER = "paper";
const SCISSOR = "scissor";
const ROCK = "rock";

const submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  console.log("Submit button clicked");
  const radioButton = document.querySelector('input[name="move"]:checked');
  const playerChoice = radioButton && radioButton.value;
  const resultText = document.getElementById("result");
  if (!playerChoice) {
    // User has not selected any option
    resultText.innerText = "Must select an option";
    return;
  }
  const options = [PAPER, SCISSOR, ROCK];
  const randomNumber = Math.floor(Math.random() * 3);
  const computerChoice = options[randomNumber];
  console.log(`Computer chooses ${computerChoice} vs ${playerChoice}`);
  // Results logic
  // Tie
  if (playerChoice === computerChoice) {
    resultText.innerText = `Tie! Both you and computer played: ${playerChoice}`;
    return;
  }
  // You win
  if (
    (playerChoice === PAPER && computerChoice === ROCK) ||
    (playerChoice === SCISSOR && computerChoice === PAPER) ||
    (playerChoice === ROCK && computerChoice === SCISSOR)
  ) {
    resultText.innerText = `You win! You played: ${playerChoice} and computer played: ${computerChoice}`;
    return;
  }
  // You lose
  resultText.innerText = `You lost! You played: ${playerChoice} and computer played: ${computerChoice}`;
  return;
});
