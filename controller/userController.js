const fs = require("node:fs/promises");
const path = require("path");
const { getDB } = require("../db");

const filePath = path.join(process.cwd(), "data", "data.json");

exports.getAllUsers = async (req, res) => {
  try {
    const userData = await fs.readFile(filePath, { encoding: "utf-8" });
    const data = JSON.parse(userData);
    const db = getDB();
    const users = db.collection("users");

    const data_db = await users.find().toArray();
    res.json(data_db);
  } catch (error) {
    console.log("Error:", error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const userData = await fs.readFile(filePath, { encoding: "utf-8" });
    const data = JSON.parse(userData);
    console.log(req.params.id);
    const user = req.body;
    data.push(user);
    const db = getDB();
    const users = db.collection("users");

    const result = await users.insertOne(req.body);
    await fs.writeFile(filePath, JSON.stringify(data));
    res.json(result);
  } catch (error) {
    console.log("User Creation Error:", error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const userData = await fs.readFile(filePath, { encoding: "utf-8" });
    const data = JSON.parse(userData);
    const user = data.filter((user) => {
      return user.id === Number(req.params.id);
    });
    res.json(user);
  } catch (error) {
    console.log("Error:", error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = req.body;
    const userData = await fs.readFile(filePath, { encoding: "utf-8" });
    const data = JSON.parse(userData);
    const index = data.findIndex((user) => user.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).send("User not found");
    }
    data[index] = updatedUser;
    await fs.writeFile(filePath, JSON.stringify(data));
    res.send(updatedUser);
  } catch (error) {
    console.log("User Update Error", error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userData = await fs.readFile(filePath, { encoding: "utf-8" });
    const data = JSON.parse(userData);
    const updatedUsers = data.filter((user) => user.id !== id);
    await fs.writeFile(filePath, JSON.stringify(updatedUsers));
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("User Deletion Error", error);
  }
};
