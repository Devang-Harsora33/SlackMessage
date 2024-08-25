import axios from "axios";

export default async function handler(req, res) {
  const { command, text, response_url, trigger_id } = req.body;

  if (command === "/sendmessage") {
    try {
      await axios.post(response_url, {
        text: "Opening modal...",
        response_type: "ephemeral",
      });
      await axios.post(
        "https://slack-message-git-main-devang-harsoras-projects.vercel.app/api/slack/openModal",
        {
          trigger_id,
        }
      );
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to open modal" });
    }
  } else {
    res.status(400).json({ error: "Invalid command" });
  }
}
