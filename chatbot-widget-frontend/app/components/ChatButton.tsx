"use client";
import { Box, Button, IconButton, Popper } from "@mui/material";
import { useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export default function ChatButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      <IconButton
        type="button"
        onClick={handleClick}
        sx={{
          background: "#49bd2a",
          ":hover": {
            background: "#32851c",
          },
          height: 60,
          width: 60,
          position: "absolute",
          right: 60,
          bottom: 60,
        }}
      >
        <ChatBubbleIcon sx={{ color: "white" }} />
      </IconButton>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="top-end">
          The content of the Popper.
      </Popper>
    </>
  );
}
