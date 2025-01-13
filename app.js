document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const homeScreen = document.getElementById('home');
    const gameOverScreen = document.getElementById('game-over');
    const winScreen = document.getElementById('win');
    const playAgainButton = document.getElementById('play-again-button');
    const tryAgainButton = document.getElementById('try-again-button');
    const gameScreen = document.getElementById('game-screen');
    const livesDisplay = document.getElementById('lives');
    const timerDisplay = document.getElementById('timer');
    const gameBody = document.getElementById('gameBody');
  
    let lives, timer, gameInterval;
  
    const zombies = [
        'https://github.com/Kalvium-Program/zombie-shoot-boilerplate/blob/main/assets/zombie-1.png?raw=true',
        'https://github.com/Kalvium-Program/zombie-shoot-boilerplate/blob/main/assets/zombie-2.png?raw=true',
        'https://github.com/Kalvium-Program/zombie-shoot-boilerplate/blob/main/assets/zombie-3.png?raw=true',
        'https://github.com/Kalvium-Program/zombie-shoot-boilerplate/blob/main/assets/zombie-4.png?raw=true',
        'https://github.com/Kalvium-Program/zombie-shoot-boilerplate/blob/main/assets/zombie-5.png?raw=true',
        'https://github.com/Kalvium-Program/zombie-shoot-boilerplate/blob/main/assets/zombie-6.png?raw=true'
    ];
  
    startButton.onclick = startGame;
    playAgainButton.onclick = restartGame;
    tryAgainButton.onclick = restartGame;
  
    function startGame() {
        homeScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        initGame();
    }
  
    function restartGame() {
        gameOverScreen.style.display = 'none';
        winScreen.style.display = 'none';
        homeScreen.style.display = 'block';
        clearInterval(gameInterval);
        gameInterval = null;
        document.querySelectorAll('.zombie').forEach(z => z.remove());
        const bgSound = new Audio('background.mp3');
        bgSound.loop = true;
        bgSound.play();
    }
  
    function initGame() {
        lives = 4;
        timer = 30;
        livesDisplay.textContent = `Lives: ${lives}`;
        timerDisplay.textContent = `Time: ${timer}`;
        gameInterval = setInterval(() => {
            timer--;
            timerDisplay.textContent = `Time: ${timer}`;
            if (timer <= 0) endGame(true);
        }, 1000);
        spawnZombie();
        gameBody.addEventListener('click', playShotgunSound);
    }
  
    function endGame(isWin) {
        gameScreen.style.display = 'none';
        if (isWin) {
            winScreen.style.display = 'block';
        } else {
            gameOverScreen.style.display = 'block';
        }
        clearInterval(gameInterval);
    }
  
    function spawnZombie() {
        const zombie = document.createElement('img');
        zombie.src = zombies[Math.floor(Math.random() * zombies.length)];
        zombie.classList.add('zombie');
        zombie.style.position = 'absolute';
        zombie.style.top = `${getRandomNum(0, 80)}vh`;
        zombie.style.left = `${getRandomNum(0, 80)}vw`;
        zombie.onclick = () => destroyZombie(zombie);
        gameBody.appendChild(zombie);
    }
  
    function destroyZombie(zombie) {
        zombie.remove();
        spawnZombie();
    }
  
    function playShotgunSound() {
        const sound = new Audio('shotgun.mp3');
        sound.play();
    }
  
    function missed(zombie) {
        zombie.remove();
        lives--;
        livesDisplay.textContent = `Lives: ${lives}`;
        if (lives <= 0) endGame(false);
        spawnZombie();
    }
  
    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
