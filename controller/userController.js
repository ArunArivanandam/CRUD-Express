const fs = require("node:fs/promises");
const path = require("path");

const filePath = path.join(process.cwd(), "data", "data.json");
console.log(filePath);

exports.getAllUsers = async (req, res) => {
  try {
    const userData = await fs.readFile(filePath, { encoding: "utf-8" });
    const data = JSON.parse(userData);
    res.json(data);
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
    await fs.writeFile(filePath, JSON.stringify(data));
    res.send("User added");
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
