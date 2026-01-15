const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const {error} = require("console");
const { type } = require("os");
const bodyParser = require('body-parser');
const axios = require('axios');
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");




app.use(express.json());

/*app.use(cors({
  origin: ["http://localhost:3000"], 
  methods: ["GET", "POST", "PUT", "DELETE"]
}));*/

app.use(cors({
  origin:
    process.env.NODE_ENV === "production"
      ? true
      : ["http://localhost:3000"],
  credentials: true,
methods: ["GET", "POST", "PUT", "DELETE"]
}));


app.use(bodyParser.json());
app.use("/api/products", productRoutes); // protected
app.use("/images", express.static("upload")); // public






  // Create Order

  



// Database Connection with MongoDB


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));










//Image Storage Engine
const storage = multer.diskStorage({destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating Upload Endpoint for images
app.use(`/images`,express.static('upload/images'))



app.post("/upload",upload.single('product'),(req,res)=>
{   
    res.json({
        success:1,
        image_url:`/images/${req.file.filename}`
        /*image_url:`http://localhost:${port}/images/${req.file.filename}`*/
    })
})

//Schema for creating products
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type: String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },

})
app.post('/api/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else
    {
        id=1;
    }
    const product = new Product
    ({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// Creating API For deleting Products
app.post('/api/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json
    ({
        success:true,
        name:req.body.name
    })
})

// Creating API for getting all products
app.get('/api/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products fetched");
    res.send(products);

})


//Schema creating for user model
const Users = mongoose.model('Users',{
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    cartData:{type:Object},
    date:{type:Date,default:Date.now}
})


//Creating Endpoint for registring user
app.post('/api/signup',async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check)
    {
        return res.status(400).json({success:false,errors:"Existing user found with same email id or address"})
    }
    let cart = {};
    for (let i=0;i<300;i++)
    {
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })

    await user.save();

    const data ={user:{id:user.id}}

    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({success:true,token})

})


//Creating Endpoint for user login
app.post('/api/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user)
    {
        const passCompare = req.body.password === user.password;
        if(passCompare)
        {
            const data = {user:{id:user.id}}
            const token = jwt.sign(data, process.env.JWT_SECRET);

            res.json({success:true,token});
        }
        else
        {
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else
    {
        res.json({success:false,errors:"Wrong Email Id"});
    }
})

// Creating Endpoint for newcollection data
app.get('/api/newcollections',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-7);
    console.log("Newcollection Fetched");
    res.send(newcollection);

})

//Creating Endpoint for popular in women section

app.get('/api/popularinwomen',async (req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in Women Fetched");
    res.send(popular_in_women);
})


//Creating middleware to fetch user
    const fetchUser = async (req,res,next)=>{
        const token = req.header('auth-token');
        if(!token)
        {
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
        else
        {
            try {
                const data =jwt.verify(token,process.env.JWT_SECRET);
                req.user = data.user;
                next();
              } catch (error) {
                console.error("JWT Verification Error:", error.message);
                res.status(401).send({ errors: "Invalid token, please authenticate again." });
              }
              
        }
    }

//Creaing Endpoint for adding products in cartdata
app.post('/api/addtocart', fetchUser,async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.json({ success: true });
})

//Creating Endpoint foe removing data fro cart data
app.post('/api/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if( userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
  res.json({ success: true });
})

//Creating Endpoint to get cartdata
app.post('/api/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);  
})


//end point for shipping
app.post('/api/shippingscreen', (req, res) => {
    const { name, address, city, postalCode, country } = req.body;
    console.log('Shipping Info Received:', req.body);
  
    // Here you could store it in a DB or forward to a shipping API
    res.json({ message: `Thank you, ${name}. Your shipping info has been received.` });
  });

// Creating Endpoint to clear cart after order is placed
app.post('/api/clearcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });

  let emptyCart = {};
  for (let i = 0; i <= 300; i++) {
    emptyCart[i] = 0;
  }

  userData.cartData = emptyCart;
  await userData.save();

  res.json({ success: true });
});


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend", "build", "index.html")
    );
  });
}

  

app.listen(port,(error)=>
{
    if(!error)
    {
        console.log("Server Running on Port"+port)
    }
    else
    {
        console.log("Error: "+error)
    }
})
