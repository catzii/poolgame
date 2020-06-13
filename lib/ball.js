const sideSize = 63;


function Ball(x, y, color) {
  if (color === undefined) { color = "#ff0000"; }
  if (x === undefined) { x = 0; }
  if (y === undefined) { y = 0; }
  this.x = x;
  this.y = y;
  this.vx = .001;
  this.vy = .001;
  this.radius = 18;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
  this.friction = 0.05;
  this.mass = 18;
  this.visible = true;
}


//TODO:(Remove this) Parte do exemplo da aula Anima/02-Fronteiras e Atrito/06-friction-1.html
// Adiciona atrito durante a movimentação da bola
Ball.prototype.move = function move() {
  if (this.visible) {
    var speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy),
      angle = Math.atan2(this.vy, this.vx);

    if (speed > this.friction) {
      speed -= this.friction;
    } else {
      speed = 0;
    }

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.x += this.vx;
    this.y += this.vy;
  }
}

Ball.prototype.shoot = function (power, rotation) {
  this.vx = Math.cos(rotation) * power / 6;
  this.vy = Math.sin(rotation) * power / 6;
  this.move()
}

Ball.prototype.enter = function () {
  this.visible = false;
}

Ball.prototype.draw = function (context) {
  if (this.visible) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);

    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    //x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
      context.stroke();
    }
    context.restore();
  }
};

