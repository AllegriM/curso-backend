const validation = (products, res, msg) => {
    if (!msg) msg = 'Producto no encontrado'
    if (products) {
        return res.json(products)
    } else return res.json({ error: msg })
}

module.exports = validation;