let connection = require('../connection');
let jwt = require('jsonwebtoken');

let firma = "FullstackEM";

let selectUsers = (req, res) => {

    let sql = `SELECT * FROM users`;
    connection.query(sql, (err, users) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            /* users.forEach(user => {

                let decodedPassword = jwt.verify(user.password, firma);
                user.password = decodedPassword;
            }) */
            res.send(users)

        }
    })
}
let insertUser = (req, res) => {

    let newUser = req.body;
    let password = jwt.sign(newUser.password, firma);
    let validator = 'SELECT email FROM users'

    connection.query(validator, (err, info) => {

        let resultEmail = info.find(elem => elem.email === newUser.email)

        if (resultEmail) {

            res.status(409).json({ message: 'This user already exists' })
            return
        }

        let sql = `INSERT INTO users(name, lastname, email, password, img)
        VALUES ("${newUser.name}", "${newUser.lastname}", "${newUser.email}", "${password}", "${newUser.img}");`;
        /*
        {
            "name": "matias",
            "lastname": "fernandez",
            "email":"matifer@gmail.com",
            "img":"foto.png",
            "password": "mati123"
        }
        */
        connection.query(sql, (err, user) => {
            if (err) {
                console.log(err)
                res.status(500).json({ error: 'Make sure to enter all the data' });

            } else {
                res.status(201).json(
                    {
                        message: 'user created',
                        userId: user.insertId
                    }
                )
            }
        })
    })
}

let logIn = (req, res) => {
    let user = req.body
    let token = jwt.sign(user.password, firma);
    let sql = `SELECT password FROM users WHERE users.password = '${token}' AND users.email = '${user.email}'`

    connection.query(sql, (err, passwords) => {

        if (err) {
            res.status(500).json({ message: "Failed to authenticate" })
            return
        } else {
            if (passwords.length == 0) {
                res.json({
                    message: "This user doesn't exist or the password is wrong",
                    user: false
                })
            } else {
                let userLogged = jwt.sign(user, firma)
                res.json({
                    'mensaje': 'Usuario autenticado correctamente',
                    'jwt': userLogged,
                    'user': true
                })
            }

        }
    })

}
module.exports = {
    selectUsers,
    insertUser,
    logIn
}