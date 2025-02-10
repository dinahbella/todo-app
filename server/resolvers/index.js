import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolvers.js";
import todoResolver from "./todo.resolvers.js";

export const combineResolvers = mergeResolvers([userResolver, todoResolver]);
