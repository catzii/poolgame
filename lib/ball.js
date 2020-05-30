const sideSize = 83;
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
  this.bounce = -1.0;
  this.friction = 0.05;
  this.mass = 18;
}

//TODO:(Remove this) Parte do exemplo da aula Anima/02-Fronteiras e Atrito/06-friction-1.html
// Adiciona atrito durante a movimentação da bola
Ball.prototype.move = function move() {
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
  this.checkWalls();
}

//TODO:(Remove this) Parte do exemplo da aula Anima/07-Colisao de Bolas/06-multi-billiard-2.html
//TODO: Criar paredes para o pool com linhas
Ball.prototype.checkWalls = function checkWalls() {
  if (this.x + this.radius > canvas.width - sideSize) {
    this.x = canvas.width - sideSize - this.radius;
    this.vx *= this.bounce;
  } else if (this.x - this.radius < sideSize) {
    this.x = this.radius + sideSize;
    this.vx *= this.bounce;
  }
  if (this.y + this.radius > canvas.height - sideSize) {
    this.y = canvas.height - sideSize - this.radius;
    this.vy *= this.bounce;
  } else if (this.y - this.radius < sideSize) {
    this.y = this.radius + sideSize;
    this.vy *= this.bounce;
  }
}

Ball.prototype.shoot = function (power, rotation) {
  this.vx = Math.cos(rotation) * power / 6;
  this.vy = Math.sin(rotation) * power / 6;
  this.move()
}

Ball.prototype.draw = function (context) {
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
};

