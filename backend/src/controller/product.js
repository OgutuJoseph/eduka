const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category'); 

exports.addProduct = (req, res) => {
    // res.status(200).json( { body: req.body, file: req.files } )

    const {
        name, price, quantity, description, category, createdBy
    } = req.body;

    let productPictures = [];
    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    });

    product.save(((error, product) => {
        if(error) return res.status(400).json({ error });

        if(product){
            res.status(201).json({ product });
        }
    }));
};

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
    .select('_id')
    .exec((error, category) => {
        if(error){
            return res.status(400).json({error});
        }

        if(category){            
            Product.find({ category: category._id })
            .exec((error, products) => {

                if(error){
                    return res.status(400).json({error});
                }
                if(products.length > 0)
                {
                    res.status(200).json({ 
                        products,
                        productsByPrice: {
                            under10k: products.filter(product => product.price <= 10000),                        
                            under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                            under20k: products.filter(product => product.price > 15000 && product.price <= 20000)
                        }
                    });
                }
                
            })
        }

        
    }); 
}