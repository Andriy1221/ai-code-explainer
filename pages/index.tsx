import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import languages from "../data/languages";

export default function Home() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [languageTouched, setLanguageTouched] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);

  function handleSubmit() {
    if (isValid()) {
      fetchAiResponse();
    } else {
      showError();
    }
  }

  async function fetchAiResponse() {
    setLoading(true);
    const res = await axios.post("/api/completion", { language, input });
    setResult(res.data.result);
    setLoading(false);
  }

  function clear() {
    setInput("");
    setInputTouched(false);
    setResult("");
  }

  function isValid() {
    return language.length > 0 && input.length > 0;
  }

  function showError() {
    setLanguageTouched(true);
    setInputTouched(true);
  }

  return (
    <>
      <Container>
        <Box sx={{ my: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: "3rem",
              fontWeight: 400,
              color: "primary.main",
              textAlign: "center",
              mb: 2,
            }}
          >
            Code Explainer
          </Typography>
          <Typography
            sx={{
              fontSize: "0.875rem",
              color: "#363d54",
              textAlign: "center",
            }}
          >
            Powered by OpenAI
          </Typography>
        </Box>
        <Box
          sx={{ mb: 2, display: "flex", flexDirection: "row", columnGap: 2 }}
        >
          <FormControl sx={{ width: 300 }}>
            <InputLabel sx={{ color: "#363d54" }}>Code language</InputLabel>
            <Select
              label="Code language"
              color="primary"
              error={languageTouched && language.length === 0}
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: "rgba(2, 14, 28, 1)",
                      color: "primary.main",
                    },
                  },
                },
              }}
              sx={{ "& .MuiSelect-icon": { color: "#363d54" } }}
              onChange={(e: SelectChangeEvent) => {
                setLanguage(e.target.value);
                setLanguageTouched(true);
              }}
            >
              {languages.sort().map((language) => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TextField
          multiline
          minRows={10}
          placeholder="Paste your code in here and let the AI explain it for you"
          color="primary"
          value={input}
          error={inputTouched && input.length === 0}
          onChange={(e) => setInput(e.target.value)}
          sx={{ width: 1 }}
        ></TextField>
        <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
          {loading ? (
            <Button
              variant="contained"
              sx={{ px: 6, mt: 2, "&:hover": { cursor: "default" } }}
            >
              <CircularProgress
                size={20}
                sx={{
                  color: "primary.contrastText",
                }}
              />
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ px: 6, mt: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
          <Button variant="outlined" sx={{ px: 6, mt: 2 }} onClick={clear}>
            Clear
          </Button>
        </Box>

        {result.length > 0 && (
          <Box
            sx={{
              mt: 4,
              borderRadius: "4px",
              border: "1px solid #363d54",
              bgcolor: "rgba(2, 14, 28, 1)",
            }}
          >
            <Typography
              sx={{
                m: 2,
                fontSize: "1rem",
                fontWeight: 600,
                color: "primary.main",
              }}
            >
              Explanation
            </Typography>
            <Typography sx={{ color: "primary.main", m: 2 }}>
              {result}
            </Typography>
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
}
