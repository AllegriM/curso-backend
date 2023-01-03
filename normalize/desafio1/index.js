const { normalize, schema } = require("normalizr");
const path = require("path");
const util = require("util");
const fs = require("fs");

const print = (objeto) => console.log(util.inspect(objeto, false, 12, true));

const empresa = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../empresa.json"), "UTF-8")
);

const empleadoSchema = new schema.Entity("empleado");

const empresaSchema = new schema.Entity("empresa", {
    gerente: empleadoSchema,
    encargado: empleadoSchema,
    empleados: [empleadoSchema],
});

const normalizeObject = normalize(empresa, empresaSchema);
print(normalizeObject);

console.log(" Objeto Original==> ", JSON.stringify(empresa).length);
console.log(" Objeto Normalizado==> ", JSON.stringify(normalizeObject).length);