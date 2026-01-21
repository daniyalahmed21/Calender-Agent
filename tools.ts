import * as z from "zod";
import { oauth2Client } from "./server";
import tokens from "./tokens.json";
import { google } from "googleapis";
import { tool } from "langchain";

oauth2Client.setCredentials(tokens);

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

/* ---------------- GET EVENTS TOOL ---------------- */

export const getEventsTool = tool(
  async ({ maxResults }) => {
    const response = await calendar.events.list({
      calendarId: "primary",
      maxResults,
      singleEvents: true,
      orderBy: "startTime",
      timeMin: new Date().toISOString(),
    });

    const events = response.data.items || [];

    if (events.length === 0) {
      return "No upcoming events found.";
    }

    return events
      .map(
        (event, index) =>
          `${index + 1}. ${event.summary} at ${
            event.start?.dateTime || event.start?.date
          }`
      )
      .join("\n");
  },
  {
    name: "get_events",
    description: "Retrieve upcoming events from Google Calendar",
    schema: z.object({
      maxResults: z.number().default(10),
    }),
  }
);

/* ---------------- CREATE EVENT TOOL ---------------- */

export const createEventTool = tool(
  async ({ title, description, startTime, endTime }) => {
    const event = {
      summary: title,
      description,
      start: {
        dateTime: startTime,
        timeZone: "UTC",
      },
      end: {
        dateTime: endTime,
        timeZone: "UTC",
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    return `Event created: ${response.data.htmlLink}`;
  },
  {
    name: "create_event",
    description: "Create a new event in Google Calendar",
    schema: z.object({
      title: z.string().describe("Event title"),
      description: z.string().optional(),
      startTime: z
        .string()
        .describe("ISO start datetime e.g. 2026-01-25T10:00:00Z"),
      endTime: z
        .string()
        .describe("ISO end datetime e.g. 2026-01-25T11:00:00Z"),
    }),
  }
);

/* ---------------- EXPORT ALL TOOLS ---------------- */

export const tools = [getEventsTool, createEventTool];
