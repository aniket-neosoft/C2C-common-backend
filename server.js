// const express = require("express");

// const app = express();

// app.listen(5000,()=>console.log("server started"));

// app.get("/",function (req,res) {
//     res.json({
//         "message": "WELCOME TO NODE PROJECT"
//     })
// });

// const api= require("./api/empapi");
// const {getAllUsers, getUserById, deleteUsersById, createUser, updateUserById}=api;

// // const bodyParser=require("body-parser");
// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Middleware to parse URL-encoded request bodies with extended option
// app.use(express.urlencoded({ extended: true }));

// require("./config/mysql");

// app.get("/user/getAll", async function(request, response){
//     const data=await getAllUsers();
//     response.send(data);
// });

// app.get("/user/get/:ID", async function(request, response){
//     const data=await getUserById(request.params.ID);
//     response.send(data);
// });

// app.get("/user/delete/:ID", async function(request, response){
//     const data=await deleteUsersById(request.params.ID);
//     response.send(data);
// });

// // const parser=bodyParser.urlencoded({extended:true})

// app.post("/user/add", async function(request, response){
//     console.log(request.body);
//     const data=await createUser(request.body);
//     response.send(data);
// });

// app.put("/user/update/:ID", async function(request, response){
//     console.log(request.body); 
//     const data=await updateUserById(request.params.ID ,request.body);
//     response.send(data);
// });



const mongodbapi = require("./api/api");
const productMongoApi = require("./api/productApi")
const productSQLApi = require("./api/productSQLApi")
//import {middle1, middle2} from './Middlewares/middlewares';

const cors = require("cors");

// var mysqlapi=require("./api/EmpAPI")
const bodyParser = require("body-parser");

const express = require("express");
const multer = require("multer");
const app = express();
let image;

app.listen(5000, () => console.log("application server started..."))

require("./config/mongodb");


// app.use(bodyParser.urlencoded({extended:true})); /*we are adding middleware with use function */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.get("/", function (request, response) {
    console.log(request);
    response.send("WELCOME TO FIRST NODE PROJECT WITH EXPRESS...........");
});

app.get("/employees/getAll", async function (request, response) {
    // await mysqlapi.getAllEmployees();
    // console.log("getAll Called");
    const data = await mongodbapi.getAllEmployees();
    return response.send(data);
});

app.get("/employees/get/:empId", async function (request, response) {
    const data = await mongodbapi.getEmployeeById(request.params.empId);
    response.send(data);
});

app.get("/employees/delete/:empId", async function (request, response) {
    const data = await mongodbapi.deleteEmployeeById(request.params.empId);
    response.send(data);
});
//const parser=bodyParser.urlencoded({extended:true})

app.post("/employees/add", async function (request, response) {
    // console.log(request.body);
    const data = await mongodbapi.addEmployee(request.body);

    // console.log("data after saving employee",data);
    return response.json({
        success: true,
        data: data
    });
});

app.put("/employees/update/:_id", async function (request, response) {
    // console.log(request.body);
    // console.log(request.params._id);
    // const { _id, ...employee } = request.body;
    // console.log(_id);
    // console.log(employee);
    const data = await mongodbapi.updateEmployee(request.params._id, request.body);
    return response.send(data);
});

const upload = multer({
    limits: { fileSize: 50 * 1024 * 1024 }
});

// app.post("/fileadd", upload.single("image"), async function (request, response) {
//     console.log("pic:", request.file);
//     image = request.file;
// });

app.delete("/employees/delete/:_id", async function (request, response) {
    const data = await mongodbapi.deleteEmployeeById(request.params._id);
    response.send(data);
});

app.post("/add/product", upload.single("image"), async function (request, response) {
    try {
        const shoeData = JSON.parse(request.body.shoe);
        const shoe = {
            _id: shoeData._id,
            shoeName: shoeData.shoeName,
            brandName: shoeData.brandName,
            category: shoeData.category,
            description: shoeData.description,
            price: shoeData.price,
            discount: shoeData.discount,
            size: shoeData.size,
            color: shoeData.color,
            image: request.file,
            gender: shoeData.gender
        };

        // Call the product creation function
        const result = await productSQLApi.createShoe(shoe);

        // Respond with success status
        return response.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        // Handle the error and send appropriate error response
        console.error("Error adding product:", error);
        return response.status(200).json({
            success: false,
            message: "An error occurred while adding the product",
            error: error.message // Optional: expose the error message for debugging
        });
    }
})

app.get("/getAll", async function (req, res) {
    // const data = await productMongoApi.getAllProducts();
    // console.log(data);
    // return res.send(data);

    const data = await productSQLApi.getAllShoes();
    const formattedData = data.map(item => ({
        _id: item._id,
        shoeName: item.shoeName,
        brandName: item.brandName,
        category: item.category,
        description: item.description,
        price: item.price,
        discount: item.discount,
        size: item.size,
        color: item.color,
        gender: item.gender,
        image: item.image_data ? {
            contentType: item.image_contentType,
            data: 'data:image/png;base64,' + item.image_data.toString('base64')
        } : null
        // {
        //     contentType: item.image_contentType,
        //     data: 'data:image/png;base64,' + item.image_data.toString('base64')
        // }
    }));
    return res.json(formattedData);

});

app.put("/update/:_id", async function (request, response) {
    // const data = await productMongoApi.updateProduct(request.params._id, request.body);
    const data = await productSQLApi.updateShoeById(request.params._id, request.body);
    return response.send(data);
});

app.put("/employees/upload/:_id", upload.single("employee_pic"), async function (req, res) {
    console.log("id :", req.params._id);
    console.log("file :", req.file);

    const data = await mongodbapi.uploadEmployeePic(req.params._id, req.file.buffer);
    console.log("uploaded Data", data);

    return res.send(data);
});

app.put("/file/upload/:_id", upload.single("image"), async function (req, res) {
    // const data = await productMongoApi.updatePic(req.params._id, req.file);
    const data = await productSQLApi.updatePic(req.params._id, req.file);
    return res.send(data);
});

app.delete("/product/delete/:_id", async function (request, response) {
    // const data = await productMongoApi.deleteProductById(request.params._id);
    const data = await productSQLApi.deleteShoeById(request.params._id);
    response.send(data);
});