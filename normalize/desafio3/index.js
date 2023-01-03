const { normalize, denormalize, schema } = require("normalizr");
const path = require("path");
const util = require("util");
const fs = require("fs");

const print = (objeto) => console.log(util.inspect(objeto, false, 12, true));

const holding = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./holding.json"), "UTF-8")
);

const empleadoSchema = new schema.Entity("empleado");

const empresaSchema = new schema.Entity("empresa", {
    gerente: empleadoSchema,
    encargado: empleadoSchema,
    empleados: [empleadoSchema],
});

const holdingSchema = new schema.Entity("holding", {
    empresa: empresaSchema,
});
const normalizeObject = normalize(holding, holdingSchema);
print(normalizeObject);

const denormalizeObject = denormalize(
    normalizeObject.result,
    holdingSchema,
    normalizeObject.entities
);
print(denormalizeObject);
console.log(" Objeto Original==> ", JSON.stringify(holding).length);
console.log(" Objeto Normalizado==> ", JSON.stringify(normalizeObject).length);

console.log(
    " Objeto Denormalizado==> ",
    JSON.stringify(denormalizeObject).length
);