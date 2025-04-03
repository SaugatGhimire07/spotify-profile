// index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8888;

// Spotify Auth Route
app.get("/login", (req, res) => {
  const scopes =
    "user-read-private user-read-email user-follow-read playlist-read-private user-top-read user-read-recently-played";
  const redirect_uri = process.env.REDIRECT_URI;
  const authURL = `https://accounts.spotify.com/authorize?client_id=${
    process.env.CLIENT_ID
  }&response_type=code&redirect_uri=${redirect_uri}&scope=${encodeURIComponent(
    scopes
  )}`;
  res.redirect(authURL);
});

// Token Exchange
app.get("/callback", async (req, res) => {
  const code = req.query.code;
  const tokenEndpoint = "https://accounts.spotify.com/api/token";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", process.env.REDIRECT_URI);

  const authHeader = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.post(tokenEndpoint, params, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Redirect to your frontend with the access token
    res.redirect(
      `http://localhost:5173?access_token=${response.data.access_token}`
    );
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.send("Error exchanging code for token");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
