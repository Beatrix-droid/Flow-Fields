const canvas = document.getElementById("canvas1");
const ctx=canvas.getContext("2d");
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;


//canvas settings
ctx.fillStyle="red";
ctx.strokeStyle="red";
ctx.lineWidth=1;


// to create particle objects
class Particle{
    //give it access to the entire effect class
    constructor(effect){
        this.effect = effect; //point towards new effect object
        this.x=  Math.floor(Math.random()* this.effect.width);
        this.y= Math.floor(Math.random()* this.effect.height);
    
        this.history=[{x:this.x, y:this.y}];
        this.maxLenght=Math.floor(Math.random()*200 +10); //create lenght of line
        this.angle=0;
    }

    draw(context){
        context.fillRect(this.x, this.y, 5,6);//size of particles
        context.beginPath();
        context.moveTo(this.history[0].x,this.history[0].y);

        for(let i=0; i<this.history.length; i++){
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.stroke();
    }


    //to animate particles

    update(){
        //move them around
        // how many rows and cols we are from the top
        let x = Math.floor(this.x /this.effect.cellSize);
        let y = Math.floor(this.y /this.effect.cellSize);
        // extract the angle
        let index= y*this.effect.cols +x; //index of flow field array
        this.angle=this.effect.flowField[index];
        this.speedX=Math.cos(this.angle);
        this.speedY=Math.sin(this.angle);
        this.x += this.speedX;
        this.y+= this.speedY;
        //update history array
        this.history.push({x: this.x, y:this.y});
        if (this.history.length > this.maxLenght){
            this.history.shift();
        }
    }


}


// manages all particles at once
class Effect{   
    constructor(width, height){
        this.width=width;
        this.height=height;
        this.particles=[];
        this.numberOfParticles=300;
        this.cellSize=20;
        this.rows;
        this.cols;
        this.flowField=[];
        this.curve=0.5;
        this.zoom=0.2;
        this.initialise();
    }

    // create the effect
    initialise(){
        //create flow field
        this.rows=Math.floor(this.height/this.cellSize);
        this.cols=Math.floor(this.width/this.cellSize);
        this.flowField=[]; //delete older values

        //travel over the grid
        for (let y=0; y<this.rows;y++){
            for (let x=0; x<this.cols; x++){
                let angle=(Math.cos(x*this.zoom)+ Math.sin(y*this.zoom))*this.curve; // this will map a wave
                this.flowField.push(angle);
            }
        }
        console.log(this.flowField);


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

function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    //particles are drawn then updated
    effect.render(ctx);
    // request animation frame calls this again, in built request method
    requestAnimationFrame(animate);
}

animate();