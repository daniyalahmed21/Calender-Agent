import type { MessagesAnnotation } from "@langchain/langgraph";
import { model } from "./llm";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { tools } from "./tools";

export async function callModel(state: typeof MessagesAnnotation.State) {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
}

export const toolNode = new ToolNode(tools);
