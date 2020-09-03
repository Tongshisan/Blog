class Animal {
    protected name;
    protected constructor(name) {
        this.name = name
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name)
        console.log(this.name)
    }
}

