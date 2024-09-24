"use client";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import ChatBotAvatar from "./ChatBotAvatar";
import { Send } from "@mui/icons-material";
import { useState } from "react";
import { MessageForm } from "../types";

interface ChatInputProps {
  onSubmit: (data: MessageForm) => void;
  defaultValue?: string;
}

export default function ChatInput({
  onSubmit,
  defaultValue = "",
}: ChatInputProps) {
  const [messageInput, setMessageInput] = useState(defaultValue);

  const handleClickSend = () => {
    onSubmit({ content: messageInput, from_chatbot: false });
    setMessageInput("");
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
                <IconButton onClick={handleClickSend} edge="end">
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
