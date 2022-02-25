const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');


const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
};

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {

  const definition = {
    "hood_outline" : { "left": width * 0.28, 
    "right": width * 0.73, 
    "top": height * 0.21, 
    "bottom": height * 0.78},
  }

  const cell = 10;
  const cols = Math.floor(width/cell);
  const rows = Math.floor(height/cell);

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  const hood = [
    new Agent( new Dot(width * 0.490234375, height * 0.990234375)),
    new Agent( new Dot(width * 0.490234375, height * 0.962890625)),
    new Agent( new Dot(width * 0.490234375, height * 0.92041015625)),
    new Agent( new Dot(width * 0.46826171875, height * 0.8603515625)),
    new Agent( new Dot(width * 0.4013671875, height * 0.80859375)),
    new Agent( new Dot(width * 0.3359375, height * 0.83740234375)),
    new Agent( new Dot(width * 0.24853515625, height * 0.76171875)),
    new Agent( new Dot(width * 0.21484375, height * 0.689453125)),
    new Agent( new Dot(width * 0.18212890625, height * 0.57275390625)),
    new Agent( new Dot(width * 0.16236328125, height * 0.4658203125)),
    new Agent( new Dot(width * 0.185078125, height * 0.29248046875)),
    new Agent( new Dot(width * 0.27541015625, height * 0.1416015625)),
    new Agent( new Dot(width * 0.40, height * 0.05)),
    new Agent( new Dot(width * 0.5, height * 0.041)),
    new Agent( new Dot(width * 0.60298828125, height * 0.06)),
    new Agent( new Dot(width * 0.741171875, height * 0.2145703125)),
    new Agent( new Dot(width * 0.8066015625, height * 0.291484375)),
    new Agent( new Dot(width * 0.83005859375, height * 0.369609375)),
    new Agent( new Dot(width * 0.84837890625, height * 0.4704296875)),
    new Agent( new Dot(width * 0.85349609375, height * 0.5802734375)),
    new Agent( new Dot(width * 0.80515625, height * 0.6772265625)),
    new Agent( new Dot(width * 0.72802734375, height * 0.73291015625)),
    new Agent( new Dot(width * 0.65087890625, height * 0.82763671875)),
    new Agent( new Dot(width * 0.53857421875, height * 0.84716796875)),
    new Agent( new Dot(width * 0.490234375, height * 0.962890625)),
    new Agent( new Dot(width * 0.490234375, height * 0.92041015625)),
  ];

  const jacket = [
    new Agent( new Dot(width * 0.20751953125, height * 0.71044921875)),
    new Agent( new Dot(width * 0.173828125, height * 0.72021484375)),
    new Agent( new Dot(width * 0.146484375, height * 0.7412109375)),
    new Agent( new Dot(width * 0.2880859375, height * 0.828125)),
    new Agent( new Dot(width * 0.2431640625, height * 0.86181640625)),
    new Agent( new Dot(width * 0.20751953125, height * 0.89501953125)),
    new Agent( new Dot(width * 0.1513671875, height * 0.9860546875)),
    new Agent( new Dot(width * 0.31, height * 0.84228515625)),
    new Agent( new Dot(width * 0.44, height * 0.86669921875)),
    new Agent( new Dot(width * 0.490234375, height * 0.92578125)),
    new Agent( new Dot(width * 0.48046875, height * 0.98046875)),
    new Agent( new Dot(width * 0.53515625, height * 0.8642578125)),
    new Agent( new Dot(width * 0.51708984375, height * 0.92236328125)),
    new Agent( new Dot(width * 0.51220703125, height * 0.98046875)),
    new Agent( new Dot(width * 0.70166015625, height * 0.794921875)),
    new Agent( new Dot(width * 0.73681640625, height * 0.8642578125)),
    new Agent( new Dot(width * 0.77197265625, height * 0.93359375)),
    new Agent( new Dot(width * 0.86615234375, height * 0.9853515625)),
    new Agent( new Dot(width * 0.84806640625, height * 0.65044921875)),
    new Agent( new Dot(width * 0.80126953125, height * 0.7763671875)),
    new Agent( new Dot(width * 0.83447265625, height * 0.84228515625)),
    new Agent( new Dot(width * 0.79150390625, height * 0.66943359375)),
  ]

  return ({ context, width, height, frame }) => {
    typeContext.fillStyle = "black";
    typeContext.fillRect(0,0, cols, rows);

    const img = new Image();
    img.addEventListener('load', function() {

      typeContext.drawImage(img, 0, 0, typeCanvas.width, typeCanvas.height);
      context.drawImage(typeCanvas, 0, 0);
      
      pixelate(img, context, width, height, cell, cols, rows, definition, frame);
      
      context.strokeStyle = "black";
    
      hood.forEach( function(agent) {
        agent.draw(context);
      });

      context.strokeStyle = "red";

      jacket.forEach( function(agent) {
        agent.draw(context);
      });

      for (let i = 0; i< jacket.length - 4; i++) {

        for (let j = i + 1; j < i + 5; j++) {

          context.beginPath();

          if (j == i + 1) {
            context.lineWidth = "16";
            context.strokeStyle = "grey";
          }
          else {
            context.strokeStyle = "white";
            context.lineWidth = "3";
          }

          context.moveTo(jacket[i].position.x , jacket[i].position.y );
          context.lineTo(jacket[j].position.x + 10, jacket[j].position.y + 10);
          
          context.stroke();
          
        }
      }

      for (let p = hood.length-1; p > 0; p=p-1) {

        context.strokeStyle = "grey";
        
        if (p > hood.length/2 + 3) {

          context.lineWidth = 12;
          
          context.moveTo(hood[p].position.x, hood[p].position.y);
          context.lineTo(hood[p - 2].position.x + 10, hood[p - 2].position.y + 10);
          context.stroke();
          
          context.moveTo(hood[p].position.x , hood[p].position.y );
          context.lineTo(hood[p - 3].position.x + 10, hood[p - 3].position.y + 10);
          context.stroke();
        }
        else {
          context.lineWidth = 6;
        
          context.moveTo(hood[p].position.x , hood[p].position.y );
          context.lineTo(hood[p - 1].position.x , hood[p - 1].position.y );
          context.stroke();
        }
      }

    }, false);
    img.src = "./assets/EXP.jpg";

    
  };
};

