const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express();
let upload = multer();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

app.use(upload.array());
app.use(express.static('public'));

const { selectUsers, selectUserByPassword, insertUser, logIn } = require('./controllers/users');
const { selectOperationsById, selectOperationByUserId, insertOperations, updateOperation, deleteOperation } = require('./controllers/operations');
const { selectCategories, selectCategoriesById, insertCategory, updateCategory } = require('./controllers/categories');
const { defineRol } = require('./middlewares/validation')


//ROUTES

//user routes
app.get('/users', selectUsers);
app.get('/users/:pass', defineRol, selectUserByPassword);
app.post('/users', insertUser);
app.post('/login', logIn);

//operations
app.get('/operations', defineRol, selectOperationByUserId);
app.get('/operations/:id', selectOperationsById);
app.post('/operations', defineRol, insertOperations);
app.put('/operations/:id', updateOperation);
app.delete('/operations/:id', deleteOperation);

//categories

app.get('/categories', selectCategories);
app.get('/categories/:id', selectCategoriesById);
app.post('/categories', insertCategory);
app.put('/categories/:id', updateCategory);



app.listen(3000, () => {
    console.log("The server is running on port 3000")
})