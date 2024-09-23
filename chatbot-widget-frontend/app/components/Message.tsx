import { Stack, Typography, SxProps } from "@mui/material";
import ChatBotAvatar from "./ChatBotAvatar";

interface MessageProps {
  messageContent: string;
  showAvatar?: boolean;
  sxProps?: SxProps;
}

export default function Message({
  messageContent,
  showAvatar = false,
  sxProps,
}: MessageProps) {
  return (
    <Stack direction="row" alignItems="center" sx={sxProps}>
      {showAvatar && <ChatBotAvatar sxProps={{ marginRight: "5px" }} />}
      <Typography
        sx={{
          color: showAvatar ? "inherit" : "white",
          background: showAvatar ? "#fdfdfd" : "#32851c",
          borderRadius: "10px",
          padding: "5px 20px 5px 10px",
          maxWidth: "250px",
        }}
      >
        {messageContent}
      </Typography>
    </Stack>
  );
}
