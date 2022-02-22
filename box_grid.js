const canvasSketch = require('canvas-sketch');

const settings = {
  animate: true,
  dimensions: [ 1080, 1080 ],
};

let sketch = () => {

    return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;
    context.strokeStyle = "white";

    const w = width * 0.1;
    const h = height * 0.1;
    const gap = width * 0.03;
    const off = width * 0.02;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j ++) {

        let x = width * 0.17 + (w + gap) * i;
        let y = width * 0.17 + (h + gap) * j ;

        context.beginPath();
        context.rect(x,y,w,h);
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + off/2, y + off/2, w - off, h - off);
          context.stroke();
        }
      
      }
    }
  };
};

canvasSketch(sketch, settings);