canvasSketch(sketch, settings);

function pixelate(img, context, width, height, cell, cols, rows, definition, frame) {
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);

  const typeData = typeContext.getImageData(0,0,cols,rows).data;

  for (let i =0; i < cols * rows; i++) {
    const col = i % cols;
    const row = Math.floor( i / cols);

    const x = col * cell;
    const y= row * cell;

    const xi = col * cell * 3;
    const yi= row * cell * 3;

    context.save();

    const r = typeData[i*4+0];
    const g = typeData[i*4+1];
    const b = typeData[i*4+2];

    const ri = typeData[i*3*4+0];
    const gi = typeData[i*3*4+1];
    const bi = typeData[i*3*4+2];

    if ((xi < definition.hood_outline.left) || (xi > definition.hood_outline.right) || (yi < definition.hood_outline.top) || (yi > definition.hood_outline.bottom)) {
      if ((ri==15) && (gi==16) && (bi==11)) {

        const n = random.noise3D(xi,yi,frame,0.001);
        const scale = math.mapRange(n, -1, 1 ,1, 28);

        context.translate(xi,yi);
        context.rotate( n * Math.PI * 0.2);

        context.strokeStyle = "white";
        context.lineCap = "round";
        context.lineWidth = scale;

        context.moveTo(0,0);
        context.lineTo((cell*3)*0.5, 0);

        context.stroke();
      }
      
    }

    if ((x < definition.hood_outline.left) || (x > definition.hood_outline.right) || (y < definition.hood_outline.top) || (y > definition.hood_outline.bottom)) {      
    }
    else {

      context.translate(x,y);

      context.fillStyle = getGlyph(r,g,b).color;
      context.font = `${cell * 4}px serif`;
      context.fillText(getGlyph(r,g,b).text, 0, 0);
    }

    context.restore();
  }

  
  

}

function getGlyph(r,g,b) {  
  if ((g < 50)) return {"text":" ","color":"white"};
  if ((r < 100)) return {"text":"-","color":"#696969"};
  if ((r < 150)) return {"text":"-","color":"#c4c4c4"};
  if ((r < 200)) return {"text":"-","color":"white"};
  return {"text":random.pick(["."]),"color":"white"}
}

class Dot {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.velocity_x = random.range(-1,1);
    this.velocity_y = random.range(-1,1);
    this.original_x = x;
    this.original_y = y;
  }
}

class Agent {

  constructor(dot){
    this.position = dot;
    this.radius = 10;
  }

  draw(context) {
    context.save();

    context.translate(this.position.x,this.position.y);
    context.beginPath();
    context.arc( 0, 0, this.radius, 0, Math.PI * 2);
    context.lineWidth = 5;
    context.fill();
    context.stroke();

    context.restore();
  }

  get_distance(agent2) {
    let dx = agent2.position.x - this.position.x;
    let dy = agent2.position.y - this.position.y;

    return Math.sqrt( (dx*dx) + (dy*dy) );
  }

  update() {
    this.position.x = this.position.x + this.position.velocity_x;
    this.position.y = this.position.y + this.position.velocity_y;
  }

  bounce() {
    if (Math.abs(this.position.x - this.position.original_x) > 10 ) {
      this.position.velocity_x = -this.position.velocity_x;
    }
    if (Math.abs(this.position.y - this.position.original_y) > 10 ) {
      this.position.velocity_y = -this.position.velocity_y;
    }
  }

}
