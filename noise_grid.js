const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const TweakPane = require('tweakpane');

const params = {
  cols: 30,
  rows: 30,
  lineCap: "butt",
  theme: "light",
  lineLength: "0.80",
  animate: true,
  frame: 0,
  lineColor: "none",
  maxWidth: 30,
  minWidth: 1,
}

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: params.animate,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {

    if (params.theme == "light") {
      context.fillStyle = 'white';
      context.strokeStyle = "black";
    }
    else {
      context.fillStyle = 'black';
      context.strokeStyle = "white";
    }

    if (params.lineColor == "none") {
    }
    else {
      context.strokeStyle = params.lineColor;
    }
    
    context.fillRect(0, 0, width, height);

    const cols=params.cols;
    const rows=params.rows;
    const cellNum = cols * rows;

    const gridw = width * 0.8;
    const gridh = width * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / cols;
    const marginw = (width - gridw) / 2;
    const marginh = (height - gridh) / 2;

    for ( let i = 0; i < cellNum; i++) {
      const col = i % cols;
      const row = Math.floor( i / cols );

      const x = cellw * col;
      const y = cellh * row;

      const w = cellw * params.lineLength;

      let f;
      if (params.animate) {
        f = frame * 10;
      }
      else {
        f = params.frame;
      }
      const n = random.noise3D(x,y,f,0.001);
      const scale = math.mapRange(n, -1, 1 ,params.minWidth, params.maxWidth);

      context.save() ;

      context.translate(x,y);
      context.translate(marginw, marginh);
      context.rotate( n * Math.PI * 0.2);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(-1 * w, 0);
      context.lineTo(0,0);
      context.stroke();

      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new TweakPane.Pane();
  let grid;

  grid = pane.addFolder( {title: "Grid"});
  grid.addInput(params, "cols", {min:2, max:50, step:1});
  grid.addInput(params, "rows", {min:2, max:50, step:1});
  grid.addInput(params, "minWidth", {min:1, max:40, step:1});
  grid.addInput(params, "maxWidth", {min:1, max:40, step:1});
  grid.addInput(params, "animate");
  grid.addInput(params, "frame", {min:0, max:2000, step:1});


  nature = pane.addFolder( {title: "Nature"});
  nature.addInput(params, "lineCap", { options: {butt: "butt", round:"round", square:"square"}});
  nature.addInput(params, "theme", { options: {dark: "dark", light: "light"}});
  nature.addInput(params, "lineColor", { options: {none: "none", red: "red", yellow: "yellow", cyan: "#00fbff", green: "green"}});
  nature.addInput(params, "lineLength", {min:0.5, max:1});
}

createPane();
canvasSketch(sketch, settings);



