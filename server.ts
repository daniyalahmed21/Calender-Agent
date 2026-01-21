import express from "express";
import { google } from "googleapis";

const app = express();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL,
);
app.get("/auth", (req, res) => {
  const scopes = ["https://www.googleapis.com/auth/calendar"];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
  console.log(url);
  res.redirect(url);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code as string;
  const { tokens } = await oauth2Client.getToken(code);
//   oauth2Client.setCredentials(tokens);
  console.log("Tokens acquired:", tokens);
  res.send("Authentication successful! You can close this window.");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
