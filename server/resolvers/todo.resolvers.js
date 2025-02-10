import Todo from "../models/todo.model.js";

const todoResolver = {
  Query: {
    getTodoList: async (parent, args, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const userId = await context.getUser()._id;
        const todos = await Todo.find({ userId });
        return todos;
      } catch (err) {
        console.error("Error in getTodoList: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    todo: async (parent, { todoId }) => {
      try {
        const todo = await Todo.findById(todoId);
        return todo;
      } catch (error) {
        console.error("Error in todo query:", error);
        throw new Error(error.message || "Error getting todo");
      }
    },
    priority: async (parent, args, context) => {
      try {
        return await Todo.findOne().sort({ priority: -1 }); // Sorting by priority
      } catch (error) {
        throw new Error("Error fetching priority todo.");
      }
    },
    date: async (parent, args, context) => {
      try {
        const latestTodo = await Todo.findOne().sort({ createdAt: -1 });
        return latestTodo ? latestTodo.date : null;
      } catch (error) {
        throw new Error("Error fetching date.");
      }
    },
    dueDate: async (parent, args, context) => {
      try {
        const earliestDue = await Todo.findOne().sort({ dueDate: 1 });
        return earliestDue ? earliestDue.dueDate : null;
      } catch (error) {
        throw new Error("Error fetching due date.");
      }
    },
    completed: async (parent, args, context) => {
      try {
        const completedTodo = await Todo.findOne({ completed: true });
        return !!completedTodo; // Returns true if there's a completed todo
      } catch (error) {
        throw new Error("Error fetching completed status.");
      }
    },
  },
};

export default todoResolver;
