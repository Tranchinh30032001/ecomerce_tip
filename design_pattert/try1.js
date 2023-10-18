class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    getName() {
        return this.name;
    }

    createProduct() {
        console.log('this: ', this)
    }
}

const iphone7 = {
    name: "iPhone 7",
    price: 100,

    takePhoto() {
        console.log("Take photo: ", this)
    }
}

new Product("Laptop", 100).createProduct()
iphone7.takePhoto()