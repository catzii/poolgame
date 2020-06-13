function Line(x1, y1, x2, y2) {
  this.x = 0;
  this.y = 0;
  this.x1 = (x1 === undefined) ? 0 : x1;
  this.y1 = (y1 === undefined) ? 0 : y1;
  this.x2 = (x2 === undefined) ? 0 : x2;
  this.y2 = (y2 === undefined) ? 0 : y2;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.lineWidth = 1;
  this.bounce = -1.0;
}

Line.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);

  context.lineWidth = this.lineWidth;
  context.beginPath();
  context.moveTo(this.x1, this.y1);
  context.lineTo(this.x2, this.y2);
  context.closePath();
  context.stroke();
  context.restore();
};

Line.prototype.getBounds = function () {
  if (this.rotation === 0) {
    var minX = Math.min(this.x1, this.x2),
      minY = Math.min(this.y1, this.y2),
      maxX = Math.max(this.x1, this.x2),
      maxY = Math.max(this.y1, this.y2);
    return {
      x: this.x + minX,
      y: this.y + minY,
      width: maxX - minX,
      height: maxY - minY
    }
  } else {
    var sin = Math.sin(this.rotation),
      cos = Math.cos(this.rotation),
      x1r = cos * this.x1 + sin * this.y1,
      x2r = cos * this.x2 + sin * this.y2,
      y1r = cos * this.y1 + sin * this.x1,
      y2r = cos * this.y2 + sin * this.x2;
    return {
      x: this.x + Math.min(x1r, x2r),
      y: this.y + Math.min(y1r, y2r),
      width: Math.max(x1r, x2r) - Math.min(x1r, x2r),
      height: Math.max(y1r, y2r) - Math.min(y1r, y2r)
    };
  }
};

//TODO:(Remove this) Parte do exemplo da aula Anima/06-Rotacao e Ricochete/10-multi-angle-bounce
Line.prototype.checkLine = function (ball) {
  var bounds = this.getBounds();
  if (ball.x + ball.radius > bounds.x && ball.x - ball.radius < bounds.x + bounds.width) {
    //get angle, sine, and cosine
    var cos = Math.cos(this.rotation),
      sin = Math.sin(this.rotation),
      //get position of ball, relative to line
      x1 = ball.x - this.x,
      y1 = ball.y - this.y,
      //rotate coordinates
      y2 = cos * y1 - sin * x1,
      //rotate velocity
      vy1 = cos * ball.vy - sin * ball.vx;
    //perform bounce with rotated values
    if (y2 > -ball.radius && y2 < vy1) {
      //rotate coordinates
      var x2 = cos * x1 + sin * y1,
        //rotate velocity
        vx1 = cos * ball.vx + sin * ball.vy;
      y2 = -ball.radius;
      vy1 *= this.bounce;
      //rotate everything back
      x1 = cos * x2 - sin * y2;
      y1 = cos * y2 + sin * x2;
      ball.vx = cos * vx1 - sin * vy1;
      ball.vy = cos * vy1 + sin * vx1;
      ball.x = this.x + x1;
      ball.y = this.y + y1;
    }
  }
}
