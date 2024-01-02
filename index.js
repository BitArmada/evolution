import Simulation from './Simulation.js'
import Particle from './Particle.js';

const random = (range) => {return (Math.random()*range*2)-range}

var canv = document.getElementById('canvas');
var ctx = canv.getContext('2d');
canv.width = window.innerWidth;
canv.height = window.innerHeight;

var simulation = new Simulation(canv.width, canv.height);

for(var i = 0; i < 5; i++){
    simulation.add(new Particle(Math.random()*canv.width, Math.random()*canv.height, Math.random(), random(1), random(1)));
}

simulation.add(new Particle(0.5*canv.width, 0.5*canv.height, 20, 0, 0));
simulation.add(new Particle(0.5*canv.width+200, 0.5*canv.height, 1, 0, -1.5));
simulation.add(new Particle(0.5*canv.width-200, 0.5*canv.height, 2, 0, 1.6));
simulation.add(new Particle(0,0, 5, 1, 1));
simulation.add(new Particle(canv.width,0.5*canv.height, 3, 0, 0));


update();

function update(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canv.width, canv.height);

    simulation.update(ctx)

    window.requestAnimationFrame(update)
}