"use client";
import { IconButton, Popper, Stack } from "@mui/material";
import { useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ChatBox from "./ChatBox";
import { CHAT_BOX_BACKGROUND_COLOR } from "../constants";

export default function ChatButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [arrowRef, setArrowRef] = useState<null | HTMLElement>(null);

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
          boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.6)",
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
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        disablePortal={false}
        placement="top-end"
        modifiers={[
          {
            name: "arrow",
            enabled: true,
            options: {
              element: arrowRef,
            },
          },
        ]}
        sx={{
          zIndex: 1,
          background: CHAT_BOX_BACKGROUND_COLOR,
          borderRadius: "10px",
          boxShadow: "8px 8px 12px rgba(0, 0, 0, 0.6)",
          margin: "10px 0 !important",
        }}
      >
        <ChatBox onClose={() => setAnchorEl(null)} />
        <Stack
          component="div"
          sx={{
            position: "absolute",
            fontSize: 7,
            bottom: 0,
            left: 0,
            marginBottom: "-6px",
            width: "21px",
            height: "7px",
            "&::before": {
              content: '""',
              margin: "auto",
              display: "block",
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "5px 5px 0 5px",
              borderColor: `${CHAT_BOX_BACKGROUND_COLOR} transparent transparent transparent`,
            },
          }}
          ref={setArrowRef}
        />
      </Popper>
    </>
  );
}
