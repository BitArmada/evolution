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

    static Random(){
        return new Vector(random(1), random(1));
    }
}

export default Vector;