import { Typography } from "@mui/material";
import ChatButton from "./components/ChatButton";
import { Provider } from "react-redux";
import { store } from "./store";

export default function Home() {
  return (
    <main>
      <Typography>
        Click the button in the lower right corner to chat.
      </Typography>
      <ChatButton />
    </main>
  );
}
