# MY PERSONAL MANAGER
Full Stack Proyect

## Description

MPM (My Personal Manager) is an application intended for personal budget management. It allows you to create and edit money income and expenses, and show a balance of registered operations.

### Technologies used in this project

- HTML
- CSS (SASS)
- JAVASCRIPT
- GIT AND GITHUB 
- MYSQL
- NODE.JS
- Dependencies:
    - Express.js
    - Cors
    - Mysql2
    - JWT (JSON Web Token)
    - Nodemon
    - Multer


## Getting Started 🚀

In this README.md you will find the specifications to install, initialize and use this application

### Installation ⚙️

- Clone this repository:
    https://github.com/EsmeraldaMarin/personal-manager.git
- Install the dependencies

    _Use_
    ```
    npm install
    ```
     _or_
    ```
    npm i
    ```

    Dependencies:
    ```
    {
        "cors": "^2.8.5",
        "express": "^4.17.1",
        "jsonwebtoken": "^8.5.1",
        "multer": "^1.4.2",
        "mysql2": "^2.2.5",
        "nodemon": "^2.0.7"
    }
    ```
- Create and structure the databases

    - To create the database open a new query in MySql and run the code in the file: backend/database/createDB.sql

    - To create the tables open a new query in MySql and run the code in the file: backend/database/createTables.sql

    - To add information to the tables, run the code located in: backend/database/insertData.sql

    - You can also add the data you want to start, but one of each is enough.
---

### Initialization ⚙️
- Initialize the server

    _Using nodemon:_
    ```
    nodemon backend/servers/index.js
    ```
- If everything is OK you will receive this message: 

    _"The server is running on port 3000"_

---

### LOG IN 🚀

The first thing you should do when you initialize the live server is to select the "public" folder, which is where the ".html" files are located, then you must log in or create a user. The API will allow you to log in if the data entered matches those of the logged in user. The API will allow you to create a user as long as you meet the specified requirements (do not repeat the user's email already created, repeat the password, fill in all the fields).

[![img1.png](https://i.postimg.cc/SxXDLv91/img1.png)](https://postimg.cc/LJpt2vNj)


### HOME

Once logged in, you will find the home of the application. If you have operations already created, the last 10 registered and the total balance of all operations will be displayed there.

[![img2.png](https://i.postimg.cc/J065ZNzW/img2.png)](https://postimg.cc/PvDDk8D6)
[![img6.png](https://i.postimg.cc/Z5365tpm/img6.png)](https://postimg.cc/HrYr6N6v)


### OPERATIONS

In the operations section you will be able to see a list of all the operations separated according to their type (income or expenses), in case you want to see the details of an operation, you can click on it. Once you have selected an operation, you can edit or delete it as needed.

[![img4.png](https://i.postimg.cc/k47QH1Vm/img4.png)](https://postimg.cc/nsw9j1YR)

To create an operation, you must click the button with the "+" symbol that you will easily find on the screen. In the window to create operations you will find a set of fields that you must complete or select in order to efficiently create an operation.

[![img3.png](https://i.postimg.cc/9F0pVnLX/img3.png)](https://postimg.cc/mtxMy8xK)

### CATEGORIES

The categories section includes all the categories that are offered so that you can have a better organization of your movements. To create new categories, you must do it from an external application such as [POSTMAN](https://www.postman.com/api-documentation-tool/)(recommended) or do it from the database
If you click on one of all the categories shown on the screen, you will be able to see all the operations that have that category selected.

[![img5.png](https://i.postimg.cc/597BPmbh/img5.png)](https://postimg.cc/RqtJhK3d)

#### >> Endpoints ⚙️

- USERS (http://localhost:3000/users)

    Methods:
    - GET
    - GET BY TOKEN 
    - POST
- LOGIN (http://localhost:3000/login)

    Methods:
    - POST

- OPERATIONS (http://localhost:3000/operations)

    Methods:
    - GET
    - GET BY ID 
    - POST
    - PUT
    - DELETE
- CATEGORIES (http://localhost:3000/categories)

    Methods:
    - GET
    - GET BY ID 
    - POST
    - PUT