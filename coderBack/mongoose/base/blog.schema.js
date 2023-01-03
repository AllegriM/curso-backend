const mongoose = require('mongoose')

const { Schema } = mongoose

[
    {body: "Me parece genial!", date: "2022/4/19"},
    {body: "Increible!", date: "2022/2/19"},
    {body: "De Acuerdo!", date: "2022/11/19"},
    {body: "Oki Doki Mann!", date: "2022/12/19"},
    {body: "Aguante el D1eg0", date: "2022/1/19"}

]

const blogSchema = new Schema({
    title: String,
    author: String,
    content: String,
    comments: [{ body: String, date: Date}],
    date: {type: Date, default: Date.now()},
    hidden: { type: Boolean},
    // meta: {type: Schema, ref:metaSchema}
    meta: {
        votes: Number,
        favs: Number
    }
})

module.exports = blogSchema