const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware'); 
const { addProduct, getProductsBySlug } = require('../controller/product');
const router =  express.Router();

const multer = require('multer');
const shortid = require('shortid');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

// admin-app / backend
router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), addProduct); 

// frontend
router.get('/products/:slug', getProductsBySlug);

module.exports = router;