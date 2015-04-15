var CANVAS_WIDTH = 505;
var WIDTH = 60;


// Enemies our player must avoid
var Enemy = function(x,y) {
    // The image/sprite for our enemies uses a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //enemy speed.
    // TODO: optimize it
    this.speed = (Math.random() * (300-100)) + 70;
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
    console.log(this.deltaX);

    this.x += this.deltaX;
    this.y += this.deltaY;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// TODO
Player.prototype.handleInput = function(keyPressed) {
    switch(keyPressed) {
        case 'left':
            console.log('left pressed!');
            this.deltaX = -10;
            break;
        case 'up':
            console.log('up pressed!');
            this.deltaY = -20;
            break;
        case 'right':
            console.log('right pressed!');
            this.deltaX = 20;
            break;
        case 'down':
            console.log('down pressed!');
            this.deltaY = 20;
            break;
        default:
            console.log('no key pressed!');
            break;
    }
}

var player = new Player(360, 320);
var firstEnemy = new Enemy(-75, 60);
var secondEnemy = new Enemy(-180, 145);
var thirdEnemy = new Enemy(-105, 230);
var allEnemies = [firstEnemy, secondEnemy, thirdEnemy];

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
