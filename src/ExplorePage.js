import React from "react";
import { Link } from "react-router-dom";

function ExplorePage({
  token,
  onLogin,
  onLogout,
  query,
  setQuery,
  onSearch,
  artist,
  artistLabel,
  albums,
  collabs,
  graphData,
  ForceGraph2D,
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8c933",
        color: "#000000",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Nav */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "1.5rem 3rem 0.5rem",
          fontSize: "0.95rem",
        }}
      >
        <div style={{ fontWeight: 800, lineHeight: 1.05 }}>
          <div style={{ fontSize: "2.2rem" }}>THE</div>
          <div style={{ fontSize: "2.2rem" }}>SEARCHBAR</div>
        </div>

        <nav
          style={{
            display: "flex",
            gap: "4rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginTop: "0.8rem",
            fontSize: "0.9rem",
          }}
        >
          <Link to="/" style={{ color: "#000", textDecoration: "none" }}>
            home
          </Link>
          <Link
            to="/about"
            style={{ color: "#000", textDecoration: "none" }}
          >
            about me
          </Link>
          <button
            type="button"
            onClick={() => {
              window.location.href = "/#contact";
            }}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              color: "#000",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            contact
          </button>
          <Link
            to="/project"
            style={{ color: "#000", textDecoration: "none" }}
          >
            about the project
          </Link>
        </nav>
      </header>

      {/* Main banner */}
      <main
        style={{
          padding: "2rem 3rem 3rem",
        }}
      >
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "3rem",
          }}
        >
          {/* Text left */}
          <div style={{ maxWidth: "520px" }}>
            <h2
              style={{
                fontSize: "2.4rem",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                fontWeight: 800,
              }}
            >
              LOG IN TO EXPLORE LABEL NETWORKS
            </h2>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              Connect your Spotify account to explore in real time the links
              between an artist, their releases and the labels that publish
              them. Nothing is stored: all data comes directly from the Spotify
              API on each search.
            </p>

            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: 800,
                marginBottom: "0.6rem",
              }}
            >
              For each artist, you can see:
            </p>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "1.5rem",
                fontSize: "1.2rem",
                fontWeight: 800,
                lineHeight: 1.6,
              }}
            >
              <li>their main label (computed from their albums);</li>
              <li>the labels behind their albums, EPs and singles;</li>
              <li>a graph of collaborations between artists and labels.</li>
            </ul>
          </div>

          {/* Login / state right */}
          <div
            style={{
              textAlign: "right",
              alignSelf: "center",
            }}
          >
            {!token ? (
              <>
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    marginBottom: "1rem",
                  }}
                >
                  Click here to start the demo.
                </p>
                <button
                  onClick={onLogin}
                  style={{
                    padding: "0.9rem 2.4rem",
                    fontSize: "1rem",
                    borderRadius: "999px",
                    border: "3px solid #000",
                    background: "#000",
                    color: "#f8c933",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Login with Spotify
                </button>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    marginBottom: "0.6rem",
                  }}
                >
                  You&apos;re connected to Spotify. You can start exploring.
                </p>
                <button
                  onClick={onLogout}
                  style={{
                    padding: "0.6rem 1.6rem",
                    fontSize: "0.95rem",
                    borderRadius: "999px",
                    border: "2px solid #000",
                    background: "#f8c933",
                    color: "#000",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </section>

        {/* Functional zone: search + results */}
        {token && (
          <section
            style={{
              background: "#fff9d6",
              borderRadius: "16px",
              padding: "1.8rem 2rem 2.2rem",
              color: "#000",
            }}
          >
            <form onSubmit={onSearch} style={{ marginBottom: "1.8rem" }}>
              <label
                htmlFor="artist-search"
                style={{ display: "block", marginBottom: "0.5rem" }}
              >
                Type an artist name to explore their labels and collaborations:
              </label>
              <div style={{ display: "flex", gap: "0.8rem" }}>
                <input
                  id="artist-search"
                  type="text"
                  placeholder="Look up an artist (e.g. Stormzy, Drake)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "0.9rem 1.2rem",
                    borderRadius: "999px",
                    border: "2px solid #000",
                    fontSize: "1rem",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "0.9rem 1.8rem",
                    borderRadius: "999px",
                    border: "2px solid #000",
                    background: "#000",
                    color: "#f8c933",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Search
                </button>
              </div>
            </form>

            {artist && (
              <div style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                <h2>{artist.name}</h2>
                {artistLabel && (
                  <p style={{ fontWeight: 600 }}>
                    Main label: {artistLabel}
                  </p>
                )}
                {artist.images && artist.images[0] && (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    style={{ width: "140px", borderRadius: "8px" }}
                  />
                )}
              </div>
            )}

            {albums.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <h3>Releases and labels</h3>
                <p style={{ marginBottom: "0.4rem" }}>
                  Each line is an album or single and the label that released
                  it.
                </p>
                <ul>
                  {albums.map((album) => (
                    <li key={album.id}>
                      <strong>{album.name}</strong> — Label:{" "}
                      {album.label || "N/A"}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {collabs.length > 0 && (
              <div style={{ marginTop: "1.5rem" }}>
                <h3>Collaborations found</h3>
                <p style={{ marginBottom: "0.4rem" }}>
                  Each line is a track where the main artist features another
                  artist. The label comes from the album that hosts the track.
                </p>
                <ul>
                  {collabs.map((c, index) => (
                    <li key={index}>
                      {c.mainArtistName} ↔ {c.collaboratorName} — "
                      {c.trackName}" ({c.albumName}) — Label: {c.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {graphData.nodes.length > 0 && (
              <div
                style={{
                  marginTop: "2rem",
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                  overflow: "hidden",
                }}
              >
                <div style={{ padding: "0.8rem 1rem", background: "#fff3aa" }}>
                  <h3 style={{ marginBottom: "0.3rem" }}>
                    Collaboration graph
                  </h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                    Each node represents an artist. The central node is the
                    artist you searched for, and the surrounding nodes are their
                    collaborators. Colors indicate associated labels: artists
                    that share the same color share at least one project under
                    the same label. Links show which tracks they appear on
                    together.
                  </p>
                </div>
                <div style={{ height: "450px" }}>
                  <ForceGraph2D
                    graphData={graphData}
                    nodeLabel={(node) =>
                      `${node.name}${
                        node.label ? " (" + node.label + ")" : ""
                      }`
                    }
                    nodeAutoColorBy="label"
                    linkColor={() => "rgba(0,0,0,0.4)"}
                  />
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default ExplorePage;
