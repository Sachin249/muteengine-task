const express = require('express')
const path =  require('path')
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require("fs")
require("./mail/transporter")
mongoose.set('strictQuery', true);
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {useNewUrlParser:true,useUnifiedTopology: true});
const con= mongoose.connection;
con.on('open', ()=> {
  console.log('Database Connected');
});

const app = express()
PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));  
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Request-Headers', '*');
  next();
});

// get image api
app.get('/backend/uploads/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, 'uploads/images', imageName);
 
  // Check if the image file exists
  fs.exists(imagePath, (exists) => {
    if (!exists) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Read the image file and send it in the response
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading the image' });
      }
      const contentType = getContentType(imagePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

// get content type function
function getContentType(filePath) {
  const ext = path.extname(filePath);
  switch (ext.toLowerCase()) {
    case '.jpg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    // Add more cases for other image formats if necessary
    default:
      return 'image/jpeg'; // Default to JPEG
  }
}

app.use('/backend/api/auth', require('./controllers/authcontroller'));
app.use('/backend/api/product', require('./controllers/productcontroller'));
app.use('/backend/api/stripe', require('./controllers/stripecontroller'));
app.use('/backend/api/order', require('./controllers/ordercontroller'));


// error handler
// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.send('error');
// });

app.listen(PORT,(req,res)=>{
    console.log(`app is listening on ${PORT}`)
})
