import * as z from "zod";
import { tool } from "langchain";

export const createEventTool = tool(
  async ({}) => `Created event in the calendar.`,
  {
    name: "create_event",
    description: "Create a new event in the calendar.",
    schema: z.object({
      //   title: z.string().describe("Title of the event"),
      //   date: z.string().describe("Date of the event"),
      //   location: z.string().describe("Location of the event"),
    }),
  },
);

export const getEventsTool = tool(
  async ({}) => `Retrieved events from the calendar.`,
  {
    name: "get_events",
    description: "Retrieve events from the calendar.",
    schema: z.object({
      //   title: z.string().describe("Title of the event"),
      //   date: z.string().describe("Date of the event"),
      //   location: z.string().describe("Location of the event"),
    }),
  },
);


export const tools = [createEventTool, getEventsTool];