const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');


const settings = {
  dimensions: [ 2048, 2048 ],
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

  const cell = 20;
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
    new Agent( new Dot(width * 0.17236328125, height * 0.4658203125)),
    new Agent( new Dot(width * 0.205078125, height * 0.29248046875)),
    new Agent( new Dot(width * 0.29541015625, height * 0.1416015625)),
    new Agent( new Dot(width * 0.40, height * 0.1)),
    new Agent( new Dot(width * 0.5, height * 0.078)),
    new Agent( new Dot(width * 0.56298828125, height * 0.095)),
    new Agent( new Dot(width * 0.62451171875, height * 0.1025390625)),
    new Agent( new Dot(width * 0.701171875, height * 0.1845703125)),
    new Agent( new Dot(width * 0.7666015625, height * 0.271484375)),
    new Agent( new Dot(width * 0.81005859375, height * 0.349609375)),
    new Agent( new Dot(width * 0.83837890625, height * 0.4404296875)),
    new Agent( new Dot(width * 0.83349609375, height * 0.5302734375)),
    new Agent( new Dot(width * 0.78515625, height * 0.6572265625)),
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
    new Agent( new Dot(width * 0.1513671875, height * 0.9560546875)),
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
    new Agent( new Dot(width * 0.80615234375, height * 0.9853515625)),
    new Agent( new Dot(width * 0.76806640625, height * 0.71044921875)),
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
        agent.update();
        agent.draw(context);
        agent.bounce();
      });

      context.strokeStyle = "yellow";

      jacket.forEach( function(agent) {
        agent.update();
        agent.draw(context);
        agent.bounce();
      });

      for (let i = 0; i< jacket.length - 4; i++) {

        for (let j = i + 1; j < i + 5; j++) {

          context.beginPath();

          if (j == i + 1) {
            context.lineWidth = "16";
            context.strokeStyle = "brown";
          }
          else {
            context.strokeStyle = "red";
            context.lineWidth = "3";
          }

          context.moveTo(jacket[i].position.x , jacket[i].position.y );
          context.lineTo(jacket[j].position.x + 10, jacket[j].position.y + 10);
          
          context.stroke();
          
        }
      }

      for (let p = hood.length-1; p > 0; p=p-1) {

        context.strokeStyle = "red";
        
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
    img.src = "./assets/hooded_r.jpg";

    
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

    context.save();

    const r = typeData[i*4+0];
    const g = typeData[i*4+1];
    const b = typeData[i*4+2];

    context.translate(x,y);

    if ((x < definition.hood_outline.left) || (x > definition.hood_outline.right) || (y < definition.hood_outline.top) || (y > definition.hood_outline.bottom)) {
      
    }
    else {
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
  if ((r < 200)) return {"text":"-","color":"#dedede"};
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
