const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const multer=require("multer");
const cors = require("cors");
const path = require("path");


connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
  res.status(200).send("Express App is Running cool")
})
const storage=multer.diskStorage({
  destination:'./Upload/images',
  filename:(req,file,cb)=>{
      return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload=multer({storage:storage})
app.use('/images',express.static('Upload/images'))

app.use('/upload',upload.single('product'),require('./routes/imageupload'))

// Route for  Products

app.use("/api/moviesproducts", require("./routes/moviesRoutes"));
app.use("/api/foodproducts", require("./routes/foodRoutes"));

// Route for User Registration and Authentication
app.use("/api/user", require("./routes/userRoutes"));

//Route for Cart
app.use("/api/cart", require("./routes/cartRoutes"));

//Route for OrderDetails
app.use('/api', require('./routes/OrderDetailRoutes'));

app.use('/', require('./routes/commentRoutes'))

app.use('/api/rating', require('./routes/ratingRoutes'));

app.use('/api', require('./routes/contactRoutes'));

// Error handling middleware
app.use(errorHandler);

// APP CONFIG START
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});







// const port =8000; 
// const express = require("express");
// const path = require("path");
// const app = express();
// const mongoose =require("mongoose")
// const jwt=require("jsonwebtoken")
// const multer=require("multer");
// const cors =require("cors");
// const { type } = require("os");
// const { log } = require("console");
// app.use(express.json())
// app.use(cors());

// //Database Connection with Mongodb
// mongoose.connect("mongodb+srv://pranavguptakuna08:pranav08@cluster0.d673c.mongodb.net/reelbite")

// // api creation
// app.get("/",(req,res)=>{
//     res.send("EXPRESS APP IS RUNNING")
// })


// // user creation

// const Users=mongoose.model('Users',{
//     name:{
//         type:String,
//     },
//     email:{
//         type:String,
//         unique:true,
//     },
//     password:{
//         type:String,
//         },
//     cartData:{
//         type:Object,
//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     }
//     }
// )
// // Schema for creating Product
// const Movies=mongoose.model("Movies",{
//     id:{
//         type:Number,
//         required:true,
//     },
//     name:{
//         type:String,
//         required:true,
//     },
//     image:{
//         type:String,
//         required:true,
//     },
//     category:{
//         type:String,
//         required:true,
//     },
//     price:{
//         type:Number,
//         required:true,
//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     },
//     available:{
//         type:Boolean,
//         default:true,
//     }
// })
// const Food=mongoose.model("Food",{
//     id:{
//         type:Number,
//         required:true,
//     },
//     name:{
//         type:String,
//         required:true,
//     },
//     image:{
//         type:String,
//         required:true,
//     },
//     price:{
//         type:Number,
//         required:true,
//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     },
//     available:{
//         type:Boolean,
//         default:true,
//     }
// })
// const Product=mongoose.model("Products",{
//     id:{
//         type:Number,
//         required:true,
//     },
//     name:{
//         type:String,
//         required:true,
//     },
//     image:{
//         type:String,
//         required:true,
//     },
//     price:{
//         type:Number,
//         required:true,
//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     },
//     available:{
//         type:Boolean,
//         default:true,
//     }
// })
// app.post('/addproduct',async(req,res)=>{
//     let products=await Product.find({})
//     let id;
//     if (products.length>0){
//         let last=products.slice(-1);
//         let last1=last[0]
//         id=last1.id+1;
//     }
//     else{
//         id=1;
//     }
//     const product=new Product({
//         id:id,
//         name:req.body.name,
//         image:req.body.image,
//         category:req.body.category,
//         price:req.body.price,
//     })
//     console.log(product);
//     await product.save();
//     console.log("Saved");
//     res.json({
//         success:true,
//         name:req.body.name,
//     })
    
// })

// app.post('/removeproduct',async(req,res)=>{
//     await Product.findOneAndDelete({id:req.body.id});
//     console.log("removed");
//     res.json({
//         success:true,
//         name:req.body.name,
//     })
    
// })

// app.post('/allproducts',async(req,res)=>{
//     let products=await Product.find({});
//     console.log("all products fetched");
//     res.json(products)
    
// })


// // creating endpoint for signup

// app.post('/signup',async(req,res)=>{
//     let check=await Users.findOne({email:req.body.email})
//     if(check){
//         return res.status(400).json({
//             success:false,
//             error:"Existing user found with same email address"
//         })
//     }
//     let cart={};
//     for(let index=0;index<300;index++){
//         cart[index]=0;
//     }
//     const user =new Users({
//         name:req.body.username,
//         email:req.body.email,
//         password:req.body.password,
//         cartData:cart,
//     })
//     await user.save();
//     const data={
//         user:{
//             id:user.id
//         }
//     }
//     const token =jwt.sign(data,'secret_ecom')
//     res.json({
//         success:true,token,
//     })
// })

// // creating endppoint for login
// app.post('/login',async(req,res)=>{
//     let user=await Users.findOne({email:req.body.email});
//     if(user){
//         let passComp=req.body.password===user.password;
//         if(passComp){
//             const data={
//                 user:{
//                     id:user.id
//                 }
//             }
//         const token =jwt.sign(data,'secret_ecom')
//         res.json({
//             success:true,token,
//         })
//         }
//         else{
//             res.status(400).json({success:false,error:"Wrong Password"})
//         }
//     }
//     else{
//         res.status(400).json({success:false,error:"Wrong email address"})
//     }
// })
// app.listen(port,(error) =>{
//     if(!error){
//         console.log("Server Running on port:"+port);
//     }
//     else{
//         console.log("Error :"+error)
//     }
// })