var CANVAS_WIDTH = 505;
var WIDTH = 60;
var score = 0;

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // The image/sprite for our enemies uses a helper to easily load images
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
    //ensures the game will run at the same speed on any computer
    this.x += this.speed * dt;

    this.top = this.y;
    this.left = this.x;
    this.bottom = this.y + WIDTH;
    this.right = this.x + WIDTH;
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function(x,y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    //initially the player is stationary
    this.deltaX = 0;
    this.deltaY = 0;
};

// maybe check player state, as well as for collisions?
Player.prototype.update = function() {
        // player attempts to move off the left edge of the board
    if(this.x + this.deltaX < 0) {
        this.x = 0;
    }

    // player attempts to move off the right edge of the board
    else if(this.x + this.deltaX > 405) {
        this.x = 404;
    }

    // player attempts to move off the top edge of the board
    else if(this.y + this.deltaY < 0) {
        this.y = 0;
    }

    // player attempts to move off the bottom edge of the board
    else if(this.y + this.deltaY > 435) {
        this.y = 435;
    }

    // player reaches the water
    else if (this.y < 1) {
        this.reset();
    }
    else {
        this.x += this.deltaX;
        this.y += this.deltaY;
    }
    // reset current movement
    this.deltaX = 0;
    this.deltaX = 0;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0) {
        this.x -= 100;
    }
    else if (key === 'right' && this.x < 405) {
        this.x += 100;
        // this.reset();
    }
    else if (key === 'up' && this.y > 0) {
        this.y -= 80;
    }
    else if (key === 'down' && this.y < 435) {
        this.y += 80;
    }
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
    score += 20;
    document.getElementById('score').innerHTML = 'score: ' + score;
}

var player = new Player(200, 320);

// create an array and add Enemies to it
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
