const mongoose = require("mongoose");
// const { boolean } = require("zod");

//mongo instance connection
// Connect to MongoDB
const dbUrl = "your-mongo-instance-url";
mongoose
  .connect(url)
  // if I want to specify a databse just add it at the last
  // for instanace => mongodb+srv://admin:W6PyEwrklahbgRzD@cluster0.lhcugcv.mongodb.net/database_name
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Problem connecting with database", err));

//creating a schema first
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

//mongoose model needs to capitalize
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  Todo: Todo,
};
