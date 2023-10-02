import Simulation from './Simulation.js'

var canv = document.getElementById('canvas');
var ctx = canv.getContext('2d');
canv.width = window.innerWidth;
canv.height = window.innerHeight;

var simulation = new Simulation(canv.width, canv.height);

update();

function update(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canv.width, canv.height);

    simulation.update(ctx)

    window.requestAnimationFrame(update)
}