pipeWidth = 60;
pipeHeight = 80;
class PipeDown{
    constructor(){
        this.x = 300;
        this.outOfScreen = false;
        this.velocity = 5;
        this.pipeHeight = pipeHeight+random(-50,50);
        this.y = groundY-this.pipeHeight-1;
    }
    show(){
        image(pipeImg,this.x,this.y,pipeWidth,this.pipeHeight);
    }

    update(){
        if(!this.outOfScreen){
            this.x -= this.velocity;
        }
        if(this.x<-200){
            this.outOfScreen = true;
        }
    }
}