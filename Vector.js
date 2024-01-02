const random = (range) => {return (Math.random()*range*2)-range}

class Vector{
    constructor(x, y){
        this.x = x ?? 0;
        this.y = y ?? 0;
    }

    add(v){
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    scale(value){
        this.x*=value;
        this.y*=value;
        return this;
    }

    magnitude(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }

    normalize(){
        this.scale(1/this.magnitude())
        return this;
    }

    static Random(){
        return new Vector(random(1), random(1));
    }
}

export default Vector;