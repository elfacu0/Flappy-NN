birdHeight = 30;
birdWidth = 45;
class Bird {
    constructor(w, b) {
        this.x = 150;
        this.y = 200;
        this.velocity = 0;
        this.r = 0;
        this.gravity = 0.25;
        this.dead = false;
        this.isOnGround = false;
        this.score = 0;
        this.pipesInfo = [0, 0]; // 0 = nextPipe , 1 = distBottomPipe, 2 = distTopPipe
        this.weights = w;
        this.bias = b;
        this.nn = new NeuralNetwork(w,b);
    }

    // feedforward(x) {
    //     let output = 0;
    //     for (let i = 0; i < x.length; i++) {
    //         output += x[i] * this.weights[i];
    //     }
    //     let a = this.sigmoid(output + this.bias);
    //     return a
    // }

    // sigmoid(value) {
    //     const pow_e = Math.pow(2.718, value)
    //     return (pow_e / (pow_e + 1))
    // }

    jump() {
        if (!this.isOnGround) {
            this.velocity = -4;
        }
    }

    move() {
        if (this.nn.feedforward(this.pipesInfo) >= 0.8) {
            this.jump();
        }

        if (this.y < groundY - birdHeight && this.dead === false) {
            this.velocity += this.gravity;
            this.y += this.velocity;
            this.score += 0.1;
            this.look();
        } else {
            this.gravity = 0;
            this.velocity = 0;
            this.dead = true;
            this.isOnGround = true;
            // console.log("DIE");
        }
    }

    show() {
        if (!this.dead) {
            push();
            translate(this.x, this.y);
            if (this.dead === false && this.velocity < 0) {
                rotate(-25);
                this.r = -25;
            } else {
                this.r += this.r <= 90 ? this.velocity : 0;
                rotate(this.r);
            }
            image(birdImg, 0, 0, birdWidth, birdHeight);
            pop();
        }
    }

    collision() {
        if (!this.dead) {
            if (this.y + birdHeight >= groundY) {
                this.dead = true;
            }
            if (this.y + birdHeight <= 0) {
                this.dead = true;
            }
            pipes.forEach(pipe => {
                if (this.x + (birdWidth / 2) >= pipe.x - (pipeWidth / 2) && this.x - (birdWidth / 2) <= pipe.x + (pipeWidth / 2)) {
                    // Collision with lower pipe
                    if ((this.y + birdHeight) >= (groundY - pipe.pipeHeight)) {
                        this.dead = true;
                        gameOver = true;
                    }
                    // Collision with higher pipe
                    if (this.y - (birdHeight / 2) <= (pipe.pipeDownHeight)) {
                        this.dead = true;
                        gameOver = true;
                    }
                }
            });
        }
    }

    look() {
        let nextPipe = 999;
        let distPipeY = 999;
        pipes.forEach(pipe => {
            let actualPipe = this.x - (birdWidth / 2) + pipe.x;
            if (actualPipe < nextPipe && actualPipe > this.x + birdWidth) {
                nextPipe = actualPipe;
                distPipeY = (this.y + birdHeight) - (pipe.pipeDownHeight + 90);
            }
        });
        this.pipesInfo[0] = Math.abs(((nextPipe + 1) / 1000));
        this.pipesInfo[1] = ((distPipeY + 300) / 800);
    }
}