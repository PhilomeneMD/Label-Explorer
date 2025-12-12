// src/pkce.js
function base64UrlEncode(buffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  
  export async function generateCodeVerifierAndChallenge() {
    const array = new Uint8Array(64);
    window.crypto.getRandomValues(array);
    const codeVerifier = base64UrlEncode(array.buffer);
  
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    const codeChallenge = base64UrlEncode(digest);
  
    return { codeVerifier, codeChallenge };
  }
  