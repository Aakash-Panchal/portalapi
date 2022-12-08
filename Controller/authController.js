const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
  try {
    const name = req.body.name;
    const Id = req.body.Id;
    const password = req.body.password;

    const checkUsername = await Admin.findOne({ name });
    if (checkUsername)
      return res.json({ Error: "Username already used", status: false });

    const checkId = await Admin.findOne({ Id });
    if (checkId) return res.json({ Error: "Id already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name: req.body.name,
      Id: req.body.Id,
      password: hashedPassword,
      ShopName: req.body.ShopName,
      verified: req.body.verified,
    });

    await admin.save();

    res.status(201).send("Admin Added");
  } catch (error) {
    res.send(error);
  }
};

const login = async (req, res) => {
  try {
    const { Id } = req.body;
    const password = req.body.password;

    const admin = await Admin.findOne({ Id });

    console.log(admin);

    const { ShopName, verified } = admin;

    console.log(ShopName, verified);

    if (!admin)
      return res.json({
        message: "Incorrect Id or Password",
        status: false,
        token: null,
      });

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid)
      return res.json({
        message: "Incorrect Password",
        status: false,
        token: null,
      });

    const token = jwt.sign({ Id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login Success",
      status: true,
      token: token,
      ShopName: ShopName,
      verified: verified,
    });
  } catch (error) {
    res.send("Not authorized");
  }
};

const getAdminInfo = async (req, res) => {
  try {
    const { Id } = req.body;
    const password = req.body.password;

    const admin = await Admin.findOne({ Id });

    if (!admin)
      return res.json({
        message: "Incorrect Id or Password",
        status: false,
        token: null,
      });

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid)
      return res.json({
        message: "Incorrect Password",
        status: false,
        token: null,
      });

    const token = jwt.sign({ Id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json({ message: "Login Success", status: true, token: token });
  } catch (error) {
    res.send("Not authorized");
  }
};

module.exports = { addAdmin, login, getAdminInfo };
