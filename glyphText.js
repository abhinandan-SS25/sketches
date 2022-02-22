const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let text = "A";
let fontsize = "1200";
let fontfamily = "Serif";

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");



const sketch = ({ context, width, height }) => {

  const cell ="20";
  const cols = Math.floor(width/cell);
  const rows = Math.floor(height/cell);

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {

    typeContext.fillStyle = "black";
    typeContext.fillRect(0,0, cols, rows);

    fontsize = cols * 1.2;
    typeContext.font = `${fontsize}px ${fontfamily}`;
    typeContext.fillStyle = "white";
    typeContext.textBaseline = 'middle';
    typeContext.textAlign = 'center';

    typeContext.fillText(text, typeCanvas.width * 0.5, typeCanvas.height * 0.6);

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    const typeData = typeContext.getImageData(0,0,cols,rows).data;

    for ( let i =0; i < cols * rows; i++ ) {

      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      context.save();

      const r = typeData[i*4+0];
      const g = typeData[i*4+1];
      const b = typeData[i*4+2];
      const a = typeData[i*4+3];

      context.translate(x,y);

      if (r > 200) {
        context.fillStyle = "grey";
      }
      else {
        context.fillStyle = "white";
      }

      //context.fillRect(0, 0, cell, cell);
      context.font = `${cell * 2}px ${fontfamily}`;
			if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontfamily}`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(getGlyph(r), 0, 0);

      context.restore();
    }

  };
};
document.addEventListener("keyup", function(e) {
  text = e.key.toUpperCase();
  manager.render();
})

function getGlyph(v) {
  if (v < 50) return " ";
  if (v < 100) return ".";
  if (v < 150) return "-";
  if (v < 200) return "+";
  
  return random.pick([".", "_", "/", text])
}

const start = async () => {
	manager = await canvasSketch(sketch, settings);
};

start();
