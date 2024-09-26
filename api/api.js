const EmployeeModel=require("../mongoDBModel/model");

async function getAllEmployees(){
    return await EmployeeModel.find({}).exec();
}
async function getEmployeeById(empId){
    return await EmployeeModel.findById(empId).exec(); // _id
}
async function deleteEmployeeById(empId){
    return await EmployeeModel.deleteOne({_id:empId});
}
async function updateEmployee(_id, employee){
    const filter={_id:_id};
    const updates=employee;
    return await EmployeeModel.updateOne(filter,updates);
}
async function addEmployee(employee){
    const EmployeeDoc=new EmployeeModel(employee);
    // console.log("EmployeeDoc", EmployeeDoc);
    return await EmployeeDoc.save();
}

async function uploadEmployeePic(_id, employee_pic){
    const filter={_id:_id};
    const updates={employee_pic:employee_pic};
    return await EmployeeModel.updateOne(filter,updates);
}

module.exports={getAllEmployees,getEmployeeById, deleteEmployeeById,updateEmployee, addEmployee, uploadEmployeePic}