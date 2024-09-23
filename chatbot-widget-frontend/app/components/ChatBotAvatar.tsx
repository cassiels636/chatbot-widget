import { Person } from "@mui/icons-material";
import { CHAT_BOX_BACKGROUND_COLOR } from "../constants";
import { SxProps } from "@mui/material";

export default function ChatBotAvatar({ sxProps = {} }: { sxProps?: SxProps }) {
  return (
    <Person
      sx={{
        background: "#4f4f4f",
        color: CHAT_BOX_BACKGROUND_COLOR,
        borderRadius: "15px",
        fontSize: "30px",
        ...sxProps,
      }}
    />
  );
}
