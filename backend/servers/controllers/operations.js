let connection = require('../connection');

let selectOperations = (req, res) => {
    let sql = `SELECT * FROM operations`;

    connection.query(sql, (err, operations) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            operations.forEach(op => {
                let sqlCategory = `SELECT * FROM categories WHERE id = ${op.category_id}`
                connection.query(sqlCategory, (err, category) => {

                    if (err) {
                        console.log(err)
                        res.status(500).json({ error: 'Internal error' });

                    } else {
                        op.categoryInfo = category[0];

                        if (op == operations[operations.length - 1]) {
                            res.send(operations)
                        }
                    }
                });
            });
        }
    })
}
let selectOperationByUserId = (req, res) => {
    let userId = req.params.id;
    let sql = `SELECT * FROM operations WHERE user_id = ${userId}`
    connection.query(sql, function (err, operations) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            operations.forEach(op => {
                let sqlCategory = `SELECT * FROM categories WHERE id = ${op.category_id}`
                connection.query(sqlCategory, (err, category) => {

                    if (err) {
                        console.log(err)
                        res.status(500).json({ error: 'Internal error' });

                    } else {
                        op.categoryInfo = category[0];

                        if (op == operations[operations.length - 1]) {
                            res.send(operations)
                        }
                    }
                });
            });
        }
    })
}

let insertOperations = (req, res) => {
    let newOp = req.body;
    let sql = `INSERT INTO operations(user_id, category_id, amount, commentary, type, date)
        VALUES (${newOp.user_id}, ${newOp.category_id}, ${newOp.amount}, "${newOp.commentary}", "${newOp.type}", "${newOp.date}");`;

    /*
    {
        "user_id":2,
        "category_id":5,
        "amount":5000,
        "commentary":"sin comentarios",
        "type":"e",
        "date":"2021-05-04",
    }
    
    */
    connection.query(sql, (err, operation) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Make sure to enter all the data' });

        } else {
            res.status(201).json(
                {
                    message: 'operation created',
                    operationId: operation.insertId
                }
            )
        }
    })


}

let updateOperation = (req, res) => {
    let update = req.body;
    let operationId = req.params.id;


    let sql = `UPDATE operations
        SET category_id =${update.category_id},
        amount = ${update.amount},
        commentary = "${update.commentary}",
        date = "${update.date}"
        WHERE id = ${operationId}`

    connection.query(sql, function (err, operation) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Be sure to enter all the data to update' });

        } else {
            res.status(200).json({ message: 'operation updated', operation })
        }
    })

}

let deleteOperation = (req, res) => {
    let operationId = req.params.id;
    let sql = `DELETE FROM operations WHERE id = ${operationId}`

    connection.query(sql, function (err, operation) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Error' });

        } else {
            res.status(200).json({ message: 'operation deleted', operation })
        }
    })
}

module.exports = {
    selectOperations,
    selectOperationByUserId,
    insertOperations,
    updateOperation,
    deleteOperation
}