import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { message } = await req.json();

  try {
    const response = await axios.post(
      "https://slack.com/api/chat.postMessage",
      {
        channel: `${process.env.SLACK_BOT_APP_ID}`,
        text: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
        },
      }
    );

    if (response.data.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: response.data.error }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
