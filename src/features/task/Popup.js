import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <IconButton
            size="small"
            color="error"
            variant="contained"
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default Popup;
