// const multer = require("multer");
// const Aws = require('aws-sdk')
// const multerS3=require('multer-s3')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });


// // Access_key and private_key for s3 Bucket
// const s3Config=new Aws.S3({
//   accessKeyId:process.env.AWS_ACCESS_KEY,
//   secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET,
//   bucket: process.env.AWS_BUCKET_NAME,
// });

// // storage for the image 
// const upload = multer({
//   storage: multerS3({
//       s3:s3Config,
//       bucket: process.env.AWS_BUCKET_NAME+"/public",
//       key: function (req, file, cb) {
//         cb(null, file.originalname);
//       }
//     })   
//   });


  
// module.exports = { storage, upload };




const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const { S3 } = require("@aws-sdk/lib-storage");
const multerS3 = require("multer-s3");

// Create an S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  },
});

// // Create an S3 storage instance
// const s3Storage = new S3({
//   client: s3Client,
//   bucket: process.env.AWS_BUCKET_NAME,
// });

// Create a multer storage instance
const storage = multerS3({
  s3: s3Client,
  bucket: process.env.AWS_BUCKET_NAME,
  key: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create the multer upload instance
const upload = multer({ storage });

module.exports = { storage, upload };
