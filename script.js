// State coordinates and setup
const statesData = [
    { name: "Alabama", x: 300, y: 400 },
    { name: "Alaska", x: 50, y: 500 },
    { name: "Arizona", x: 100, y: 350 },
    // Add all 50 states with appropriate coordinates here...
];

let guessedStates = [];
const canvas = document.getElementById("us-map");
const ctx = canvas.getContext("2d");
const input = document.getElementById("state-input");
const guessBtn = document.getElementById("guess-btn");
const giveUpBtn = document.getElementById("give-up-btn");

// Draw the map (replace with a real image or map shape)
ctx.fillStyle = "lightblue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Handle Guess
guessBtn.addEventListener("click", () => {
    const guessedState = input.value.trim();
    if (guessedStates.includes(guessedState)) {
        alert("You've already guessed that state!");
        return;
    }
    const state = statesData.find(state => state.name.toLowerCase() === guessedState.toLowerCase());
    if (state) {
        guessedStates.push(guessedState);
        markState(state.x, state.y, state.name);
    } else {
        alert("Incorrect guess, try again!");
    }
    input.value = "";
});

// Handle Give Up
giveUpBtn.addEventListener("click", () => {
    const missingStates = statesData.filter(state => !guessedStates.includes(state.name));
    missingStates.forEach(state => markState(state.x, state.y, state.name, "red"));
});

// Mark state on canvas
function markState(x, y, name, color = "green") {
    ctx.fillStyle = color;
    ctx.font = "14px Arial";
    ctx.fillText(name, x, y);
}
