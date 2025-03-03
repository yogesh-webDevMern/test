const mongoose = require("mongoose");
const ProductSchema =new mongoose.Schema({
    name:{type:String,required:true},
    slug:{type:String,required:true,unique:true},
    price:{type:Number,required:true},
    discount:{type:Number,default:0},
    final_price:{type:Number,required:true},
    description:{type:String,required:true},
    main_image:{type:String,required:true},
    other_images:{
        type:[String],
        required:true
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    colors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"colorModel",
            required:true
        }
    ]
});
module.exports=mongoose.model("product",ProductSchema);