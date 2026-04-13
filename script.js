const games = [
    {
        title: "Snake Game",
        description: "Classic snake game",
        url: "https://playsnakegame.com/"
    },
    {
        title: "Pac-Man",
        description: "Classic arcade game",
        url: "https://pacman.live/"
    },
    {
        title: "2048",
        description: "Number puzzle game",
        url: "https://play2048.co/"
    },
    {
        title: "Flappy Bird",
        description: "Tap to fly",
        url: "https://flappybird.io/"
    },
    {
        title: "Tetris",
        description: "Block stacking game",
        url: "https://tetris.com/play-tetris"
    },
    {
        title: "Chess",
        description: "Strategy board game",
        url: "https://www.chess.com/play/online"
    },
    {
        title: "Tic Tac Toe",
        description: "Classic 3x3 game",
        url: "https://playtictactoe.org/"
    },
    {
        title: "Memory Game",
        description: "Match the pairs",
        url: "https://www.memozor.com/"
    }
];

function displayGames(gamesToDisplay) {
    const gameList = document.getElementById('game-list');
    gameList.innerHTML = '';
    
    gamesToDisplay.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <h2>${game.title}</h2>
            <p>${game.description}</p>
        `;
        gameCard.onclick = () => openGame(game.url);
        gameList.appendChild(gameCard);
    });
}

function openGame(url) {
    const container = document.getElementById('container');
    const gameFrame = document.getElementById('game-frame');
    gameFrame.src = url;
    container.style.display = 'flex';
}

function closeGame() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('game-frame').src = '';
}

document.querySelector('.close').addEventListener('click', closeGame);
document.getElementById('container').addEventListener('click', function(event) {
    if (event.target === this) {
        closeGame();
    }
});

document.getElementById('search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = games.filter(game => 
        game.title.toLowerCase().includes(searchTerm) || 
        game.description.toLowerCase().includes(searchTerm)
    );
    displayGames(filtered);
});

displayGames(games);