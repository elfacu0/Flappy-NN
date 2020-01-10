let bird;
let velocity = 10;
let ground;
let pipe;
let groundY = 325;
let pipes = [];
let birds = [];
let birdsPopulation = 500;
let valueToJump = 55;
let gameOver = false;
let globalVelocity = 5;
let weights = [1, 1];
let bias = 4;
let deadCount = 0;
let gameOverAuto = false;
let bestScore = 0;
function preload() {
    birdImg = loadImage("img/bird.png");
    backgroundImg = loadImage("img/background.png");
    pipeImg = loadImage("img/pipe.png");
    pipeDownImg = loadImage("img/pipeDown.png");
    groundImg = loadImage("img/ground.png");
}
function setup() {
    createCanvas(400, 400);
    ground = new Ground();
    pipes.push(new Pipe());
    population();
    angleMode(DEGREES);
    rectMode(CENTER);
    // noLoop();
}

function draw() {
    background(backgroundImg);
    if (!gameOverAuto) {
        ground.show();

        if (frameCount % 60 == 0) {
            pipes.push(new Pipe());
        }

        pipes.forEach(pipe => {
            pipe.show();
            pipe.update();
        });

        deadCount = 0;
        birds.forEach(bird => {
            if (!bird.dead) {
                bird.show();
                bird.move();
                bird.collision();
            } else {
                deadCount++;
            }
        });
        if (deadCount >= birdsPopulation) {
            gameOverAuto = true;
            fitness();
        }

    }
}

function keyPressed() {
    if (keyCode === 32) {
        bird.jump();
    }
}

function population() {
    birds = [];
    for (let i = 0; i < birdsPopulation; i++) {
        let birdWeights = [Math.random(), Math.random()];
        birds.push(new Bird(birdWeights, Math.random()));
    }
}

function neat() {
    var myTrainingSet = [
        { input: [0, 0], output: [0] },
        { input: [0, 1], output: [1] },
        { input: [1, 0], output: [1] },
        { input: [1, 1], output: [0] }
    ];
    myNetwork = neataptic.architect.Perceptron(2, 3, 1);
    myNetwork.train(myTrainingSet, {
        log: 10,
        error: 0.03,
        iterations: 1000,
        rate: 0.3
    });
}

function fitness() {
    const bestWeight = [];
    let bestBias = [];
    const sortBests = birds.sort((a, b) => {
        return a.score - b.score;
    });
    sortBests.slice(birdsPopulation - 10, birdsPopulation).map(bird => {
        bestWeight.push(bird.weights);
        bestScore = bird.score;
        bestBias.push(bird.bias);
    });
    repopulate(bestWeight, bestBias);
}
let flag = false;
function repopulate(w, b) {
    birds = [];
    for (let i = 0; i < birdsPopulation; i++) {
        let p1 = Math.ceil(random(6, 9));
        let p2 = Math.ceil(random(6, 9));
        const w0 = Math.random() <= 0.8 ? w[p1][0] + random(-0.1, 0.1) : w[p1][0];
        const w1 = Math.random() <= 0.8 ? w[p2][1] + random(-0.1, 0.1) : w[p2][1];
        let b0 = Math.random() <= 0.8 ? b[p1] + random(-0.1, 0.1) : b[p1];
        birds.push(new Bird([w0, w1], b0));
    }
    flag = true;
    pipes = [];
    pipes.push(new Pipe());
    deadCount = 0;
    frameCount = 0;
    console.log("Score : ", bestScore);
    gameOverAuto = false;
}