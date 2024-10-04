const canvas = document.getElementById("us-map");
const ctx = canvas.getContext("2d");
const input = document.getElementById("state-input");
const guessBtn = document.getElementById("guess-btn");
const giveUpBtn = document.getElementById("give-up-btn");

let guessedStates = [];

// Load the CSV file and extract state coordinates
Papa.parse("50_states.csv", {
    download: true,
    header: true,
    complete: function(results) {
        const statesData = results.data;
        startGame(statesData);
    }
});

function startGame(statesData) {
    // Set up Guess Button event
    guessBtn.addEventListener("click", () => {
        const guessedState = input.value.trim();
        const state = statesData.find(state => state.state.toLowerCase() === guessedState.toLowerCase());

        if (state && !guessedStates.includes(guessedState)) {
            guessedStates.push(guessedState);
            markState(parseInt(state.x), parseInt(state.y), state.state);
        } else {
            alert("State not found or already guessed!");
        }
        input.value = "";
    });

    // Set up Give Up Button event
    giveUpBtn.addEventListener("click", () => {
        const missingStates = statesData.filter(state => !guessedStates.includes(state.state));
        missingStates.forEach(state => markState(parseInt(state.x), parseInt(state.y), state.state, "red"));
    });
}

// Function to display state name on the map
function markState(x, y, name, color = "green") {
    ctx.fillStyle = color;
    ctx.font = "14px Arial";
    ctx.fillText(name, x, y);
}
