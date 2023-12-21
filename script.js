const canvas = document.getElementById("canvas1");
const ctx=canvas.getContext("2d");
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;


//canvas settings
ctx.fillStyle="red";
ctx.strokeStyle="purple";
ctx.lineWidth=1;


// to create particle objects
class Particle{
    //give it access to the entire effect class
    constructor(effect){
        this.effect = effect; //point towards new effect object
        this.x=  Math.floor(Math.random()* this.effect.width);
        this.y= Math.floor(Math.random()* this.effect.height);
    
        this.history=[{x:this.x, y:this.y}];
        this.maxLength=Math.floor(Math.random()*200)+200; //create length of line
        this.angle=0;
        this.timer=this.maxLength*2;
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
        this.timer--;
        if (this.timer>=1)
            {            
            let x = Math.floor(this.x /this.effect.cellSize);
            let y = Math.floor(this.y /this.effect.cellSize);
            // extract the angle
            let index= y*this.effect.cols +x; //index of flow field array
            this.angle=this.effect.flowField[index];
            this.speedX=Math.cos(this.angle)-0.1;
            this.speedY=Math.sin(this.angle)-0.1;
            this.x += this.speedX;
            this.y+= this.speedY;
            //update history array
            this.history.push({x: this.x, y:this.y});
            if (this.history.length > this.maxLength){
                this.history.shift();
                }
            }
        else if(this.timer>1){
            this.history.shift();
        }
        else{
            this.reset();
        }

    }

    // to reset the animation
    reset(){
        this.x=Math.floor(math.random()*this.effect.width);
        this.y=Math.floor(math.random()*this.effect.height);
        this.history=[{x:this.x, y:this.y}];
        this.timer=this.maxLength*2;
    }


}


// manages all particles at once
class Effect{   
    constructor(canvas){
        this.canvas=canvas
        this.width=this.canvas.width;
        this.height=this.canvas.height;
        this.particles=[];
        this.numberOfParticles=200;
        this.cellSize=30;
        this.rows;
        this.cols;
        this.flowField=[];
        this.curve=1.1;
        this.zoom=0.4;
        this.initialise();
        this.debug=true;
        window.addEventListener("keydown", e=>{
            console.log(e);
            if(e.key==="d") {this.debug=!this.debug}; //toggle the debug mode off
        });
    
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

    resize(width, height){
        this.canvas.width=width;
        this.canvas.height=height;
        this.width=this.canvas.width;
        this.height=this.canvas.height;
    }


    drawGrid(context){

        //wrap between save and restore to ensure that any changes we made in this context do not apply globally (so we just get to change the colour of the grid without affecting the flow field)
        context.save();
        context.strokeStyle="yellow";
        context.lineWidth=0.2;
        for (let c=0; c<this.cols; c++){
            context.beginPath();
            //move along the width of canvas
            context.moveTo(this.cellSize *c, 0) 
            //draw the line from the top to the very bottom
            context.lineTo(this.cellSize*c, this.height);
            context.stroke();
        }
        for (let r=0; r<this.rows; r++){
            context.beginPath();
            //move along the width of canvas
            context.moveTo(0, this.cellSize *r) 
            //draw the line from the top to the very bottom
            context.lineTo( this.width,this.cellSize*r,);
            context.stroke();
        }
        context.restore();
    }
    // draw the effect on the canvas
    render(context){
        if (this.debug){
        this.drawGrid(context);}
        this.particles.forEach(particle=>{
            particle.draw(context);
            particle.update();
        })
    }
}


const effect = new Effect(canvas);
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