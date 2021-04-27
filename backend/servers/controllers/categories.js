let connection = require('../connection');

let selectCategories = (req, res) => {
    let sql = `SELECT * FROM categories`;

    connection.query(sql, (err, categories) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            res.send(categories)
        }
    })
}

let selectCategoriesById = (req, res) => {

    let categoryId = req.params.id;
    let sql = `SELECT * FROM categories WHERE id = ${categoryId}`
    connection.query(sql, function (err, category) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            res.send(category)
        }
    })
}

let insertCategory = (req, res) => {
    let newCat = req.body;
    let sql = `INSERT INTO categories(name, icon, color, type)
        VALUES ("${newCat.name}", "${newCat.icon}", "${newCat.color}", "${newCat.type}");`;

    /*
    {
        "name":"",
        "icon":"",
        "color":"",
        "type":"e"
    }
    */
    connection.query(sql, (err, category) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Make sure to enter all the data' });

        } else {
            res.status(201).json(
                {
                    message: 'category created',
                    categoryId: category.insertId
                }
            )
        }
    })
}
let updateCategory = (req, res) => {
    let update = req.body;
    let categoryId = req.params.id;


    let sql = `UPDATE categories
        SET name = "${update.name}",
        icon = "${update.icon}",
        color = "${update.color}",
        type = "${update.type}"
        WHERE id = ${categoryId}`


    connection.query(sql, function (err, category) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Be sure to enter all the data to update' });

        } else {
            res.status(200).json({ message: 'category updated', category })
        }
    })
}

module.exports = {
    selectCategories,
    selectCategoriesById,
    insertCategory,
    updateCategory
}
