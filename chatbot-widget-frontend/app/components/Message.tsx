import {
  Stack,
  Typography,
  SxProps,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ChatBotAvatar from "./ChatBotAvatar";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { MessageForm, Message as MessageType } from "../types";
import {
  useDeleteMessageMutation,
  useEditMessageMutation,
} from "../api/apiSlice";
import ChatInput from "./ChatInput";

interface MessageProps {
  message: MessageType;
  showAvatar?: boolean;
  sxProps?: SxProps;
}

export default function Message({
  message,
  showAvatar = false,
  sxProps,
}: MessageProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const [editMessage] = useEditMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onEdit = () => {
    setShowEdit(true);
    setAnchorEl(null);
  };

  const onEditSubmit = (data: MessageForm) => {
    editMessage({ ...data, id: message.id });
    setShowEdit(false);
  };

  const onDelete = () => {
    deleteMessage(message.id);
    setAnchorEl(null);
  };

  return (
    <Stack direction="row" alignItems="center" sx={sxProps}>
      {showAvatar && <ChatBotAvatar sxProps={{ marginRight: "5px" }} />}
      {!showAvatar && (
        <>
          <IconButton
            aria-controls={openMenu ? "long-menu" : undefined}
            aria-expanded={openMenu ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ margin: "0 5px" }}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={onEdit}>Edit</MenuItem>
            <MenuItem onClick={onDelete}>Delete</MenuItem>
          </Menu>
        </>
      )}
      {showEdit ? (
        <ChatInput onSubmit={onEditSubmit} defaultValue={message.content} />
      ) : (
        <Typography
          sx={{
            color: showAvatar ? "inherit" : "white",
            background: showAvatar ? "#fdfdfd" : "#32851c",
            borderRadius: "10px",
            padding: "5px 20px 5px 10px",
            maxWidth: "250px",
          }}
        >
          {message.content}
        </Typography>
      )}
    </Stack>
  );
}
