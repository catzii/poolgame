function Hole(x, y) {
    this.x = x;
    this.y = y;
    this.raio = 32;
}

// ver se as bolas estão dentro do buraco 
Hole.prototype.checkhole = function (ball) {
    if (window.utils.diff(this.x, ball.x) < this.raio && window.utils.diff(this.y, ball.y) < this.raio) {
        return true;
    }
    return false;
}

// Usado apenas para verificar a posição dos buracos
Hole.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);

    context.lineWidth = 1;
    context.fillStyle = utils.parseColor("#ff0000");
    context.beginPath();
    //x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.raio, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
        context.stroke();
    }
    context.restore();
}