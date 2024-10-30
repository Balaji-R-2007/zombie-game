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
  
    let lives, timer, zombieId, gameInterval;
  
    const zombies = [
      'https://github.com/Kalvium-Program/zombie-shoot-boilerplate/blob/main/assets/zombie-1.png?raw=true',
      'https://github.com/Kalvium-Program/zombie-shoot-boilerplate/blob/main/assets/zombie-2.png?raw=true',
      'https://github.com/Kalvium-Program/zombie-shoot-boilerplate/blob/main/assets/zombie-3.png?raw=true',
      'https://github.com/Kalvium-Program/zombie-shoot-boilerplate/blob/main/assets/zombie-4.png?raw=true',
      'https://github.com/Kalvium-Program/zombie-shoot-boilerplate/blob/main/assets/zombie-5.png?raw=true',
      'https://github.com/Kalvium-Program/zombie-shoot-boilerplate/blob/main/assets/zombie-6.png?raw=true',
    ];
  
    startButton.onclick = startGame;
    playAgainButton.onclick = restartGame;
    tryAgainButton.onclick = restartGame;
  
    function startGame() {
      // Task 2: Hide the home screen and show the game screen
      // Task 3: Initialize the game elements by calling the initGame function
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
    const bgSound = new Audio('background.mp3'); // Replace with actual path
    bgSound.loop = true;
    bgSound.play();
  
    }
  
    function initGame() {
      lives = 4;
      timer = 30; // Adjust as needed
      livesDisplay.textContent = `Lives: ${lives}`;
      timerDisplay.textContent = `Time: ${timer}`;
      gameInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = `Time: ${timer}`;
        if (timer <= 0) endGame(true); // Win condition
      }, 1000);
      spawnZombie();
      gameBody.addEventListener('click', playShotgunSound);
  
  
      
  
  
    }
  
    function endGame(isWin) {
      // Task 12: Hide the game screen and display the win or game over screen based on the result
    gameScreen.style.display = 'none';
    if (isWin) {
      winScreen.style.display = 'block';
    } else {
      gameOverScreen.style.display = 'block';
    }
    clearInterval(gameInterval);
  
    }
  
    function spawnZombie() {
      function spawnZombie() {
        const zombie = document.createElement('img');
        zombie.src = zombies[Math.floor(Math.random() * zombies.length)];
        zombie.classList.add('zombie');
        zombie.style.position = 'absolute';
        zombie.style.top = `${getRandomNum(0, 80)}vh`; // Adjust positioning
        zombie.style.left = `${getRandomNum(0, 80)}vw`;
        zombie.onclick = () => destroyZombie(zombie);
        gameBody.appendChild(zombie);
      }
      
    }
  
    function destroyZombie(zombie) {
      // Task 18: Remove the zombie from the screen and spawn a new one
      function destroyZombie(zombie) {
        zombie.remove();
        spawnZombie();
      }
      
    }
  
    function playShotgunSound() {
      // Task 19: Play the shotgun sound when the player clicks
      function playShotgunSound() {
        const sound = new Audio('shotgun.mp3'); // Replace with actual path
        sound.play();
      }
      
    }
  
    function missed(zombie) {
      // Task 20: Determine if a zombie is missed (reaches the top of the screen)
      // Task 21: If missed, remove the zombie and spawn a new one
      function missed(zombie) {
        zombie.remove();
        lives--;
        livesDisplay.textContent = `Lives: ${lives}`;
        if (lives <= 0) endGame(false); // Lose condition
        spawnZombie();
      }
      
    }
  
    function getRandomNum(min, max) {
      // Task 22: Generate a random number between min and max (inclusive)
      function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
    }
  });