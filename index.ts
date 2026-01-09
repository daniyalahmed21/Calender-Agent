import readline from "readline";
import { app } from "./graph";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "🤖 > ",
});

console.clear();
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("🧠 AI Calendar Assistant");
console.log("Type your request or 'exit' to quit");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

rl.prompt();

rl.on("line", async (input) => {
  const message = input.trim();

  if (!message) {
    rl.prompt();
    return;
  }

  if (["exit", "quit", "q"].includes(message.toLowerCase())) {
    console.log("\n👋 Goodbye!");
    rl.close();
    process.exit(0);
  }

  try {
    process.stdout.write("⏳ Thinking...\n");

    const result = await app.invoke({
      messages: [{ role: "user", content: message }],
    });

    const reply = result.messages.at(-1)?.content;

    console.log("\n🧠 Assistant:");
    console.log(reply);
    console.log();
  } catch (error) {
    console.error("❌ Error:", error);
  }

  rl.prompt();
});

rl.on("close", () => {
  console.log("\nSession ended.");
});
