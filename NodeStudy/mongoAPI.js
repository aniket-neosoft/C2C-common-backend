const mongoose = require("mongoose");

const employee = {
    emp_name: "kiran patil",
    emp_salary: 89000
};

const newEmp = {
    _id: 334,
    emp_name: "poonam pawar",
    emp_salary: 90000,
    emp_email: "poonam@gmail.com"
};

mongoose.connect("mongodb+srv://aniketKumar:HfagiALtKLJIkxuX@cluster0.r6lji.mongodb.net/")
    .then((res) => {
        console.log("connected......");
        runExamples();
    })
    .catch(err => console.log("Connection error:", err));

const empSchema = new mongoose.Schema({
    _id: Number,
    emp_name: { type: String, default: "neosoft" },
    emp_email: String,
    emp_salary: Number
});

const EmployeeModel = mongoose.model("Employee", empSchema);

async function runExamples() {
    await getAllEmployees();
    await getEmployeeById(123);
    await deleteEmployeeById(111);
    await updateEmployee(123, employee);
    await addEmployee(newEmp);
    await deleteManyEmployees({ emp_salary: { $gt: 80000 } });
    // await updateEmployeeById(123, { emp_name: "new name" });
    // await createEmployees([
    //     { _id: 335, emp_name: "John Doe", emp_salary: 70000, emp_email: "john@example.com" },
    //     { _id: 336, emp_name: "Jane Doe", emp_salary: 80000, emp_email: "jane@example.com" }
    // ]);
}

async function getAllEmployees() {
    try {
        const data = await EmployeeModel.find({}).exec();
        console.log("All Employees:", data);
        console.log("_____________");
    } catch (err) {
        console.log("Error in getAllEmployees:", err);
    }
}

async function getEmployeeById(empId) {
    try {
        const data = await EmployeeModel.findById(empId).exec();
        console.log("Employee By ID:", data);
        console.log("_____________");
    } catch (err) {
        console.log("Error in getEmployeeById:", err);
    }
}

async function deleteEmployeeById(empId) {
    try {
        const data = await EmployeeModel.deleteOne({ _id: empId });
        console.log("Deleted Employee:", data);
        console.log("_____________");
    } catch (err) {
        console.log("Error in deleteEmployeeById:", err);
    }
}

async function updateEmployee(empId, employee) {
    try {
        const filter = { _id: empId };
        const updates = employee;
        const data = await EmployeeModel.updateOne(filter, updates);
        console.log("Updated Employee:", data);
        console.log("_____________");
    } catch (err) {
        console.log("Error in updateEmployee:", err);
    }
}

async function addEmployee(employee) {
    try {
        const EmployeeDoc = new EmployeeModel(employee);
        const res = await EmployeeDoc.save();
        console.log("Inserted Employee:", res);
        console.log("_____________");
    } catch (err) {
        console.log("Error in addEmployee:", err);
    }
}

async function deleteManyEmployees(condition) {
    try {
        const data = await EmployeeModel.deleteMany(condition);
        console.log("Deleted Multiple Employees:", data);
        console.log("_____________");
    } catch (err) {
        console.log("Error in deleteManyEmployees:", err);
    }
}

async function updateEmployeeById(empId, updates) {
    try {
        const data = await EmployeeModel.findOneAndUpdate({ _id: empId }, updates, { new: true }).exec();
        console.log("Updated Employee By ID:", data);
        console.log("_____________");
    } catch (err) {
        console.log("Error in updateEmployeeById:", err);
    }
}

async function createEmployees(employees) {
    try {
        const data = await EmployeeModel.create(employees);
        console.log("Created Multiple Employees:", data);
        console.log("_____________");
    } catch (err) {
        console.log("Error in createEmployees:", err);
    }
}
