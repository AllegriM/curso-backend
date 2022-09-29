class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    describir() {
        console.log(`Me llamo ${this.nombre} y tengo ${this.edad}`)
    }

}