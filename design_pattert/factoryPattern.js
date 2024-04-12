class ServiceFactory {
    constructor(transportMethod, { name, speed }) {
        this.transportMethod = transportMethod;
        this.name = name;
        this.speed = speed;
    }
}

class CadMethod extends ServiceFactory {
    constructor(name, speed) {
        super('Car', { name, speed });
    }
}

class ShipMethod extends ServiceFactory {
    constructor(name, speed) {
        super('Ship', { name, speed });
    }
}

class FlyMethod extends ServiceFactory {
    constructor(name, speed) {
        super('Fly', { name, speed });
    }
}

const car = new CadMethod('Audi', 100);
const ship = new ShipMethod('Boeing', 200);
const fly = new FlyMethod('Airbus', 300);

console.log(car);
console.log(ship);
console.log(fly);