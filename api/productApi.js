const ProductModel = require("../mongoDBModel/productModel");

async function getAllProducts() {
    return await ProductModel.find({}).exec();
}
async function getProductById(articleNo) {
    return await ProductModel.findById(articleNo).exec(); // _id
}
async function deleteProductById(_id) {
    return await ProductModel.deleteOne({ _id: _id });
}
async function updateProduct(articleNo, product) {
    const filter = { _id: articleNo };
    const updates = product;
    return await ProductModel.updateOne(filter, updates);
}
async function addProduct(product) {
    const ProductDoc = new ProductModel(product);
    return await ProductDoc.save();
}

async function updatePic(_id, file) {
    const filter = { _id: _id };
    const updates = {
        image: {
            data: file.buffer,
            contentType: file.mimetype
        }
    };
    return await ProductModel.updateOne(filter, updates);
}

module.exports = { getAllProducts, getProductById, deleteProductById, updateProduct, addProduct, updatePic }