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

    await products.save();

    res.send({ message: "Product Added", Status: "Done", products });
  } catch (error) {
    res.send(error);
  }
};

const GetSingleProduct = async (req, res) => {
  try {
    //Get Single project from database
    const ProductId = req.params.ProductId;

    const singleProject = await Products.findOne({ ProductId: ProductId });

    res.status(200).send(singleProject);
  } catch (error) {
    res.send(error);
  }
};

const EditProduct = async (req, res) => {
  try {
    const product = req.body;
    const ProductId = req.params.ProductId;

    const singleProject = await Products.findByIdAndUpdate(
      { ProductId: ProductId },
      {
        $set: product,
      }
    );

    res.status(200).send({ message: "Product Updated", status: true });
  } catch (error) {
    res.send(error);
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const ProductId = req.params.ProductId;
    const products = await Products.findOneAndDelete({ ProductId: ProductId });

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
  EditProduct,
};
