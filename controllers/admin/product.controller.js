const Product= require("../../models/product.model");
const filterStatusHelper=require("../../helpers/filterStatus");
const searchHelper=require("../../helpers/search");

const paginationHelper= require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index=async (req, res) => {
  // console.log(req.query.status);

  // bộ lọc
 const filterStatus=filterStatusHelper(req.query);

    let find={
        deleted : false
        
    };
    if (req.query.status){
        find.status=req.query.status;
    }

// xử lí tìm kiêmd bằng regex
const objectSearch=searchHelper(req.query);
console.log(objectSearch);
   
    if(objectSearch.regex){
       
        find.title=objectSearch.regex;
      }

//Pagination - phân trang

  const countProducts= await Product.countDocuments(find);
  let objectPagination= paginationHelper(
    {
    currentPage : 1,
    limitItems: 5
  },
  req.query,
  countProducts
  );
  
//end pagination
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
    
    res.render('admin/pages/products/index',{
        pageTitle :" Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination : objectPagination
      });
    };


// [get] /admin/products/create
module.exports.create = async (req,res) => {
res.render('admin/pages/products/create',{
    pageTitle :" thêm mới sản phẩm",
});
};
//[port] /admin/products/create
module.exports.createPort = async (req,res) => {
   req.body.price=parseInt(req.body.price);
   req.body.discountPercentage=paseInt(req.body.discountPercentage);
   req.body.stock=paseInt(req.body.stock); 

   if(req.body.position==""){
    const countProducts= await Product.countDocuments();
    req.body.position= countProducts + 1;
    
   } else{
    req.body.position=parseInt(req.body.position);
   }
  const product = new Product(req.body);
  await product.save();
  res.redirect(`/admin/products`);
 
};
//[get] /admin/products/change-status/:status/:id
module.exports.changeStatus=async (req,res)=>{
  console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  res.redirect("back");
};