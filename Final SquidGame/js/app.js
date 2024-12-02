
document.getElementById("game-log").innerHTML = "";

function writeInDom(txt) {
    const gameLog = document.getElementById("game-log");
    const paragraph = document.createElement("p");
    paragraph.innerHTML = txt;
    gameLog.appendChild(paragraph);
    gameLog.scrollTop = gameLog.scrollHeight;
}

class Player {
    constructor(name, marbles, sex, bonus = 1) {
        this.name = name;
        this.marbles = marbles;
        this.sex = sex;
        this.bonus = bonus;
    }

    introduce() {
        writeInDom(`<strong>${this.name}</strong> a <strong>${this.marbles} billes</strong>. Prêt à jouer.`);
    }
}

let currentPlayer, currentOpponent, opponentsList = [], difficultyLevel = 1;

document.querySelectorAll(".difficultyBtn").forEach(button => {
    button.addEventListener("click", function () {
        difficultyLevel = parseInt(this.getAttribute("data-level"));
        document.getElementById("difficulty-selection").style.display = "none";
        document.getElementById("hero-selection").style.display = "block";
    });
});

document.querySelectorAll(".heroBtn").forEach(button => {
    button.addEventListener("click", function () {
        const heroIndex = parseInt(this.getAttribute("data-hero"));
        document.getElementById("hero-selection").style.display = "none"; // Hide hero selection
        startGame(heroIndex);
    });
});

function startGame(heroIndex) {
    initializeGame(heroIndex);
    nextEncounter();
}

function initializeGame(heroIndex) {
    document.getElementById("game-controls").style.display = "block";
    document.getElementById("opponent-info").style.display = "block";
    document.getElementById("score-info").style.display = "block";

    let heroes = [
        new Player("Seong Gi-hun", 10, 'm', 1),
        new Player("Kang Sae-byeok", 15, 'f', 2),
        new Player("Cho Sang-woo", 25, 'm', 3)
    ];

    currentPlayer = heroes[heroIndex];
    currentPlayer.introduce();

    let koreanNames = [
        "Kim Min-joon", "Lee Seo-yeon", "Park Ji-hoon", "Choi Soo-jin", "Jung Ha-eun", "Yoon Dong-hyun",
        "Han Ji-woo", "Song Ye-jin", "Shin Hye-jin", "Oh Seung-hyun", "Kang Min-seo", "Cho Hyun-woo",
        "Ahn Ji-yoon", "Seo Joon-ho", "Hwang Soo-young", "Bae Eun-ji", "Im Tae-hyun", "Kwon Ji-min",
        "Kim Na-eun", "Lee Hye-in", "Park Sun-woo", "Choi Ji-a", "Jung Woo-jin", "Yoon Min-jae",
        "Kim Eun-soo", "Lee Ji-ho", "Park Hyo-jin", "Choi Kyung-min", "Jung Seo-jun", "Yoon Ha-neul",
        "Han Min-ji", "Song Jae-hee", "Shin Sang-woo", "Oh Yeon-woo", "Kang Ji-an", "Cho Soo-hyun",
        "Ahn Jae-hyun", "Seo Na-ri", "Hwang Min-kyu", "Bae Yu-jin", "Im Soo-jung", "Kwon Hyun-jin",
        "Kim Tae-min", "Lee Eun-jung", "Park Do-hyun", "Choi In-ha", "Jung Da-eun", "Yoon Hye-jin",
        "Han Seo-jin", "Song Min-kyung", "Shin Ji-hoon", "Oh Na-kyung", "Kang Seo-hyun", "Cho Ji-hwan",
        "Ahn Min-ho", "Seo Jae-in", "Hwang Soo-bin", "Bae Hyun-jin", "Im Ji-won", "Kwon Woo-jung",
        "Kim Sun-mi", "Lee Hyo-seon", "Park Hyun-jin", "Choi Ye-eun", "Jung Kyung-ho", "Yoon Da-hye",
        "Han Jin-woo", "Song Hye-min", "Shin Joo-hyun", "Oh Tae-jin", "Kang Ji-soo", "Cho Young-hoon",
        "Ahn Soo-jin", "Seo Ji-eun", "Hwang Ji-young", "Bae Tae-woo", "Im Ji-hwan", "Kwon Min-jung"
    ];
    
    opponentsList = [];

    for (let i = 1; i <= difficultyLevel; i++) {
        let randomMarbles = Math.floor(Math.random() * 15) + 5;
        let opponentName = koreanNames[Math.floor(Math.random() * koreanNames.length)];
        let opponent = new Player(opponentName, randomMarbles, 'm');
        opponentsList.push(opponent);
    }

    writeInDom("Le jeu commence maintenant ! Bonne chance.");
}

function nextEncounter() {
    if (opponentsList.length === 0) {
        writeInDom("FÉLICITATIONS ! Vous avez tué tous vos adversaires.");
        showReplayButton(); // Show Replay button when all opponents are defeated
        return;
    }

    currentOpponent = opponentsList.shift();
    updateOpponentInfo();
    writeInDom(`NOUVEL ADVERSAIRE : ${currentOpponent.name} avec ${currentOpponent.marbles} billes.`);
}

