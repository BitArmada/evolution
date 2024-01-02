import Vector from "./Vector.js";

class Particle{
    constructor(x, y, mass, vx, vy){
        this.x = x;
        this.y = y;
        this.nx = x;
        this.ny = y;
        this.mass = mass ?? 0.7+Math.random()*5 ;
        // this.velocity = Vector.Random().scale(1);
        this.velocity = new Vector(vx, vy)
        this.force = new Vector();
        this.color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;

    }

    compute(nearby){
        var fx = 0;
        var fy = 0;
        // console.log(nearby)
        for(var n = 0; n < nearby.length; n++){
            const particles = nearby[n].particles;
            for(var i = 0; i < particles.length; i++){
                const particle = particles[i];
                if(particle == this) continue;

                var direction = new Vector(particle.x-this.x, particle.y-this.y)
                direction.normalize();
                const distance = Math.sqrt(Math.pow(particle.x-this.x, 2) + Math.pow(particle.y-this.y, 2))
                const force = (particle.mass*this.mass)/(Math.pow(distance, 2))
                fx += force * direction.x*20;
                fy += force * direction.y*20;
                
            }
        }

        this.velocity.x += fx / this.mass; // A = F/M
        this.velocity.y += fy / this.mass; // A = F/M
        
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
        ctx.arc(this.x, this.y, 5*this.mass, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.linewidth = 2
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+this.velocity.x*10, this.y+this.velocity.y*10);
        ctx.stroke();
    }
}

export default Particle;