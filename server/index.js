import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import combineTypeDefs from "./typeDefs/index.js"; // Ensure this file is correctly exporting typeDefs
import { combineResolvers } from "./resolvers/index.js";

const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs: combineTypeDefs, // Ensure combineTypeDefs is properly formatted
    resolvers: combineResolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }, // Set port explicitly (optional)
  });

  console.log(`🚀 Server running at ${url}`);
}

// Call the async function
startServer().catch((err) => {
  console.error("Error starting server:", err);
});
