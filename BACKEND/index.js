const { createTodo, updateTodo } = require("./types");
const express = require("express");
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3000;
const { Todo } = require("./db");

app.use(express.json());
app.use(cors());

// routes goes here

//todo create karne ke liye
app.post("/todo", async (req, res) => {
  // input validation through ZOD
  try {
    //acquire user body
    const createPayload = req.body;
    //try to safeparse that shit
    const response = createTodo.safeParse(createPayload);

    //response ko validate karna
    if (!response.success) {
      res.status(411).json({
        message: "Problem with provided input",
      });
      return;
    }

    console.log("Control reaching here");

    //ab isko apne DB m daaldo

    await Todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false,
    });

    res.status(201).json({
      message: "Todo created successfully",
    });
  } catch (error) {
    console.log("Error creating a todo");
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

//todos display karne ke liye
app.get("/todos", async (req, res) => {
  //this routes just to get todos out of DB, nothing rocket science

  //   .find() will give me all todo
  try {
    const todos = await Todo.find({});
    res.status(200).json({
      message: "Todos fetched successfully !!",
      todos,
    });
  } catch (err) {
    console.log("Failed to get todo", err);
    res.status(500).json({
      message: "Failed to get your todos buddy !!",
      err,
    });
  }
});

//completed todos ko display
app.put("/completed", async (req, res) => {
  try {
    const updatePayload = req.body;

    //safeParse it
    const response = updateTodo.safeParse(updatePayload);

    //response ko validate karna
    if (!response.success) {
      res.status(411).json({
        message: "Problem with provided input",
      });
      return;
    }

    //yaha par we gotta update our shit

    // here first field as { ... } work as => ye waali id ka TODO jo h , then second filed after comma { ..... } usko ye kardo
    await Todo.updateOne(
      {
        _id: updatePayload.id,
      },
      {
        completed: true,
      }
    );
    res.status(200).json({
      message: "Todo marked completed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating the todo",
      error,
    });
  }
});

// listen my server please
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
