class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas;
    }
    getFullName() {
        return `Mi nombre completo es ${this.nombre} ${this.apellido}`;
    }
    addMascota(string) {
        return this.mascotas.push(string);
    }
    countMascotas() {
        return this.mascotas.length;
    }
    addBook(name, author) {
        return this.libros.push({ name, author });
    }
    getBookNames() {
        return this.libros.map((libro) => libro.name);
    }
}

const usuario1 = new Usuario(
    'Jorgito',
    'ElRabioso',
    [
        { name: 'Harry Potter', author: 'J.K Rowling' },
        { name: 'El señor de los Anillos', author: 'J.R.R Tolkien' },
    ],
    ['Perro', 'Gato', 'Canino']
);

console.log(usuario1.getFullName());
console.log(usuario1.addMascota('Unicornio'));
console.log(usuario1.countMascotas());
console.log(usuario1.addBook('El Niño', 'El Niñato'));
console.log(usuario1.getBookNames());
console.log(usuario1);
