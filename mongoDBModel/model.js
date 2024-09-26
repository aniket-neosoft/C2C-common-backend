const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
    _id: Number,
    emp_name: String,
    dept_code: String,
    emp_email: String,
    emp_salary: Number,
    experience: Number,
    joining_date: Date,
    secret: String,
    employee_pic: {
        data: Buffer,
        contentType: String
    }
});

const EmployeeModel = mongoose.model("Employee", empSchema);

module.exports = EmployeeModel;