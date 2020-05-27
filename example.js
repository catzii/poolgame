var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
    ball = new Ball(25);
    image = new Image();
//imagem de fundo
image.src = 'pool.png';
image.onload = function(e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
};


/*context.font = '38pt Arial';
context.fillStyle = '#ff0000' //cornflowerblue';
context.strokeStyle = 'red';
context.fillText('Hello Canvas', canvas.width/2-150, canvas.height/2-15);
context.strokeText('Hello Canvas', canvas.width/2-150, canvas.height/2-15);*/

/*context.strokeStyle = '#ebeb7e';
ball.x = canvas.width / 2;
ball.y= canvas.height - 30;
ball.draw(context);*/
