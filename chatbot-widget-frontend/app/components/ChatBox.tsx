"use client";
import { Close } from "@mui/icons-material";
import { Stack, IconButton, Typography, CircularProgress } from "@mui/material";
import ChatBotAvatar from "./ChatBotAvatar";
import Message from "./Message";
import { useGetMessagesQuery } from "../api/apiSlice";

interface ChatBoxProps {
  onClose: () => void;
}

export default function ChatBox({ onClose }: ChatBoxProps) {
  // const messages: MessageType[] = [
  //   { content: "Hello, Ask me a question.", fromChatBot: true },
  //   { content: "How's the weather?", fromChatBot: false },
  //   {
  //     content: "Cloudy with a chance of rain. Sunshine in the afternoon.",
  //     fromChatBot: true,
  //   },
  // ];

  const { data: messages, isFetching } = useGetMessagesQuery();

  return (
    <Stack sx={{ margin: "10px", width: "400px", minHeight: "500px" }}>
      <IconButton size="small" onClick={onClose} sx={{ alignSelf: "end" }}>
        <Close />
      </IconButton>
      <Stack alignItems="center">
        <ChatBotAvatar />
        <Typography>Chit Chatter</Typography>
      </Stack>
      {!isFetching && messages !== undefined ? (
        <>
          {messages.map((message) => {
            return (
              <Message
                messageContent={message.content}
                showAvatar={message.fromChatBot}
                sxProps={{
                  margin: "10px",
                  alignSelf: message.fromChatBot ? "start" : "end",
                }}
              />
            );
          })}
        </>
      ) : (
        <CircularProgress sx={{ alignSelf: "center" }} />
      )}
    </Stack>
  );
}
