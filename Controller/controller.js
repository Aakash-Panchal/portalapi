const Products = require("../models/productModel");

const Getdata = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).send(products);
  } catch (error) {
    res.send(error);
  }
};

const PostData = async (req, res) => {
  try {
    //Get Project Title from body
    const ProductId = req.body.ProductId;

    //Check if project already exist
    const checkProject = await Products.findOne({ ProductId });
    if (checkProject)
      return res.json({ Error: "products already exist", status: false });

    // Get Product Details from body
    const products = new Products({
      ProductModel: req.body.ProductModel,
      ProductName: req.body.ProductName,
      ProductQnt: req.body.ProductQnt,
      productDescription: req.body.productDescription,
      ProductTarget: req.body.ProductTarget,
      BuyingPrice: req.body.BuyingPrice,
      SellPrice: req.body.SellPrice,
      ProductId: req.body.ProductId,
    });

    console.log(products);

    await products.save();

    res.send({ Status: "Done", products });
  } catch (error) {
    res.send(error);
  }
};

const GetSingleProduct = async (req, res) => {
  try {
    //Get Single project from database
    const id = req.params.id;
    const singleProject = await Products.findById(id);

    res.status(200).send(singleProject);
  } catch (error) {
    res.send(error);
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Products.findByIdAndDelete(id);

    res.send(`${products.ProductName} has been deleted.`);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  Getdata,
  GetSingleProduct,
  PostData,
  DeleteProduct,
};
