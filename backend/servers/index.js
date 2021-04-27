const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


let app = express();


app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

const { selectUsers, insertUser, logIn } = require('./controllers/users');
const { selectOperations, insertOperations, updateOperation, deleteOperation } = require('./controllers/operations')
//ROUTES

//user routes
app.get('/users', selectUsers);
app.post('/users', insertUser);
app.post('/login', logIn);

//operations
app.get('/operations', selectOperations);
app.post('/operations', insertOperations);
app.put('/operations/:id', updateOperation);
app.delete('/operations/:id', deleteOperation);


app.listen(3000, () => {
    console.log("The server is running on port 3000")
})