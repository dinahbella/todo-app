// import { gql } from "@apollo/server";

const userTypeDefs = `
type User{
_id: ID!
email: String!
username: String!
password: String!
todos: [Todo!]!
}
type Query{
    authUser: User
    users: (userId: ID!): User
}
type Mutation {
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponse
  }


input SignUpInput {
    email: String!
    username: String!
    password: String!
  }
  
  input LoginInput {
    username: String!
    password: String!
  }
  
  type LogoutResponse {
    message: String!
  }
`;
export default userTypeDefs;
