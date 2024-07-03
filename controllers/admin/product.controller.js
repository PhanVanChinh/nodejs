const Product= require("../../models/product.model")

const paginationHelper= require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index=async (req, res) => {
  // console.log(req.query.status);
  let filterStatus=[
    {
      name :"Tất cả",
      status: "",
      class:""
    },
    {
      name :"Hoạt động",
      status: "active",
      class:""
    },
    {
      name :"Dừng hoạt động",
      status: "inactive",
      class:""
    }
  ];
  if (req.query.status){
    const index = filterStatus.findIndex(item=> item.status == req.query.status);
    filterStatus[index].class ="active";
  }
  else{
    const index = filterStatus.findIndex(item=> item.status == "");
    filterStatus[index].class ="active";

  }

    let find={
        deleted : false
        
    };
    if (req.query.status){
        find.status=req.query.status;
    }

// xử lí tìm kiêmd bằng regex
    let keyword ="";
    if(req.query.keyword){
        keyword=req.query.keyword;
        const regex=new RegExp(keyword,"i");
        find.title=regex;
      }

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
        filterStatus: filterStatus,
        keyword: keyword,
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