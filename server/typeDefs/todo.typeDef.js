const TodotypeDefs = `
  type Todo {
    _id: ID!
    user: String!
    title: String!
    description: String!
    priority: String!
    date: String!
    dueDate: String!
    createdAt: String!
    updatedAt: String!
    completed: Boolean!
  }
  type Query {
    getTodoList: [Todo!]!
    todo(todoId: ID!): Todo
    priority: Todo!
    date: String!
    dueDate: String!
    completed: Boolean!
  }
  type Mutation {
    addTodo(input: AddTodoInput!): Todo!
    updateTodo(todoId: ID!, input: UpdateTodoInput!): Todo!
    deleteTodo(todoId: ID!): Todo!
  }
  input AddTodoInput {
    description: String!
    title: String!
    priority: String!
    date: String!
    dueDate: String!
    completed: Boolean!
  }
  input UpdateTodoInput {
    description: String!
    title: String!
    priority: String!
    date: String!
    dueDate: String!
    completed: Boolean!
  }
  type Priority {
    priority: String!
  }
`;
export default TodotypeDefs;
