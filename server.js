const app = require("./app");
const { connectDB } = require("./db");

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
