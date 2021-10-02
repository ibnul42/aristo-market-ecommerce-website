const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/products');

// setting dotenv files
dotenv.config({path: 'backend/config/config.env'});

connectDatabase();

const seedProducts =  async () => {
    console.log(products);
    try {
        await Product.deleteMany();
        console.log('Products are delated');

        await Product.insertMany(products);
        console.log('Products are added');
        process.exit();
         
    } catch (err) {
        console.log(err.message);
        process.exit();
    }
}

seedProducts();