import readline from "readline";
import { app } from "./graph";

/* ---------------- CLI SETUP ---------------- */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "🤖 > ",
});

const config = {
  configurable: {
    thread_id: "calendar-cli-1",
  },
};

const SYSTEM_PROMPT = {
  role: "system",
  content:
    "You are an AI assistant that helps users manage their Google Calendar. " +
    "You can create events, retrieve upcoming events, and answer questions " +
    "about the user's schedule. Current date and time is " +
    new Date().toLocaleString() +
    ".",
};

/* ---------------- UI ---------------- */

console.clear();
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("🧠 AI Calendar Assistant");
console.log("Natural language → Google Calendar");
console.log("Type your request or 'exit' to quit");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

rl.prompt();

/* ---------------- MAIN LOOP ---------------- */

rl.on("line", async (input) => {
  const message = input.trim();

  if (!message) {
    rl.prompt();
    return;
  }

  if (["exit", "quit", "q"].includes(message.toLowerCase())) {
    shutdown();
    return;
  }

  try {
    console.log("⏳ Thinking...\n");

    const result = await app.invoke(
      {
        messages: [
          SYSTEM_PROMPT, 
          { role: "user", content: message },
        ],
      },
      config
    );

    const reply = result.messages.at(-1)?.content;

    console.log("🧠 Assistant:");
    console.log(reply);
    console.log("────────────────────────────────────\n");
  } catch (err) {
    console.error("❌ Error:", err);
  }

  rl.prompt();
});

/* ---------------- CLEAN EXIT ---------------- */

function shutdown() {
  console.log("\n👋 Goodbye!");
  rl.close();
  process.exit(0);
}

process.on("SIGINT", shutdown);

rl.on("close", () => {
  console.log("Session ended.");
});
