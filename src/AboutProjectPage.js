// AboutProjectPage.js
import React from "react";
import { Link } from "react-router-dom";

function AboutProjectPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* NAV */}
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
          <div style={{ fontSize: "2.4rem" }}>LABEL</div>
          <div style={{ fontSize: "2.4rem" }}>EXPLORER</div>
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
          <Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>
            home
          </Link>
          <Link
            to="/explore"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            search bar
          </Link>
          <Link
            to="/about"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            about me
          </Link>
          <span style={{ color: "#f8c933" }}>about the project</span>
        </nav>
      </header>

      {/* CONTENT */}
      <main
        style={{
          flex: 1,
          padding: "4rem 4rem 5rem",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "3rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              marginBottom: "1.5rem",
              textTransform: "lowercase",
            }}
          >
            about the project
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginBottom: "1rem",
            }}
          >
            LABEL EXPLORER is an experimental tool that maps the
            relationships between artists, albums and labels using the Spotify
            Web API. It highlights the political and economic dimension of
            credits in the music industry.
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginBottom: "1rem",
            }}
          >
            When you search for an artist, you get their main label, the labels
            associated with their projects, and a collaboration graph that shows
            how artists and record companies are connected. The goal is to make
            visible the structures that shape how music circulates.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            The project is built in a research mindset: data is not stored and
            is only used for real‑time visualisation. In the future, it could
            integrate other data sources (collective, independent) to move
            beyond the lens of a single platform.
          </p>
        </div>

        <div
          style={{
            borderLeft: "1px solid #444",
            paddingLeft: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            fontSize: "0.95rem",
            color: "#f5d47a",
          }}
        >
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: "0.4rem" }}>
              tech stack
            </h3>
            <p>React, React Router, react-force-graph, Spotify Web API.</p>
          </div>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: "0.4rem" }}>
              what you can explore
            </h3>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: 1.6 }}>
              <li>an artist&apos;s dominant labels;</li>
              <li>recurring collaborations between artists;</li>
              <li>how collaborations concentrate around specific labels.</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: "0.4rem" }}>
              limitations
            </h3>
            <p>
              The tool relies on Spotify metadata, which means some credits or
              label names may be incomplete, ambiguous or normalised by the
              platform.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AboutProjectPage;
