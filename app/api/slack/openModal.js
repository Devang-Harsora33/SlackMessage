import axios from "axios";

export default async function handler(req, res) {
  const { trigger_id } = req.body;

  const modal = {
    type: "modal",
    callback_id: "message_user_modal",
    title: {
      type: "plain_text",
      text: "Send a Message",
    },
    blocks: [
      {
        type: "input",
        block_id: "user_select_block",
        element: {
          type: "users_select",
          action_id: "user_select",
        },
        label: {
          type: "plain_text",
          text: "Select a User",
        },
      },
      {
        type: "input",
        block_id: "message_input_block",
        element: {
          type: "plain_text_input",
          multiline: true,
          action_id: "message_input",
        },
        label: {
          type: "plain_text",
          text: "Message",
        },
      },
    ],
    submit: {
      type: "plain_text",
      text: "Send",
    },
  };

  try {
    await axios.post(
      "https://slack.com/api/views.open",
      {
        trigger_id,
        view: modal,
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
    res.status(500).json({ error: "Failed to open modal" });
  }
}
