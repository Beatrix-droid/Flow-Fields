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
ctx.fillStyle="red";
//crete a rectagle at these coordinates
ctx.fillRect(100, 150, 200, 150);

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
        this.startX=Math.random()*this.canvas.width;
        this.startY=Math.random()*this.canvas.height;
        this.endX=Math.random()*this.canvas.width;
        this.endY=Math.random()*this.canvas.height;
        this.lineWidth=(Math.random()*15+1);
        this.color= Math.floor(Math.random()*360);
    }

    draw(context){
        // cycle hsl colours
        context.strokeStyle="hsl(" + this.color + ",100%, 50%)";
        context.lineWidth=this.lineWidth;
        context=context;
        context.beginPath();
        context.moveTo(this.startX, this.startY);
        context.lineTo(this.endX, this.endY);
        context.stroke();  
    }
}

//creates a new object and 
const line1= new Line(canvas);
//draw the line on the screen
line1.draw(ctx);


//create more lines and draw them on the screen
const linesArray=[];
for (let i =0; i <10; i++){
    linesArray.push(new Line(canvas))
    
}
for(let line of linesArray){
    line.draw(ctx);
}