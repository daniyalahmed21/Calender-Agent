import { ChatGroq } from "@langchain/groq";
import { tools } from "./tools";

export const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
}).bindTools(tools);