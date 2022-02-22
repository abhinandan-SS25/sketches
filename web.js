const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1040, 1040 ],
  animate: true,
};

const sketch = ({ context, width, height }) => {

  const agents = [];

  for (let i = 0; i < 25; i++) {
    agents.push(new Agent(new Dot(random.range(0, width), random.range(0,height))));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "black";

    agents.forEach( function (agent) {
      agent.update();
      agent.collide(width, height);
      agent.draw(context);
      
    })

    for (let i = 0; i< 25; i++) {
      const agent1 = agents[i];

      for (let j = i + 1; j < 25; j++) {
        const agent2 = agents[j];
        const distance = agent1.get_distance(agent2)

        if ( distance >= width) {
        }
        else {
          context.lineWidth = 1;
          context.moveTo(agent1.position.x, agent1.position.y);
          context.lineTo(agent2.position.x, agent2.position.y);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);

class Dot {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.velocity_x = random.range(-0.7,0.7);
    this.velocity_y = random.range(-1,1);
  }
  
}

class Agent {

  constructor(dot){
    this.position = dot;
    this.radius = random.range(5, 20);
  }

  draw(context) {
    context.save();

    context.translate(this.position.x,this.position.y);
    context.beginPath();
    context.arc( 0, 0, this.radius, 0, Math.PI * 2);
    context.lineWidth = 5;
    context.fillStyle = "black";
    context.strokeStyle = "#00ffcc";
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

  collide(width, height) {
    if (this.position.x < 0){
      this.position.x = settings.dimensions[0];
    } 
    if (this.position.x > width){
      this.position.x = 0;
    }
    if (this.position.y < 0){
      this.position.y = settings.dimensions[1];
    } 
    if (this.position.y > height){
      this.position.y = 0;
    }
  }
}
