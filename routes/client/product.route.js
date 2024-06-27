const express = require('express');
const router= express.Router();
const controller=require("../../controllers/client/product.controller");


router.get('/', controller.index);

module.exports = router;


// router.get('/products/creat', (req, res) => {
//     res.render('client/pages/products/index', {
//   });
//   });


// router.get('/products/edit', (req, res) => {
//     res.render('client/pages/products/index', {
//   });
//   });