function initializeGame(heroIndex) {
    document.getElementById("game-controls").style.display = "block";
    document.getElementById("opponent-info").style.display = "block";
    document.getElementById("score-info").style.display = "block";

    let heroes = [
        new Player("Seong Gi-hun", 10, 'm', 1),
        new Player("Kang Sae-byeok", 15, 'f', 2),
        new Player("Cho Sang-woo", 25, 'm', 3)
    ];

    currentPlayer = heroes[heroIndex];
    currentPlayer.introduce();

    let koreanNames = ["Kim Min-joon", "Lee Seo-yeon", "Park Ji-hoon", "Choi Soo-jin", "Jung Ha-eun", "Yoon Dong-hyun"];
    opponentsList = [];

    for (let i = 1; i <= difficultyLevel * 3; i++) { // Multiply number of opponents based on difficulty level
        let randomMarbles = Math.floor(Math.random() * 15) + 5;
        let opponentName = koreanNames[Math.floor(Math.random() * koreanNames.length)];
        let opponent = new Player(opponentName, randomMarbles, 'm');
        opponentsList.push(opponent);
    }

    writeInDom("Le jeu commence maintenant avec plusieurs adversaires ! Bonne chance.");
    nextEncounter();
}

function playRound(choice) {
    const betMarbles = Math.floor(Math.random() * currentOpponent.marbles) + 1;
    const isEven = betMarbles % 2 === 0;

    if ((isEven && choice === "1") || (!isEven && choice === "2")) {
        writeInDom(`BRAVO ! Vous gagnez ${betMarbles} billes et ${currentPlayer.bonus} en bonus.`);
        currentPlayer.marbles += betMarbles + currentPlayer.bonus;
        currentOpponent.marbles -= betMarbles;
    } else {
        writeInDom(`Dommage... Vous perdez ${betMarbles} billes.`);
        currentPlayer.marbles -= betMarbles;
        currentOpponent.marbles += betMarbles;
    }

    updateScoreInfo();

    if (currentPlayer.marbles <= 0) {
        writeInDom("FIN DE PARTIE. Vous avez perdu toutes vos billes.");
        document.getElementById("game-controls").style.display = "none";
    } else if (currentOpponent.marbles <= 0) {
        writeInDom(`${currentOpponent.name} n'a plus de billes. Vous avancez au prochain adversaire.`);
        nextEncounter();
    }
}

function updateOpponentInfo() {
    // Clear existing opponent information
    const opponentTable = document.createElement("table");
    opponentTable.innerHTML = `
        <thead>
            <tr>
                <th>Nom</th>
                <th>Billes</th>
            </tr>
        </thead>
        <tbody>
            ${opponentsList.map(opponent => `
                <tr>
                    <td>${opponent.name}</td>
                    <td>${opponent.marbles}</td>
                </tr>
            `).join("")}
        </tbody>
    `;
    const opponentInfoDiv = document.getElementById("opponent-info");
    opponentInfoDiv.innerHTML = ""; // Clear previous content
    opponentInfoDiv.appendChild(opponentTable);

    // Highlight the current opponent
    const currentOpponentDisplay = document.createElement("p");
    currentOpponentDisplay.innerHTML = `<strong>Adversaire Actuel :</strong> ${currentOpponent.name} (${currentOpponent.marbles} billes)`;
    opponentInfoDiv.appendChild(currentOpponentDisplay);
}

function updateScoreInfo() {
    document.getElementById("player-marbles").innerText = currentPlayer.marbles;
    document.getElementById("opponent-marbles").innerText = currentOpponent.marbles;
}

// Handle button clicks for Paire and Impaire
document.getElementById("evenBtn").addEventListener("click", function () {
    playRound("1");
});

document.getElementById("oddBtn").addEventListener("click", function () {
    playRound("2");
});

// Add functionality to the Replay button
document.getElementById("replayBtn").addEventListener("click", function () {
    location.reload(); // Reload the page to restart the game
});

function showReplayButton() {
    document.getElementById("game-controls").style.display = "none";
    document.getElementById("replayBtn").style.display = "block"; // Show the Replay button
}

// Modify game ending scenarios to show the Replay button
function playRound(choice) {
    const betMarbles = Math.floor(Math.random() * currentOpponent.marbles) + 1;
    const isEven = betMarbles % 2 === 0;

    if ((isEven && choice === "1") || (!isEven && choice === "2")) {
        writeInDom(`BRAVO ! Vous gagnez ${betMarbles} billes et ${currentPlayer.bonus} en bonus.`);
        currentPlayer.marbles += betMarbles + currentPlayer.bonus;
        currentOpponent.marbles -= betMarbles;
    } else {
        writeInDom(`Dommage... Vous perdez ${betMarbles} billes.`);
        currentPlayer.marbles -= betMarbles;
        currentOpponent.marbles += betMarbles;
    }

    updateScoreInfo();

    if (currentPlayer.marbles <= 0) {
        writeInDom("FIN DE PARTIE. Vous avez perdu toutes vos billes.");
        showReplayButton(); // Show Replay button on game over
    } else if (currentOpponent.marbles <= 0) {
        writeInDom(`${currentOpponent.name} n'a plus de billes. Vous avancez au prochain adversaire.`);
        nextEncounter();
    }
}
