let connection = require('../connection');
let jwt = require('jsonwebtoken');
let firma = "FullstackEM";


let validateToken = (token) => {

    try {
        const decoded = jwt.verify(token, firma);
        return decoded
    } catch {
        return false
    }
}

let defineRol = (req, res, next) => {

    //const token = req.body.token;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzbWVtYXJpbm0wM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InRva2VuMTIzIiwiaWF0IjoxNjE5NTcxNTYyfQ.jAXfOZqNpQmVU72wISfgjTFGZ9kfZFUveBwhbBzlQJA";
    let decodedUser = validateToken(token)

    if (decodedUser) {
        let sql = `SELECT * FROM users WHERE users.email = "${decodedUser.email}"`;
        connection.query(sql, (err, user) => {
            if (err) {
                console.log(err)
                res.status(500).json({ error: 'Internal error' });
            } else {
                req.params.user = user[0];
                next()
            }
        })

    } else {
        res.json({ mensaje: 'Invalid or not provided Token' });
    }

}
module.exports = {
    defineRol,
}