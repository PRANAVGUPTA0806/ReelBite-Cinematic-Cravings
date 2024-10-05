const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const multer=require("multer");
const cloudinary = require('cloudinary').v2;
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
// const storage=multer.diskStorage({
//   destination:'./Upload/images',
//   filename:(req,file,cb)=>{
//       return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })
// const upload=multer({storage:storage})
// app.use('/images',express.static('Upload/images'))

// app.use('/upload',upload.single('product'),require('./routes/imageupload'))
const uploadRoutes = require('./routes/imageupload');

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ROUTES BELOW
app.use('/upload', uploadRoutes);
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
