import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const payload = JSON.parse(req.body);

    if (payload.type === "view_submission") {
      const user =
        payload.view.state.values.user_select_block.user_select.selected_user;
      const message =
        payload.view.state.values.message_input_block.message_input.value;

      try {
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
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send message" });
      }
    } else {
      res.status(200).json({ ok: true });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
