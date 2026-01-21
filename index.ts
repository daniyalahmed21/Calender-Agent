import { app } from "./graph";

async function main() {
  const result = await app.invoke({
    messages: [
      {
        role: "user",
        content: "Hi",
      },
    ],
  });
  console.log("Final Response:", result.messages.at(-1)?.content);
}

main();