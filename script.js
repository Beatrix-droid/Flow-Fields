const canvas = document.getElementById("canvas1");
const ctx=canvas.getContext("2d");
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;

console.log(ctx);

ctx.fillStyle="white";
ctx.strokeStyle="white";
ctx.beginPath();
// draw a line, by default the line is 1 pixel wide
ctx.moveTo(100,200);
ctx.lineTo(400,500);
ctx.stroke();


// to create particle objects
class Particle{
    //give it access to the entire effect class
    constructor(effect){
        this.effect = effect; //point towards new effect object
        this.x=  Math.floor(Math.random()* this.effect.width);
        this.y= Math.floor(Math.random()* this.effect.height);
        this.speedX=1;
        this.speedY=1;
    }

    draw(context){
        context.fillRect(this.x, this.y, 10*10);
    }

    //to animate particles

    update(){
        //move them around
        this.x + this.speedX;
        this.y+ this.speedY;
    }


}


// manages all particles at once
class Effect{   
    constructor(width, height){
        this.width=width;
        this.height=height;
        this.particles=[];
        this.numberOfParticles=50;
        this.initialise();
     }

    // create the effect
    initialise(){
        for (let i=0; i< this.numberOfParticles; i++)
        {
        this.particles.push(new Particle(this))}//will trigger the creation of a new particle
    }

    // draw the effect on the canvas
    render(context){
        this.particles.forEach(particle=>{
            particle.draw(context);
            particle.update();

        })
    }


}


const effect = new Effect(canvas.width, canvas.height);
effect.initialise();
console.log(effect);
effect.render(ctx);