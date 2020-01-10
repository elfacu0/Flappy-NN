class Ground{
    constructor(){
        this.x = 0;
        this.y = groundY;
        this.velocity = globalVelocity;
    }
    show(){
        this.x -= this.velocity;
        if(this.x<=-200){
            this.x = 0;
        }
        image(groundImg,this.x,this.y,600,70);
    }
}