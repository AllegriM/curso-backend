const { normalize, denormalize, schema } = require("normalizr");
const util = require("util");

const originalData = {
    id: "999",
    posts: [
        {
            id: "123",
            author: {
                id: "1",
                nombre: "Pablo",
                apellido: "Perez",
                DNI: "20442654",
                direccion: "CABA 123",
                telefono: "1567876547",
            },
            title: "My awesome blog post",
            comments: [
                {
                    id: "324",
                    commenter: {
                        id: "2",
                        nombre: "Nicole",
                        apellido: "Gonzalez",
                        DNI: "20442638",
                        direccion: "CABA 456",
                        telefono: "1567811543",
                    },
                },
                {
                    id: "325",
                    commenter: {
                        id: "3",
                        nombre: "Pedro",
                        apellido: "Mei",
                        DNI: "20446938",
                        direccion: "CABA 789",
                        telefono: "1567291542",
                    },
                },
            ],
        },
        {
            id: "1123",
            author: {
                id: "2",
                nombre: "Nicole",
                apellido: "Gonzalez",
                DNI: "20442638",
                direccion: "CABA 456",
                telefono: "1567811543",
            },
            title: "My awesome blog post",
            comments: [
                {
                    id: "1324",
                    commenter: {
                        id: "1",
                        nombre: "Pablo",
                        apellido: "Perez",
                        DNI: "20442654",
                        direccion: "CABA 123",
                        telefono: "1567876547",
                    },
                },
                {
                    id: "1325",
                    commenter: {
                        id: "3",
                        nombre: "Pedro",
                        apellido: "Mei",
                        DNI: "20446938",
                        direccion: "CABA 789",
                        telefono: "1567291542",
                    },
                },
            ],
        },
        {
            id: "2123",
            author: {
                id: "3",
                nombre: "Pedro",
                apellido: "Mei",
                DNI: "20446938",
                direccion: "CABA 789",
                telefono: "1567291542",
            },
            title: "My awesome blog post",
            comments: [
                {
                    id: "2324",
                    commenter: {
                        id: "2",
                        nombre: "Nicole",
                        apellido: "Gonzalez",
                        DNI: "20442638",
                        direccion: "CABA 456",
                        telefono: "1567811543",
                    },
                },
                {
                    id: "2325",
                    commenter: {
                        id: "1",
                        nombre: "Pablo",
                        apellido: "Perez",
                        DNI: "20442654",
                        direccion: "CABA 123",
                        telefono: "1567876547",
                    },
                },
            ],
        },
    ],
};

const print = (objeto) => console.log(util.inspect(objeto, false, 12, true));

// definimos un esquema para la entidad user

const user = new schema.Entity("users");

// definimos un esquema para la entidad comment

const comment = new schema.Entity("comments", {
    commenter: user,
});

// definimos un esquema para la entidad article
const article = new schema.Entity("articles", {
    author: user,
    comments: [comment],
});

// definimos un esquema para la entidad Post
const posts = new schema.Entity("posts", {
    posts: [article],
});
console.log("<=== Objeto Original ====> ");
console.log(JSON.stringify(originalData).length);

console.log("<=== Objeto Normalizado ====> ");
const normalizedData = normalize(originalData, posts);
print(normalizedData);
console.log(" Objeto Normalizado==> ", JSON.stringify(normalizedData).length);

console.log("<=== Objeto Denormalizado ====> ");
const denormalizedData = denormalize(
    normalizedData.result,
    posts,
    normalizedData.entities
);
print(normalizedData);
console.log(" Objeto Original==> ", JSON.stringify(originalData).length);
console.log(
    " Objeto Denormalizado==> ",
    JSON.stringify(denormalizedData).length
);