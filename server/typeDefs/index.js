import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDefs from "./user.typeDef.js";
import TodotypeDefs from "./todo.typeDef.js";

const combineTypeDefs = mergeTypeDefs([userTypeDefs, TodotypeDefs]);
export default combineTypeDefs;
