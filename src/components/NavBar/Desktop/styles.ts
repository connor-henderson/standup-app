import { Palette, SxProps, Theme } from "@mui/material";

const navbarContainer: SxProps<Theme> = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  pt: 0.5,
  pb: 0.5,
  color: "text.primary",
  backgroundColor: "background.default"
};

export default navbarContainer;