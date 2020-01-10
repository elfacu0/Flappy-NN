pipeWidth = 60;
pipeHeight = 40;
class Pipe{
    constructor(){
        this.x = 500;
        this.outOfScreen = false;
        this.velocity = globalVelocity;
        this.pipeHeight = pipeHeight+random(-20,110);
        this.y = groundY-this.pipeHeight;
        this.pipeDownHeight = 400-this.pipeHeight-180;
    }
    show(){
        image(pipeImg,this.x,this.y,pipeWidth,this.pipeHeight);
        image(pipeDownImg,this.x,0,pipeWidth,this.pipeDownHeight);
    }

    update(){
        if(!this.outOfScreen){
            this.x -= this.velocity;
        }
        if(this.x<-200){
            pipes = pipes.slice(1,pipes.length);
        }
    }
}