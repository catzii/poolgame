const xOrigin = 900,
    yOrigin = 29,
    powerLimit = 200;

function Taco(x, y, onShoot) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.power = 0;
    this.onShoot = onShoot
}

Taco.prototype.update = function (mouse) {
    //Calcula o angulo do taco consoante a posição do rato
    let opposite = mouse.y - this.y,
        adjacent = mouse.x - this.x;
    this.rotation = Math.atan2(opposite, adjacent);

    // Se o rato estiver down aumenta a potencia da tacada até um limite de 100
    if (mouse.is === "down") {
        if (powerLimit >= this.power) this.power++;
    } else if (this.power > 0) {
        this.onShoot(this.power, this.rotation);
        this.power = 0;
    }
};

Taco.prototype.draw = function (context, image, power = 0, wbx, wby) {
    context.drawImage(image, -xOrigin - 25 - power, -yOrigin / 2, xOrigin, yOrigin);
};