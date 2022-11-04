const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

const addAdmin = async (req, res) => {
  try {
    //Get Admin Details
    const name = req.body.name;
    const Id = req.body.Id;

    //Check If UserName Exist
    const checkUsername = await Admin.findOne({ name });
    if (checkUsername)
      return res.json({ Error: "Username already used", status: false });

    //Check If Email Exist
    const checkId = await Admin.findOne({ Id });
    if (checkId) return res.json({ Error: "Id already used", status: false });

    //Create Model
    const admin = new Admin({
      name: req.body.name,
      Id: req.body.Id,
      password: req.body.password,
    });

    console.log(admin);

    // Send Data in DataBase
    await admin.save();

    res.status(201).send("Admin Added");
  } catch (error) {
    //Send Error
    console.log(error);
    res.send(error);
  }
};

const login = async (req, res) => {
  try {
    //Get Login Details
    const { Id } = req.body;

    //Find if Admin Exist in Database
    const admin = await Admin.findOne({ Id });

    if (!admin)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    // Check Password
    const isPasswordValid = req.body.password;
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    const token = jwt.sign({ Id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json({ message: "Login Success", token: token });
  } catch (error) {
    //Send Error Message
    res.send("Not authorized");
  }
};

module.exports = { addAdmin, login };
