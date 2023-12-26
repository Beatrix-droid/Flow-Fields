const canvas = document.getElementById("canvas1");
const ctx=canvas.getContext("2d");
canvas.width= 700;
canvas.height=900;

//can see all available context properites by logging the ctx object console.log(ctx) and checking all the methods avaiable in the prototype:
console.log(ctx);

//global settings:
//ctx.lineWidth=10;
//ctx.strokeStyle="magenta";





//color
//ctx.fillStyle="red";
//crete a rectagle at these coordinates
//ctx.fillRect(100, 150, 200, 150);

// starts a new path, and automatically closes all existing ones
ctx.beginPath();

// ctx.moveTo(300, 300); // set start x and y coordinaes
// ctx.lineTo(350, 500);// end coordinates

// //to draw the path use the stroke method
// ctx.stroke();

// to draw and create multiple lines
class Line{
    constructor(canvas){
        this.canvas=canvas;
        this.X=Math.random()*this.canvas.width;
        this.Y=Math.random()*this.canvas.height;
        //to animate the lines with starting point thisx and this.y
        this.history= [{x:this.X, y:this.Y}];
        this.lineWidth=(Math.random()*15+1);
        this.color= Math.floor(Math.random()*360);
        this.maxLength=50;
    }

    draw(context){
        // cycle hsl colours
        context.strokeStyle="hsl(" + this.color + ",100%, 50%)";
        context.lineWidth=this.lineWidth;
        context=context;
        context.beginPath();
        // move at starting point
        context.moveTo(this.history[0].x, this.history[0].y);
        //create 3 randomized x and y positions and add to history array, so lines have 3 chunks
        // for (let i=0; i<3; i++){
        //     this.x=Math.random()* this.canvas.width;
        //     this.y=Math.random()* this.canvas.height;
        //     this.history.push({x:this.x, y:this.y});
        // };
        // //draw multi segmented path
        for (let j=0; j< this.history.length; j++){
            context.lineTo(this.history[j].x, this.history[j].y);
        }

        context.stroke();  
    
}

    update(){
        // when this method runs, add one new segment to the line
        this.x=Math.random()* this.canvas.width;
        this.y=Math.random()* this.canvas.height;
        this.history.push({x:this.x, y:this.y});
        if(this.history.length > this.maxLength){
            this.history.shift();
        }
    }
}

//creates a new object and 
//const line1= new Line(canvas);
//draw the line on the screen
//line1.draw(ctx);


//create more lines and draw them on the screen


// alternative way to code this:
// linesArray.foreach(object => object.draw(ctx);)

const linesArray=[];
const numberofLines=1;
for (let i =0; i <numberofLines; i++){
    linesArray.push(new Line(canvas));
    
}
//animate lines
function animate(){

    // clear entire cavas with clear rect to delete old lines before drawing new ones
    ctx.clearRect(0,0, canvas.width, canvas.height);
    //draw line
    for(let line of linesArray){
        line.draw(ctx);
    }
// alternative way to code this:
// linesArray.foreach(object => object.draw(ctx);)

    //update line
    linesArray.forEach(line => line.update());
    //call func recursively
    requestAnimationFrame(animate);
     //sits in window object

}
//call func to init animation
animate();