import Particle from './Particle.js';

class GridCell{
    constructor(size, x, y){
        this.size = size;
        this.particles = [];
        this.nearby = [];
        // this.add(new Particle(size*x+10, size*y+10));
    }
    add(particle){
        this.particles.push(particle);
    }
}

class Simulation{
    constructor(width, height){
        this.grid = [];

        this.cellsize = 500;
        this.width = Math.ceil(width/this.cellsize);
        this.height = Math.ceil(height/this.cellsize);
        this.pwidth = width;
        this.pheight = height;

        this.#initGrid();
    }

    update(ctx){
        var move = [];
        for(var y = 0; y < this.height; y++){
            for(var x = 0; x < this.width; x++){
                const cell = this.grid[y][x];

                for(var i = 0; i < cell.particles.length; i++){
                    const p = cell.particles[i];
                    p.compute(cell.nearby);

                    const newCell = this.getCell(p.nx, p.ny);
                    if(newCell && newCell != cell){
                        move.push({particle: p, from: cell, to: newCell});
                    }
                }
            }
        }
        while(move.length > 0){
            const p = move.shift();
            const particle = p.from.particles.splice(p.from.particles.indexOf(p.particle), 1)[0];
            p.to.add(particle);
            // ctx.fillStyle = 'red';
            // ctx.fillRect(Math.floor(particle.x/this.cellsize)*this.cellsize, Math.floor(particle.y/this.cellsize)*this.cellsize, this.cellsize,this.cellsize)
        }

        for(var y = 0; y < this.height; y++){
            for(var x = 0; x < this.width; x++){
                const cell = this.grid[y][x];

                for(var i = 0; i < cell.particles.length; i++){
                    const p = cell.particles[i];
                    p.update();
                    p.render(ctx)
                }
            }
        }
    }

    add(p){
        if(p.x >= 0 && p.y >= 0 && p.x <= this.pwidth && p.y <= this.pheight){
            this.grid[Math.floor(p.y/this.cellsize)][Math.floor(p.x/this.cellsize)].add(p)
        }
    }

    getCell(x, y){
        if(x >= 0 && y >= 0 && x <= this.pwidth && y <= this.pheight){
            return this.grid[Math.floor(y/this.cellsize)][Math.floor(x/this.cellsize)];
        }else {
            return false;
        }
    }

    #getNearby(x, y){
        var nearby = [this.grid[y][x]]
        if(x < this.grid[0]-1 && y < this.grid.length-1) nearby = nearby.concat(this.grid[y+1][x+1]);
        if(x < this.grid[0].length-1) nearby = nearby.concat(this.grid[y][x+1]);
        if(x < this.grid[0].length-1 && y > 0) nearby = nearby.concat(this.grid[y-1][x+1]);
        if(y > 0) nearby = nearby.concat(this.grid[y-1][x]);
        if(y > 0 && x > 0) nearby = nearby.concat(this.grid[y-1][x-1]);
        if(x > 0) nearby = nearby.concat(this.grid[y][x-1]);
        if(x > 0 && y < this.grid.length-1) nearby = nearby.concat(this.grid[y+1][x-1]);
        if(y < this.grid.length-1) nearby = nearby.concat(this.grid[y+1][x]);

        return nearby;
    }

    #initGrid(){

        for(var y = 0; y < this.height; y++){
            var row = [];
            for(var x = 0; x < this.width; x++){
                row.push(new GridCell(this.cellsize, x, y));
            }
            this.grid.push(row);
        }

        for(var y = 0; y < this.height; y++){
            for(var x = 0; x < this.width; x++){
                this.grid[y][x].nearby = this.#getNearby(x, y);
            }
        }
    }
}

export default Simulation;