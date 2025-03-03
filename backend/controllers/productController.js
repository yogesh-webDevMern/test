const productModel = require("../models/product.model");
// const ProductModel = require("../models/product.model");
const productController={
async getAllProducts(req,res)
{
    try{
const products = req.params.id ? await productModel.findById(req.params.id) : await productModel.find();
res.send({products,flag:1});
    }catch(error)
    {
res.send({message:"Internal server error",flag:0});
    }
},
async checkProductExists (req,res)
{
try{
const name = req.params.name;
const product = await productModel.findOne({name:name}).countDocuments();
console.log(product);
if(product==1)
{
res.send(
    {
            flag:0,
    message:"Product name already exist"
    }
)
}

else
{
res.send({
        flag:1,
    message:"product doesn't exist"
})
}
}catch(error)
{
    res.send({message:`Internal server error ${error.message}`,flag:0});
}
}
}
module.exports = productController;