const mongoose = require('mongoose');
const StudentModel = require('./schema/students.schema');

const data = [
    {
      nombre: "Pedro",
      apellido: "Mei",
      edad: 21,
      dni: "31155898",
      curso: "1A",
      nota: 7,
    },
    {
      nombre: "Ana",
      apellido: "Gonzalez",
      edad: 32,
      dni: "27651878",
      curso: "1A",
      nota: 8,
    },
    {
      nombre: "José",
      apellido: "Picos",
      edad: 29,
      dni: "34554398",
      curso: "2A",
      nota: 6,
    },
    {
      nombre: "Lucas",
      apellido: "Blanco",
      edad: 22,
      dni: "30355874",
      curso: "3A",
      nota: 10,
    },
    {
      nombre: "María",
      apellido: "García",
      edad: 36,
      dni: "29575148",
      curso: "1A",
      nota: 9,
    },
    {
      nombre: "Federico",
      apellido: "Perez",
      edad: 41,
      dni: "320118321",
      curso: "2A",
      nota: 5,
    },
    {
      nombre: "Tomas",
      apellido: "Sierra",
      edad: 19,
      dni: "38654790",
      curso: "2B",
      nota: 4,
    },
    {
      nombre: "Carlos",
      apellido: "Fernández",
      edad: 33,
      dni: "26935670",
      curso: "3B",
      nota: 2,
    },
    {
      nombre: "Fabio",
      apellido: "Pieres",
      edad: 39,
      dni: "4315388",
      curso: "1B",
      nota: 9,
    },
    {
      nombre: "Daniel",
      apellido: "Gallo",
      edad: 25,
      dni: "37923460",
      curso: "3B",
      nota: 2,
    },
  ];

const DATABASE = "colegio";
const URI = `mongodb://0.0.0.0:27017/${DATABASE}`;

(async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to Database!!");

        // const promisesArray = data.map(student => {
        //   return new StudentModel(student).save()
        // })
        
        // 1)
        // await Promise.allSettled(promisesArray);
        // console.log("Data inserted succesfully!");

        // 1) a)
        const students = await StudentModel.find().sort({nombre: 1})
        // console.log(students)
        // 1) b)
        const studentJoven = await StudentModel.find({}).sort({edad: 1}).limit(1)
        // console.log(studentJoven)
        // 1) c)
        const studentCurso2A = await StudentModel.find({curso: "2A"})
        // console.log(studentCurso2A)
        // 1) d)
        const secondStudentJoven = await StudentModel.find({}).sort({edad: 1}).skip(1).limit(1)
        // console.log(secondStudentJoven)
        // 1) e)
        const studentsNameLastName = await StudentModel.find({}, {nombre: 1, apellido: 1, curso: 1}).sort({apellido: -1})
        // console.log(studentsNameLastName)
        // 1) f)
        const studentsNota10 = await StudentModel.find({nota: 10})
        // console.log(studentsNota10)
        // 1) g) Sumar promedio de notas de los alumnos
        const studentsAverage = await StudentModel.aggregate([ { $group: { _id: null, average: { $avg: "$nota" } } } ])
        // console.log(studentsAverage)
        // 1) h) Sumar promedio de notas del curso "1A"
        const students1AAverage = await StudentModel.aggregate([ { $match: {curso: "1A"} }, { $group: { _id: null, average: { $avg: "$nota" } } } ])
        // console.log(students1AAverage)

    } catch (error) {
        console.log(error)
    }
})();