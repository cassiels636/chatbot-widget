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
import { useGetMessagesQuery, useSendMessageMutation } from "../api/apiSlice";
import ChatInput from "./ChatInput";

interface ChatBoxProps {
  onClose: () => void;
}

export default function ChatBox({ onClose }: ChatBoxProps) {
  const { data: messages, isFetching } = useGetMessagesQuery(undefined, {
    pollingInterval: 15000, // Check for new messages every 15 seconds
  });

  const [sendMessage] = useSendMessageMutation();

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
                  message={message}
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
          <ChatInput onSubmit={sendMessage} />
        </>
      ) : (
        <CircularProgress sx={{ alignSelf: "center" }} />
      )}
    </Stack>
  );
}
