// src/config.js
export const SPOTIFY_CLIENT_ID = "c5034b1aceac404e92d9f62f37dd7228";

const isLocalhost =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost";

export const REDIRECT_URI = isLocalhost
  ? "http://127.0.0.1:3000/callback"
  : "https://labelexplorer.netlify.app/callback";

export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export const SCOPES = [
  "user-read-email",
  "user-read-private"
];
