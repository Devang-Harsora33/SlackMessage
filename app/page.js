"use client";

import { useState } from "react";
import axios from "axios";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      const response = await axios.post("/api/sendMessage", {
        message,
      });

      if (response.data.success) {
        alert("Message sent successfully!");
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      alert("Failed to send message");
    }
  };

  return (
    <>
      <div className="p-[5rem] relative z-30">
        <h1>Enter a Slack Message</h1>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          className="border-gray-300 border-2 p-2 text-blue-950"
        />
        <button
          className="border-white border-2 py-2 px-5 mt-5"
          onClick={sendMessage}
        >
          Send Message
        </button>
      </div>
      <BackgroundBeams />
    </>
  );
}
