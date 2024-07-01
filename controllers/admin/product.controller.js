const Product= require("../../models/product.model")

const paginationHelper= require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index=async (req, res) => {
    console.log(req.query.status);

    let find={
        deleted : false
        
    };
    if (req.query.status){
        find.status=req.query.status;
    }
    let keyword ="";
    if(req.query.keyword){
        keyword=req.query.keyword;
        find.title=keyword;}

//Pagination - phân trang

  const countProducts= await Product.countDocuments(find);
  let objectPagination= paginationHelper(
    {
    currentPage : 1,
    limitItems: 4
  },
  req.query,
  countProducts
  );
  
//end pagination
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
    
    res.render('admin/pages/products/index',{
        pageTitle :" Danh sách sản phẩm",
        products: products,
        keyword: keyword,
        pagination : objectPagination
      });
    }