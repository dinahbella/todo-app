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
  },
  Mutation: {
    addTodo: async (parent, { input }, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const newTodo = new Todo({
          ...input,
          userId: await context.getUser()._id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        return await newTodo.save();
      } catch (error) {
        console.error("Error in addTodo:", error);
        throw new Error("Error adding todo.");
      }
    },
    updateTodo: async (parent, { todoId, input }, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const updatedTodo = await Todo.findByIdAndUpdate(
          todoId,
          {
            ...input,
            updatedAt: new Date().toISOString(),
          },
          { new: true }
        );
        return updatedTodo;
      } catch (error) {
        console.error("Error in updateTodo:", error);
        throw new Error("Error updating todo.");
      }
    },
    deleteTodo: async (parent, { todoId }, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        return deletedTodo;
      } catch (error) {
        console.error("Error in deleteTodo:", error);
        throw new Error("Error deleting todo.");
      }
    },
  },
};

export default todoResolver;
