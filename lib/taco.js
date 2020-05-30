function Taco() {
    this.x = 0;
    this.y = 0;
}

Taco.prototype.update = function (mouse) {
    this.x=mouse.x;
    this.y=mouse.y;
};

Taco.prototype.draw = function (context, image) {
    context.drawImage(image, this.x, this.y);
};
