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
      {/* Nav identique à la home, mais fond jaune */}
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
              // scroll vers la section contact de la home
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

      {/* Bandeau principal */}
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
          {/* Texte explicatif à gauche */}
          <div style={{ maxWidth: "520px" }}>
            <h2
              style={{
                fontSize: "2.4rem",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                fontWeight: 800,
              }}
            >
              LOG IN TO GET LABEL ASSOCIATION
            </h2>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              Connecte ton compte Spotify pour explorer en temps réel les liens
              entre un artiste, ses albums et les labels qui les publient. Rien
              n&apos;est stocké : les données viennent directement de l&apos;API
              Spotify à chaque recherche.
            </p>

            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: 800,
                marginBottom: "0.6rem",
              }}
            >
              Tu obtiens pour chaque artiste :
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
              <li>son label principal (calculé à partir de ses albums) ;</li>
              <li>les labels de ses projets et singles ;</li>
              <li>un graphe des collaborations entre artistes et labels.</li>
            </ul>
          </div>

          {/* Login / état à droite */}
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
                  Clique ici pour lancer la démo.
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
                  Connecté à Spotify. Tu peux lancer des recherches.
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

        {/* Zone fonctionnelle : search + résultats */}
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
                Tape un nom d&apos;artiste pour explorer ses labels et ses
                collaborations :
              </label>
              <div style={{ display: "flex", gap: "0.8rem" }}>
                <input
                  id="artist-search"
                  type="text"
                  placeholder="Look up an artist (ex: Stormzy, Drake)"
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
                  Rechercher
                </button>
              </div>
            </form>

            {artist && (
              <div style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                <h2>{artist.name}</h2>
                {artistLabel && (
                  <p style={{ fontWeight: 600 }}>
                    Label principal : {artistLabel}
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
                <h3>Albums et labels</h3>
                <p style={{ marginBottom: "0.4rem" }}>
                  Chaque entrée correspond à un album ou single et au label qui
                  l&apos;a publié.
                </p>
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
                <p style={{ marginBottom: "0.4rem" }}>
                  Ici, chaque ligne représente un morceau où l&apos;artiste
                  principal invite un autre artiste. Le label est celui de
                  l&apos;album qui porte le titre.
                </p>
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
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                  overflow: "hidden",
                }}
              >
                <div style={{ padding: "0.8rem 1rem", background: "#fff3aa" }}>
                  <h3 style={{ marginBottom: "0.3rem" }}>
                    Graphe des collaborations
                  </h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                    Chaque nœud représente un artiste. Le nœud central est
                    l&apos;artiste recherché, les nœuds autour sont les
                    collaborateurs. Les couleurs indiquent les labels
                    associés&nbsp;: des artistes avec la même couleur partagent
                    un label sur au moins un projet. Les liens montrent sur
                    quels morceaux ils apparaissent ensemble.
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
