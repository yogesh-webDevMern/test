const express = require("express");
const mongoose = require("mongoose");
const categoryRouter = require("./routers/categoryrouter");
const colorRouter = require("./routers/colorRouter");
const productRouter = require("./routers/product.router");
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors({origin:'http://localhost:3000'}));

app.use("/category",categoryRouter);
app.use("/color",colorRouter);
app.use("/product",productRouter);


mongoose.connect("mongodb://127.0.0.1:27017",{dbName:"Ishop"})
.then(
    ()=>
    {
        app.listen(5000,()=>
            {
                console.log("server is running on port 5000");
            })
    }
).catch(
    ()=>
    {
        console.log("unable to connect to the database");
    }
)


