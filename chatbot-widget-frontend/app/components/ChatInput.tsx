"use client";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import ChatBotAvatar from "./ChatBotAvatar";
import { Send } from "@mui/icons-material";
import { useSendMessageMutation } from "../api/apiSlice";
import { useState } from "react";

interface ChatInputProps {}

export default function ChatInput({}: ChatInputProps) {
  const [messageInput, setMessageInput] = useState("");
  // const messages: MessageType[] = [
  //   { content: "Hello, Ask me a question.", fromChatBot: true },
  //   { content: "How's the weather?", fromChatBot: false },
  //   {
  //     content: "Cloudy with a chance of rain. Sunshine in the afternoon.",
  //     fromChatBot: true,
  //   },
  // ];

  const [sendMessage] = useSendMessageMutation();

  const handleClickSend = () => {
    sendMessage({ content: messageInput, from_chatbot: false });
    setMessageInput('');
  };

  const handleMouseDownUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Stack sx={{ margin: "10px" }}>
      <TextField
        variant="standard"
        placeholder="Your question"
        multiline
        value={messageInput}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setMessageInput(event.target.value)
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ margin: "5px" }}>
                <ChatBotAvatar />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" sx={{ margin: "5px" }}>
                <IconButton
                  onClick={handleClickSend}
                  onMouseDown={handleMouseDownUp}
                  onMouseUp={handleMouseDownUp}
                  edge="end"
                >
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  );
}
