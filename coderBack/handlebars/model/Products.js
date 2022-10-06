const products = []
let id = 0

class Products {

    constructor() {
        this.list = products;
    }

    getAll() {
        return this.list;
    }

    getById(productId) {
        return this.list.find(product => product.id === +productId);
    }

    add(product) {
        console.log(product)
        if (!product.nombre || !product.precio || !product.imagen) {
            return null;
        }
        const newProduct = {
            id: ++id,
            nombre: product.nombre,
            precio: product.precio,
            imagen: product.imagen
        };
        this.list.push(newProduct);
        return newProduct;
    };

    updateById(productId, product) {
        const productIndex = this.list.findIndex((producto) => producto.id === +productId);
        if (productIndex < 0) return null;
        const {
            nombre,
            descripcion,
            precio,
            imagen
        } = product;
        const updatedProduct = {
            id: this.list[productIndex].id,
            nombre,
            descripcion,
            precio,
            imagen
        };
        this.list[productIndex] = updatedProduct;
        return updatedProduct;
    }

    deleteById(productId) {
        const productIndex = this.list.findIndex((producto) => producto.id === +productId);
        if (productIndex < 0) return null;
        return this.list.splice(productIndex, 1);
    }
}

module.exports = Products;