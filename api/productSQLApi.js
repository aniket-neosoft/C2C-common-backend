// const connection=require("../config/mysql");

const mysql = require("mysql2/promise");

var connection;
async function makeConnection() {
    connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'Lovin1996@',
        database: 'shoestore'  // use sql mini project database here
    });

    connection.connect().then((success) => console.log("connected...."))
        .catch((err) => console.log(err));
}
makeConnection();

async function getAllShoes() {
    // find all records from collection
    const [res] = await connection.query('SELECT * from shoe');
    return res;
}

async function getShoeById(id) {
    // find all records from collection
    const [res] = await connection.query(`SELECT * from shoe where id = ${id}`);
    return res;
}

async function deleteShoeById(id) {    // find all records from collection
    const [res] = await connection.query(`delete from shoe where _id = ${id}`);
    return res;
}

async function updateShoeById(id, shoe) {
    const query = `
        UPDATE Shoe 
        SET 
        shoeName = ?, 
        brandName = ?, 
        category = ?, 
        description = ?, 
        price = ?, 
        discount = ?, 
        size = ?, 
        color = ?, 
        gender = ?
        WHERE 
        _id = ?`;

    const values = [
        shoe.shoeName,
        shoe.brandName,
        shoe.category,
        shoe.description,
        shoe.price,
        shoe.discount,
        shoe.size,
        shoe.color,
        shoe.gender,
        id
    ];

    const [res] = await connection.query(query, values);
    return res;
}

async function updatePic(id, file) {
    const query = `
        UPDATE Shoe 
        SET 
        image_contentType = ?, 
        image_data = ?
        WHERE 
        _id = ?`;

    const values = [
        file.mimetype,
        file.buffer,
        id
    ];

    const [res] = await connection.query(query, values);
    return res;
}

async function createShoe(shoe) {
    const query = `
        INSERT INTO Shoe 
        (_id, shoeName, brandName, category, description, price, discount, size, color, image_contentType, image_data, gender) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        shoe._id,
        shoe.shoeName,
        shoe.brandName,
        shoe.category,
        shoe.description,
        shoe.price,
        shoe.discount,
        shoe.size,
        shoe.color,
        shoe.image ? shoe.image.mimetype : null,
        shoe.image ? shoe.image.buffer : null,
        shoe.gender
    ];

    const [res] = await connection.query(query, values);
    return res;
}



module.exports = { getAllShoes, getShoeById, deleteShoeById, createShoe, updateShoeById, updatePic }