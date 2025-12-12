import React, { useEffect, useState } from "react";
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

const spotifyApi = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);
  const [query, setQuery] = useState("");
  const [artist, setArtist] = useState(null);
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
    setAlbums([]);
    setCollabs([]);
    setGraphData({ nodes: [], links: [] });
    setQuery("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query || !token) return;

    try {
      // 1) chercher l'artiste (jusqu'à 10 résultats)
      const searchRes = await spotifyApi.searchArtists(query, { limit: 10 });

      const items = searchRes.artists?.items || [];
      if (items.length === 0) {
        setArtist(null);
        setAlbums([]);
        setCollabs([]);
        setGraphData({ nodes: [], links: [] });
        return;
      }

      // 2) essayer de trouver un nom qui matche exactement (insensible à la casse)
      const exact = items.find(
        (a) => a.name.toLowerCase() === query.trim().toLowerCase()
      );
      const foundArtist = exact || items[0];
      setArtist(foundArtist);

      // 3) albums de l'artiste (simplified albums)
      const albumsRes = await spotifyApi.getArtistAlbums(foundArtist.id, {
        include_groups: "album,single",
        limit: 20,
      });

      // 4) récupérer les IDs pour demander les "full albums" (labels + tracks)
      const albumIds = albumsRes.items.map((a) => a.id);
      if (albumIds.length === 0) {
        setAlbums([]);
        setCollabs([]);
        setGraphData({ nodes: [], links: [] });
        return;
      }

      // 5) batch sur /albums?ids=...
      const fullAlbumsRes = await spotifyApi.getAlbums(albumIds);
      const fullAlbums = fullAlbumsRes.albums;
      setAlbums(fullAlbums);

      // 6) extraire les collaborations à partir des tracks
      const collabList = [];

      fullAlbums.forEach((album) => {
        const mainArtistId = foundArtist.id;
        const mainArtistName = foundArtist.name;

        (album.tracks?.items || []).forEach((track) => {
          const trackArtists = track.artists || [];

          // artistes autres que l'artiste principal
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

      // 7) construire les données du graphe
      const nodesMap = new Map();

      // nœud central = artiste principal
      nodesMap.set(foundArtist.id, {
        id: foundArtist.id,
        name: foundArtist.name,
        type: "main",
      });

      // nœuds pour chaque collaborateur
      collabList.forEach((c) => {
        if (!nodesMap.has(c.collaboratorId)) {
          nodesMap.set(c.collaboratorId, {
            id: c.collaboratorId,
            name: c.collaboratorName,
            type: "collaborator",
            label: c.label,
          });
        }
      });

      const nodes = Array.from(nodesMap.values());

      // liens artiste principal ↔ collaborateur
      const links = collabList.map((c) => ({
        source: c.mainArtistId,
        target: c.collaboratorId,
        label: c.label,
      }));

      setGraphData({ nodes, links });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        color: "white",
        background: "#121212",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h1>Label Explorer - Auth + Network</h1>

      {!token && (
        <>
          <p>Tu n'es pas connecté à Spotify.</p>
          <button onClick={handleLogin}>Login with Spotify</button>
        </>
      )}

      {token && (
        <>
          <p>Connecté ✅</p>
          <button onClick={handleLogout}>Logout</button>

          <hr style={{ margin: "2rem 0" }} />

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Cherche un artiste (ex: Stormzy, Drake)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ padding: "0.5rem", width: "250px" }}
            />
            <button type="submit" style={{ marginLeft: "0.5rem" }}>
              Rechercher
            </button>
          </form>

          {artist && (
            <div style={{ marginTop: "1.5rem" }}>
              <h2>{artist.name}</h2>
              {artist.images && artist.images[0] && (
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  style={{ width: "150px", borderRadius: "8px" }}
                />
              )}
            </div>
          )}

          {albums.length > 0 && (
            <div style={{ marginTop: "1.5rem" }}>
              <h3>Albums (avec labels)</h3>
              <ul>
                {albums.map((album) => (
                  <li key={album.id}>
                    <strong>{album.name}</strong> — Label :{" "}
                    {album.label || "N/A"}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {collabs.length > 0 && (
            <div style={{ marginTop: "1.5rem" }}>
              <h3>Collaborations trouvées</h3>
              <ul>
                {collabs.map((c, index) => (
                  <li key={index}>
                    {c.mainArtistName} ↔ {c.collaboratorName} — "
                    {c.trackName}" ({c.albumName}) — Label : {c.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {graphData.nodes.length > 0 && (
            <div
              style={{
                marginTop: "2rem",
                height: "500px",
                border: "1px solid #333",
              }}
            >
              <h3>Réseau de collaborations</h3>
              <ForceGraph2D
                graphData={graphData}
                nodeLabel={(node) =>
                  `${node.name}${node.label ? " (" + node.label + ")" : ""}`
                }
                nodeAutoColorBy="label"
                linkColor={() => "rgba(255,255,255,0.4)"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
