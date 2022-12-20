class TopPlayer {
    name;
    profileImage;
    score;

    constructor(name, profileImage, score) {
        this.name = name;
        this.profileImage = profileImage;
        this.score = score;
    }
}

class TopPlayersList {
    players;

    constructor() {
        this.players = [];
    }

    comparePlayers(player1, player2) {
        if (player1.score > player2.score) {
            return -1;
        }
        if (player1.score < player2.score) {
            return 1;
        }
        return 0;
    }
    
    sortPlayers() {
        return this.players.sort(this.comparePlayers);
    }

    addPlayer(player) {
        const indexOfPlayer = this.players.indexOf(player);
        if (indexOfPlayer === -1) {
            this.players.push(player);
        } else {
            console.log(`Player ${player.name} already exists`);
        }
    }

    removePlayer(player) {
        const indexOfPlayer = this.players.indexOf(player);
        if (indexOfPlayer) {
            this.players.splice(indexOfPlayer, 1);
        }
    }

    countPlayers() {
        return this.players.length;
    }
}

function randomScore() {
    const randomNumber = Math.random();
    const score = parseInt(randomNumber * 100);
    return score;
}

const PROFILE_IMAGE_DEFAULT = "/Users/luchicla/Work/RAU/rau-web-apps-programming-1-g607-2022-2023/royal607/client/assets/logo.webp"
const TOP_PLAYERS = new TopPlayersList()
const TOP_PLAYERS_HARDCODED = [
    new TopPlayer("SuperPlayer", PROFILE_IMAGE_DEFAULT, randomScore()),
    new TopPlayer("AmazingPlayer", PROFILE_IMAGE_DEFAULT, randomScore()),
    new TopPlayer("Pion", PROFILE_IMAGE_DEFAULT, randomScore())
];
for (const player of TOP_PLAYERS_HARDCODED) {
    TOP_PLAYERS.addPlayer(player);
}
TOP_PLAYERS.sortPlayers();

const CURRENT_USER_HIGHSCORE = 45677;

function createTopPlayerElement(player) {
    const topPlayersListItem = document.createElement("div");
    topPlayersListItem.className = "friends-list-item";

    const playerNameAndImageSection = document.createElement("div");

    const playerImage = document.createElement("img");
    playerImage.src = player.profileImage;
    playerImage.className = "friends-list-logo";

    const playerName = document.createElement("span");
    playerName.className = "friends-list-name";
    playerName.innerText = player.name;

    playerNameAndImageSection.appendChild(playerImage);
    playerNameAndImageSection.appendChild(playerName);

    const playersScoreSection = document.createElement("div");

    const playerScore = document.createElement("span");
    playerScore.classList.add("friends-list-status");
    playerScore.innerText = player.score;

    playersScoreSection.appendChild(playerScore);

    topPlayersListItem.appendChild(playerNameAndImageSection);
    topPlayersListItem.appendChild(playersScoreSection);

    return topPlayersListItem;
}

function createTopPlayersSection(topPlayersList) {
    const parent = document.getElementById("top-players-section");
    if (!parent) {
        console.log("Top players section is missing.");
        return;
    }

    for (const player of topPlayersList.players) {
        const playerElement = createTopPlayerElement(player);
        parent.appendChild(playerElement);
    }
}

createTopPlayersSection(TOP_PLAYERS);

const highscore = document.getElementById("high-score");
if (highscore) {
    highscore.children[0].innerText = CURRENT_USER_HIGHSCORE;
}