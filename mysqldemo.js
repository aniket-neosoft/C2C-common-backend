var mysql = require('mysql2/promise');

var connection;

const department = {
    department_name: 'Finance'
}
const department2 = {
    department_name: 'Update'
}

async function makeConnection() {
    connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'Lovin1996@',
        database: 'nodetraining'
    });

    connection.connect().then((success) => {
        console.log("connected....");
        getAllDepartments();
        getDepartmentById(3);
        deleteDepartmentById(2);
        createDepartment(department);
        updateDepartmentById(6,department2);

    }).catch((err) => console.log(err));

}
makeConnection();
async function getAllDepartments() {
    // find all records from collection
    const [res] = await connection.query('SELECT * from departments');
    console.log(...res);
}
async function getDepartmentById(id) {
    // find all records from collection
    const [res] = await connection.query(`SELECT * from departments where department_id = ${id}`);
    console.log(...res);
}
async function deleteDepartmentById(id) {
    // find all records from collection
    const [res] = await connection.query(`delete from departments where department_id = ${id}`);
    console.log(res);
}
async function createDepartment(department) {
    // find all records from collection
    const [res] = await connection.query(`insert into departments (department_name) values ('${department.department_name}')`);
    console.log(res);
}
async function updateDepartmentById(id,department) {
    // find all records from collection
    const [res] = await connection.query(`UPDATE departments
                                        SET department_name = '${department.department_name}'
                                        WHERE department_id = ${id}
                                        `);
    console.log(res);
}