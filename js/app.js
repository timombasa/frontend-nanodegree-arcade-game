var CANVAS_WIDTH = 505;
var score = 0;

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // The image or sprite for our enemies uses a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > CANVAS_WIDTH + 100) {
      this.x = -125;
      this.y = this.y;
    }
    // Make the game will run at the same speed on any computer
    this.x += this.speed * dt;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x,y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    //initially the player is stationary
    this.deltaX = 0;
    this.deltaY = 0;
};


Player.prototype.update = function() {
    // Player attempts to move past the left edge of the board
    if(this.x + this.deltaX < 0) {
        this.x = 0;
    }
    // Player attempts to move past the right edge of the board
    else if(this.x + this.deltaX > 405) {
        this.x = 404;
    }
    // Player attempts to move past the bottom edge of the board
    else if(this.y + this.deltaY > 435) {
        this.y = 435;
    }
    // Player reaches the water
    else if (this.y < 1) {
        score += 20;
        this.reset();
    }
    // Move the player within the canvas boundaries
    else {
        this.x += this.deltaX;
        this.y += this.deltaY;
    }
    // Update the score everytime the Player is updated
    document.getElementById('score').innerHTML = 'score: ' + score;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0) {
        this.x -= 100;
    }
    else if (key === 'right' && this.x < 405) {
        this.x += 100;
    }
    else if (key === 'up' && this.y > 0) {
        this.y -= 80;
    }
    else if (key === 'down' && this.y < 435) {
        this.y += 80;
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
};

// Instantiate the true Player :) R.I.P. B.I.G.
var player = new Player(200, 320);

// Create an array and add Enemies to it
var allEnemies = [];

(function createEnemies() {
    allEnemies.push(new Enemy(-55, 60, 220));
    allEnemies.push(new Enemy(-305, 60, 210));
    allEnemies.push(new Enemy(1, 145, 80));
    allEnemies.push(new Enemy(-150, 145, 70));
    allEnemies.push(new Enemy(-10, 230, 250));
    allEnemies.push(new Enemy(-240, 230, 250));
}());

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
