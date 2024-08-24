const z = require("zod");

const createTodo = z.object({
  title: z
    .string()
    .min(5, { message: "Title cannot be less than 5 characters" }),
  description: z
    .string()
    .min(5, { message: "description cannot be less than 5 characters" }),
});

// Ye waala todo ko update karne ke liye: Just the id in the request body
const updateTodo = z.object({
  id: z.string(),
});

// Correct way to export
module.exports = {
  createTodo: createTodo,
  updateTodo: updateTodo,
};
