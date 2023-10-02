import Vector from "./Vector.js";

class Particle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.nx = x;
        this.ny = y;
        this.mass = 1;
        this.velocity = Vector.Random();
        this.force = new Vector();
        this.color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;

    }

    compute(nearby){
        for(var n = 0; n < nearby.length; n++){
            const particles = nearby[n].particles;
            for(var i = 0; i < particles.length; i++){
                const particle = particles[i];
                if(particle = this) continue;

            }
        }
        
        this.nx += this.velocity.x;
        this.ny += this.velocity.y;
    }

    update(){
        this.x = this.nx;
        this.y = this.ny;
    }

    render(ctx){
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+this.velocity.x*10, this.y+this.velocity.y*10);
        ctx.stroke();
    }
}

export default Particle;