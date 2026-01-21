import { ChatGroq } from "@langchain/groq";

const tools: any = [];

const llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
}).bindTools(tools);

llm.invoke([
  {
    role: "user",
    content: "What is the capital of France?"
  }
]).then((response) => {
  console.log("Response:", response);
}).catch((error) => {
  console.error("Error:", error);
});