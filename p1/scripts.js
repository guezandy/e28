const PAPER = "paper";
const SCISSOR = "scissor";
const ROCK = "rock";

let app = new Vue({
  el: "#app",
  data: {
    options: [
      { text: PAPER.toUpperCase(), value: PAPER },
      { text: SCISSOR.toUpperCase(), value: SCISSOR },
      { text: ROCK.toUpperCase(), value: ROCK }
    ],
    selected: PAPER,  // Default to paper
    resultLabel: '',
    results: {
      played: 0,
      tie: 0,
      win: 0,
      lose: 0
    }

  },
  methods: {
    play: function () {
      const options = [PAPER, SCISSOR, ROCK];
      const randomNumber = Math.floor(Math.random() * 3);
      const computerChoice = options[randomNumber];
      const playerChoice = this.selected; // User selected option
      // Increment number of games played
      this.results.played++;

      // Results logic
      // Tie
      if (playerChoice === computerChoice) {
        this.resultLabel = `Tie! Both you and computer played: ${playerChoice}`;
        this.results.tie++;
        return;
      }
      // You win
      if (
        (playerChoice === PAPER && computerChoice === ROCK) ||
        (playerChoice === SCISSOR && computerChoice === PAPER) ||
        (playerChoice === ROCK && computerChoice === SCISSOR)
      ) {
        this.resultLabel = `You win! You played: ${playerChoice} and computer played: ${computerChoice}`;
        this.results.win++;
        return;
      }
      // You lose
      this.resultLabel = `You lost! You played: ${playerChoice} and computer played: ${computerChoice}`;
      this.results.lose++;
      return;
    }
  }
});

