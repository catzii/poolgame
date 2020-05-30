
/// Executado quando a pagina carrega completamente
window.onload = function () {
    const canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        mouse = utils.captureMouse(canvas),
        mesaImg = new Image(),
        taco1Img = new Image(),
        taco2Img = new Image(),
        numBalls = 16,
        redBalls = [
            new Ball(1046, 380, 0xe00000),//3
            new Ball(1080, 321, 0xe00000),//4
            new Ball(1116, 340, 0xe00000),//8
            new Ball(1116, 418, 0xe00000),//10
            new Ball(1152, 282, 0xe00000),//11
            new Ball(1152, 321, 0xe00000),//12
            new Ball(1152, 399, 0xe00000)//14
        ],
        yellowBalls = [
            new Ball(1012, 360, 0xfcba03),//1
            new Ball(1046, 340, 0xfcba03),//2
            new Ball(1080, 399, 0xfcba03),//6
            new Ball(1116, 301, 0xfcba03),//7
            new Ball(1116, 380, 0xfcba03),//9
            new Ball(1152, 360, 0xfcba03),//13
            new Ball(1152, 438, 0xfcba03)//15
        ],
        whiteBall = new Ball(358, 360, 0xffffff),
        blackBall = new Ball(1080, 360, 0x000000),
        balls = [
            yellowBalls[0],
            yellowBalls[1],
            redBalls[0],
            redBalls[1],
            blackBall,
            yellowBalls[2],
            yellowBalls[3],
            redBalls[2],
            yellowBalls[4],
            redBalls[3],
            redBalls[4],
            redBalls[5],
            yellowBalls[5],
            redBalls[6],
            yellowBalls[6],
            whiteBall
        ],
        taco = new Taco(358, 360, balls[balls.length - 1].shoot.bind(balls[balls.length - 1]));
    //TODO: to change player
    let currentPlayerPlaying = 0;

    // Imagens dos tacos
    taco1Img.src = 'assets/images/taco1.png';
    taco2Img.src = 'assets/images/taco2.png';

    // imagem de fundo
    mesaImg.src = './assets/images/pool.png';

    function rotate(x, y, sin, cos, reverse) {
        return {
            x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
            y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
        };
    }

    // TODO:(Remove this) Parte do exemplo da aula Anima/07-Colisao de Bolas/06-multi-billiard-2.html
    // Trata das colisões entre as bolas
    function checkCollision(ball0, ball1) {
        var dx = ball1.x - ball0.x,
            dy = ball1.y - ball0.y,
            dist = Math.sqrt(dx * dx + dy * dy);
        //collision handling code here
        if (dist < ball0.radius + ball1.radius) {
            //calculate angle, sine, and cosine
            var angle = Math.atan2(dy, dx),
                sin = Math.sin(angle),
                cos = Math.cos(angle),
                //rotate ball0's position
                pos0 = { x: 0, y: 0 }, //point
                //rotate ball1's position
                pos1 = rotate(dx, dy, sin, cos, true),
                //rotate ball0's velocity
                vel0 = rotate(ball0.vx, ball0.vy, sin, cos, true),
                //rotate ball1's velocity
                vel1 = rotate(ball1.vx, ball1.vy, sin, cos, true),
                //collision reaction
                vxTotal = vel0.x - vel1.x;
            vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) /
                (ball0.mass + ball1.mass);
            vel1.x = vxTotal + vel0.x;
            //update position - to avoid objects becoming stuck together
            var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
                overlap = (ball0.radius + ball1.radius) - Math.abs(pos0.x - pos1.x);
            pos0.x += vel0.x / absV * overlap;
            pos1.x += vel1.x / absV * overlap;
            //rotate positions back
            var pos0F = rotate(pos0.x, pos0.y, sin, cos, false),
                pos1F = rotate(pos1.x, pos1.y, sin, cos, false);
            //adjust positions to actual screen positions
            ball1.x = ball0.x + pos1F.x;
            ball1.y = ball0.y + pos1F.y;
            ball0.x = ball0.x + pos0F.x;
            ball0.y = ball0.y + pos0F.y;
            //rotate velocities back
            var vel0F = rotate(vel0.x, vel0.y, sin, cos, false),
                vel1F = rotate(vel1.x, vel1.y, sin, cos, false);
            ball0.vx = vel0F.x;
            ball0.vy = vel0F.y;
            ball1.vx = vel1F.x;
            ball1.vy = vel1F.y;
        }
    }

    function draw(ball) {
        ball.draw(context);
    }

    function move(ball) {
        ball.move();
    }

    (function drawFrame() {
        window.requestAnimationFrame(drawFrame, canvas);
        // context.clearRect(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(mesaImg, 0, 0, canvas.width, canvas.height);

        balls.forEach(move);
        for (var ballA, i = 0, len = numBalls - 1; i < len; i++) {
            ballA = balls[i];
            for (var ballB, j = i + 1; j < numBalls; j++) {
                ballB = balls[j];
                checkCollision(ballA, ballB);
            }
        }
        balls.forEach(draw);
        taco.update(mouse);
        context.save();
        const wbx = balls[balls.length - 1].x,
            wby = balls[balls.length - 1].y;
        taco.x = wbx;
        taco.y = wby;

        context.translate(wbx, wby);
        context.rotate(taco.rotation)
        taco.draw(context, currentPlayerPlaying === 0 ? taco1Img : taco2Img, taco.power, wbx, wby);
        context.restore();
    }());

}