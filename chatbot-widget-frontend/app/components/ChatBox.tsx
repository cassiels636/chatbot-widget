"use client";
import { Close } from "@mui/icons-material";
import {
  Stack,
  IconButton,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import ChatBotAvatar from "./ChatBotAvatar";
import Message from "./Message";
import { useGetMessagesQuery } from "../api/apiSlice";
import ChatInput from "./ChatInput";

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

  const { data: messages, isFetching } = useGetMessagesQuery(undefined, {
    pollingInterval: 15000, // Check for new messages every 15 seconds
  });

  return (
    <Stack sx={{ margin: "10px", width: "400px" }}>
      <IconButton size="small" onClick={onClose} sx={{ alignSelf: "end" }}>
        <Close />
      </IconButton>
      <Stack alignItems="center">
        <ChatBotAvatar />
        <Typography>Chit Chatter</Typography>
      </Stack>
      {!isFetching && messages !== undefined ? (
        <>
          <Stack height="450px" overflow="auto">
            {messages.map((message) => {
              console.log(message.from_chatbot);
              return (
                <Message
                  key={message.id}
                  messageContent={message.content}
                  showAvatar={message.from_chatbot}
                  sxProps={{
                    margin: "10px",
                    alignSelf: message.from_chatbot ? "start" : "end",
                  }}
                />
              );
            })}
          </Stack>
          <Divider />
          <ChatInput />
        </>
      ) : (
        <CircularProgress sx={{ alignSelf: "center" }} />
      )}
    </Stack>
  );
}
