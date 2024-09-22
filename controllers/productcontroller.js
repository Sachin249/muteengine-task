var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
var verifyToken = require('../middleware/verifytokenuser');
const product = require("../models/product")
// multer start
const multer = require("multer");
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads/images/")
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
  });
  const upload = multer({
    storage,
  });
// multer end

router.get('/list', async function(req, res, next){
    try{
          const data = await product.find().sort({"createdAt":-1}).exec();
        const products =[
            {
                id: 1,
                title: "Sparx Mens Sm-648 Sports Shoes",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, est at venenatis consectetur, ipsum est tincidunt libero, in ullamcorper dolor odio at enim. Sed eget sapien metus. Nullam eget volutpat arcu, non luctus odio. Fusce tincidunt, risus vel viverra auctor, justo odio scelerisque metus, eu vulputate quam velit id purus. Fusce at odio vel nisl vulputate sollicitudin. Sed a tortor auctor, varius leo eget, scelerisque sapien. Cras ut sapien erat. Vivamus a magna at urna blandit volutpat nec et lectus. Integer eu mi ligula.Nunc pharetra velit eget justo viverra, eget vulputate eros efficitur. Curabitur venenatis felis a nulla condimentum scelerisque. Suspendisse ut justo eget tellus dictum bibendum. Integer eu erat lacinia, vestibulum massa ac, cursus tellus. Etiam malesuada augue in elit iaculis congue. Pellentesque",
                price: 989,
                quantity: 1,
                // img:"https://source.unsplash.com/collection/928424/480x480"
                img:"https://m.media-amazon.com/images/I/81GSeDCrzlL._UX625_.jpg"
              },
              {
                id: 2,
                title: "Sparx Mens Sm-648 Sneaker",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, est at venenatis consectetur, ipsum est tincidunt libero, in ullamcorper dolor odio at enim. Sed eget sapien metus. Nullam eget volutpat arcu, non luctus odio. Fusce tincidunt, risus vel viverra auctor, justo odio scelerisque metus, eu vulputate quam velit id purus. Fusce at odio vel nisl vulputate sollicitudin. Sed a tortor auctor, varius leo eget, scelerisque sapien. Cras ut sapien erat. Vivamus a magna at urna blandit volutpat nec et lectus. Integer eu mi ligula.Nunc pharetra velit eget justo viverra, eget vulputate eros efficitur. Curabitur venenatis felis a nulla condimentum scelerisque. Suspendisse ut justo eget tellus dictum bibendum. Integer eu erat lacinia, vestibulum massa ac, cursus tellus. Etiam malesuada augue in elit iaculis congue. Pellentesque",
                price: 925,
                quantity: 1,
                img:"https://m.media-amazon.com/images/I/4131tNs9rDL.jpg"
              },
              {
                id: 3,
                title: "Bacca Bucci® Running Shoes Men",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, est at venenatis consectetur, ipsum est tincidunt libero, in ullamcorper dolor odio at enim. Sed eget sapien metus. Nullam eget volutpat arcu, non luctus odio. Fusce tincidunt, risus vel viverra auctor, justo odio scelerisque metus, eu vulputate quam velit id purus. Fusce at odio vel nisl vulputate sollicitudin. Sed a tortor auctor, varius leo eget, scelerisque sapien. Cras ut sapien erat. Vivamus a magna at urna blandit volutpat nec et lectus. Integer eu mi ligula.Nunc pharetra velit eget justo viverra, eget vulputate eros efficitur. Curabitur venenatis felis a nulla condimentum scelerisque. Suspendisse ut justo eget tellus dictum bibendum. Integer eu erat lacinia, vestibulum massa ac, cursus tellus. Etiam malesuada augue in elit iaculis congue. Pellentesque",
                price: 1199,
                quantity: 1,
                img:"https://m.media-amazon.com/images/I/61xcnRSOABL._SY695_.jpg"
              },
        ]
        // res.send(products)
        return res.status(200).json({ success:'Data found', data:data });
    }catch(err){
      return res.status(500).json({ errors: err });
    }
});


router.post('/create',upload.single('img') ,verifyToken,
  body('title').not().isEmpty().withMessage('title Required'), 
  body('price').not().isEmpty().withMessage('price Required'), 
  body('quantity').not().isEmpty().withMessage('quantity Required'), 
  async function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    try{
    
      let data = {
        title:req.body.title,
        price:req.body.price,
        quantity:req.body.quantity,
        userId:req.decoded.id
        // img:req.body.img
      }
      if(req.file){
        console.log(req.file)
        data.img = process.env.IMAGE_URL+req.file.filename
      }
      console.log(data)
      const saveProduct = new product(data)
      const savedData = await saveProduct.save()
      return res.status(200).json({
        status:true,
        message:"Product saved successfully",
        data:savedData
      })
    }
    catch(err){
      console.log(err)
      return res.status(500).json({
        message: 'Something went wrong , please try again later'
      });
    }
    
  });

module.exports = router;