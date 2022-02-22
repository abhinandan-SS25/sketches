const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ],
  bleed: 0,
  fps:1,
  playbackRate: "throttle", 
  animate: false, 
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "#f0efeb";
    context.lineWidth = "3";

    var x = width * 0.5;
    var y = height * 0.5;
    var w = width * 0.20;
    var h = height * 0.2;
    var num = 45;

    for (let i = 0; i<num; i++) {

      var slice = 360/num;
      var angle = math.degToRad(slice*i);
      
      context.save();

      context.translate(x, y);
      context.rotate(angle);
      context.beginPath();
      context.rect(0, 0, w, h);
      context.stroke();
      context.restore();
    }

    context.fillStyle = "black";
    w = width * 0.1;
    h = height * 0.01;
    num = 40;
    radius = width * 0.4;

    for (let q = 1; q <= num; q++) {

      const colors = ["#ffffff", "#f21160","#ffffff", "#0ae0f0", "#ffffff", "#000000","#000000","#0ff288","#000000","#000000","#cdf00a", ]

      if (q % random.rangeFloor(2, 12) == 0){
        context.fillStyle = "gold";
      }
      else {
        context.fillStyle = "white";
      }

      slice = 360/num;
      angle = math.degToRad(slice*q);

      x = width * 0.5 + radius * Math.sin(angle + Math.PI/2);
      y = height * 0.5 + radius * Math.cos(angle + Math.PI/2);

      context.save();

      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.5,0.8), random.range(0.1,0.9))
      
      context.beginPath();
      context.fillRect(-w *0.5, random.range(0, -h*0.5), w, h);
      context.stroke();

      context.restore();

      context.save();

      context.translate(width * 0.5, width * 0.5);
      context.rotate(-angle + Math.PI/2);
      context.strokeStyle = colors[random.rangeFloor(0,colors.length)];

      context.lineWidth = random.range(5,14);

      context.beginPath();
      context.arc(0, 0, random.range(radius*0.87, radius *1.3), -angle * 0.2, angle * 0.2);
      context.stroke();

      context.restore();

    }
    
  };
};

canvasSketch(sketch, settings);
