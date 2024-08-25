import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const payload = JSON.parse(req.body);

      // Handle different types of Slack interactions
      if (payload.type === "block_actions") {
        // Handle button clicks or other block actions
        const { actions, view, user } = payload;
        console.log("Block actions:", actions);
        res.status(200).json({ ok: true });
      } else if (payload.type === "view_submission") {
        // Handle modal submissions
        const { view } = payload;
        const user =
          view.state.values.user_select_block.user_select.selected_user;
        const message =
          view.state.values.message_input_block.message_input.value;

        // Send the message to the selected user
        await axios.post(
          "https://slack.com/api/chat.postMessage",
          {
            channel: user,
            text: message,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        res.status(200).json({ ok: true });
      } else if (payload.type === "event_callback") {
        // Handle Slack events, e.g., message events, team join events
        const { event } = payload;
        console.log("Event received:", event);
        res.status(200).json({ ok: true });
      } else {
        res.status(400).json({ error: "Unsupported interaction type" });
      }
    } catch (error) {
      console.error("Error handling Slack interaction:", error);
      res.status(500).json({ error: "Failed to process interaction" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
