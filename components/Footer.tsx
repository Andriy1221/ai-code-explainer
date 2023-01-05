import { Box, Link, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      sx={{
        width: 1,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#0d1a2b",
        position: "absolute",
        bottom: 0,
        left: 0,
      }}
    >
      <Typography sx={{ fontSize: "0.75rem", color: "#363d54" }}>
        Ⓒ 2023 Code Explainer, created by{" "}
        <Link
          href="https://github.com/Andriy1221"
          sx={{
            color: "#363d54",
            textDecoration: "none",
            "&:hover": {
              color: "#606d96",
              textDecoration: "underline",
            },
          }}
        >
          <GitHubIcon
            sx={{ fontSize: "16px", pl: 1, pr: 0.5, marginBottom: "-3px" }}
          />
          Andriy Loeffler
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
