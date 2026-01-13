import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import ForceGraph2D from "react-force-graph-2d";
import {
  SPOTIFY_CLIENT_ID,
  REDIRECT_URI,
  AUTH_ENDPOINT,
  TOKEN_ENDPOINT,
  SCOPES,
} from "./config";
import { generateCodeVerifierAndChallenge } from "./pkce";
import HomePage from "./HomePage";
import ExplorePage from "./ExplorePage";
import AboutPage from "./AboutPage"; // ⬅️ nouveau
import AboutProjectPage from "./AboutProjectPage";

const spotifyApi = new SpotifyWebApi();

function App() {
  const location = useLocation();

  const [token, setToken] = useState(null);
  const [query, setQuery] = useState("");
  const [artist, setArtist] = useState(null);
  const [artistLabel, setArtistLabel] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const url = new URL(window.location.href);
    const hasCode =
      url.pathname === "/callback" && url.searchParams.get("code");

    if (hasCode) {
      const code = url.searchParams.get("code");
      const storedVerifier = window.sessionStorage.getItem("pkce_verifier");
      if (!storedVerifier) {
        console.error("Pas de code_verifier en sessionStorage");
        return;
      }

      const body = new URLSearchParams();
      body.append("client_id", SPOTIFY_CLIENT_ID);
      body.append("grant_type", "authorization_code");
      body.append("code", code);
      body.append("redirect_uri", REDIRECT_URI);
      body.append("code_verifier", storedVerifier);

      fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            setToken(data.access_token);
            window.localStorage.setItem(
              "spotify_access_token",
              data.access_token
            );
            spotifyApi.setAccessToken(data.access_token);
          } else {
            console.error("Erreur token", data);
          }
        })
        .catch((err) => console.error(err));
    } else {
      const storedToken = window.localStorage.getItem("spotify_access_token");
      if (storedToken) {
        setToken(storedToken);
        spotifyApi.setAccessToken(storedToken);
      }
    }
  }, []);

  const handleLogin = async () => {
    const { codeVerifier, codeChallenge } =
      await generateCodeVerifierAndChallenge();

    window.sessionStorage.setItem("pkce_verifier", codeVerifier);

    const params = new URLSearchParams();
    params.append("client_id", SPOTIFY_CLIENT_ID);
    params.append("response_type", "code");
    params.append("redirect_uri", REDIRECT_URI);
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", codeChallenge);
    params.append("scope", SCOPES.join(" "));

    window.location = `${AUTH_ENDPOINT}?${params.toString()}`;
  };

  const handleLogout = () => {
    setToken(null);
    window.localStorage.removeItem("spotify_access_token");
    window.sessionStorage.removeItem("pkce_verifier");
    setArtist(null);
    setArtistLabel(null);
    setAlbums([]);
    setCollabs([]);
    setGraphData({ nodes: [], links: [] });
    setQuery("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query || !token) return;

    try {
      const searchRes = await spotifyApi.searchArtists(query, { limit: 10 });

      const items = searchRes.artists?.items || [];
      if (items.length === 0) {
        setArtist(null);
        setArtistLabel(null);
        setAlbums([]);
        setCollabs([]);
        setGraphData({ nodes: [], links: [] });
        return;
      }

      const exact = items.find(
        (a) => a.name.toLowerCase() === query.trim().toLowerCase()
      );
      const foundArtist = exact || items[0];
      setArtist(foundArtist);

      // Récup des albums
      const albumsRes = await spotifyApi.getArtistAlbums(foundArtist.id, {
        include_groups: "album,single",
        limit: 20,
      });

      const albumIds = albumsRes.items.map((a) => a.id);
      if (albumIds.length === 0) {
        setAlbums([]);
        setCollabs([]);
        setGraphData({ nodes: [], links: [] });
        setArtistLabel(null);
        return;
      }

      const fullAlbumsRes = await spotifyApi.getAlbums(albumIds);
      const fullAlbums = fullAlbumsRes.albums;
      setAlbums(fullAlbums);

      // calcul du label principal
      const labelCounts = {};
      fullAlbums.forEach((alb) => {
        const lab = alb.label || "N/A";
        labelCounts[lab] = (labelCounts[lab] || 0) + 1;
      });

      let mainLabel = null;
      let maxCount = 0;
      Object.entries(labelCounts).forEach(([lab, count]) => {
        if (count > maxCount) {
          maxCount = count;
          mainLabel = lab;
        }
      });

      setArtistLabel(mainLabel);

      // construction des collabs
      const collabList = [];

      fullAlbums.forEach((album) => {
        const mainArtistId = foundArtist.id;
        const mainArtistName = foundArtist.name;

        (album.tracks?.items || []).forEach((track) => {
          const trackArtists = track.artists || [];
          const featured = trackArtists.filter((a) => a.id !== mainArtistId);

          featured.forEach((featArtist) => {
            collabList.push({
              trackName: track.name,
              mainArtistId,
              mainArtistName,
              collaboratorId: featArtist.id,
              collaboratorName: featArtist.name,
              albumName: album.name,
              label: album.label || "N/A",
            });
          });
        });
      });

      setCollabs(collabList);

      // graphe
      const nodesMap = new Map();

      nodesMap.set(foundArtist.id, {
        id: foundArtist.id,
        name: foundArtist.name,
        type: "main",
        label: mainLabel || "N/A",
      });

      collabList.forEach((c) => {
        if (!nodesMap.has(c.collaboratorId)) {
          nodesMap.set(c.collaboratorId, {
            id: c.collaboratorId,
            name: c.collaboratorName,
            type: "collaborator",
            label: c.label || "N/A",
          });
        }
      });

      const nodes = Array.from(nodesMap.values());

      const links = collabList.map((c) => ({
        source: c.mainArtistId,
        target: c.collaboratorId,
        label: c.label || "N/A",
      }));

      setGraphData({ nodes, links });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Routes location={location}>
    <Route path="/" element={<HomePage />} />
    <Route
      path="/explore"
      element={
        <ExplorePage
          token={token}
          onLogin={handleLogin}
          onLogout={handleLogout}
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          artist={artist}
          artistLabel={artistLabel}
          albums={albums}
          collabs={collabs}
          graphData={graphData}
          ForceGraph2D={ForceGraph2D}
        />
      }
    />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/project" element={<AboutProjectPage />} />   {/* nouveau */}
    <Route
      path="/callback"
      element={
        <ExplorePage
          token={token}
          onLogin={handleLogin}
          onLogout={handleLogout}
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          artist={artist}
          artistLabel={artistLabel}
          albums={albums}
          collabs={collabs}
          graphData={graphData}
          ForceGraph2D={ForceGraph2D}
        />
      }
    />
  </Routes>
  );
}

export default App;
