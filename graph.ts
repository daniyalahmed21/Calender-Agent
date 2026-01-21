import { END, MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { callModel, toolNode } from "./nodes";
import { AIMessage } from "langchain";

const shouldContinue = (state: typeof MessagesAnnotation.State) => {
  const lastMessage = state.messages.at(-1);
  if (!lastMessage || !AIMessage.isInstance(lastMessage)) {
    return END;
  }
  if (lastMessage.tool_calls?.length) {
    return "tools";
  }
  return END;
};

const graph = new StateGraph(MessagesAnnotation)
    .addNode("assistant", callModel)
    .addNode("tools", toolNode)
    .addEdge("__start__","assistant")
    .addEdge("tools","assistant")
    .addConditionalEdges("assistant", shouldContinue ,["tools", END]);

export const app = graph.compile();