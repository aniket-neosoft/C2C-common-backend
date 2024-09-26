// const connection=require("../config/mysql");

const mysql = require("mysql2/promise");

var connection ;
async function makeConnection(){
     connection = await mysql.createConnection({
        host : '127.0.0.1',
        user: 'root',
        password: 'Lovin1996@',
        database: 'shoestore'  // use sql mini project database here
      }); 

    connection.connect().then((success)=>console.log("connected...."))
    .catch((err)=>console.log(err));
}
makeConnection();

async function getAllUsers() {
    // find all records from collection
    const [res] = await connection.query('SELECT * from users');
    return res;
}

async function getUserById(id) {
    // find all records from collection
    const [res] = await connection.query(`SELECT * from users where id = ${id}`);
    return res;
}

async function deleteUsersById(id) {
    // find all records from collection
    const [res] = await connection.query(`delete from users where id = ${id}`);
    return res;
}

async function updateUserById(id,user) {
    // find all records from collection
    const [res] = await connection.query(`UPDATE users SET email = '${user.email}',username = '${user.username}'WHERE id = ${id}`);
    return res;
}

async function createUser(user) {
    console.log("user",user);
    
    // find all records from collection
    const [res] = await connection.query(`INSERT INTO users (username, email, password) VALUES ('${user.username}', '${user.email}', '${user.password}')`);
    return res;
}


module.exports={getAllUsers, getUserById, deleteUsersById, createUser, updateUserById}