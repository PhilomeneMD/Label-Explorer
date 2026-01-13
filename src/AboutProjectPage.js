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

      {/* CONTENU */}
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
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1rem" }}>
            LABEL EXPLORER est un outil expérimental qui cartographie les liens
            entre artistes, albums et labels à partir de l&apos;API Spotify. Il
            met en avant la dimension politique et économique des crédits dans
            l&apos;industrie musicale.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1rem" }}>
            En cherchant un artiste, tu obtiens son label principal, les labels
            associés à ses projets, ainsi qu&apos;un graphe de collaborations
            entre artistes et maisons de disques. L&apos;objectif est de rendre
            visible les structures qui influencent la circulation de la musique.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            Le projet est développé dans une démarche de recherche : les données
            ne sont pas stockées et servent uniquement à la visualisation en
            temps réel. Il peut évoluer vers d&apos;autres sources de données
            (collectives, indépendantes) pour sortir du prisme d&apos;une seule
            plateforme.
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
              <li>les labels dominants d’un artiste ;</li>
              <li>les collaborations récurrentes entre artistes ;</li>
              <li>la concentration des collaborations par label.</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: "0.4rem" }}>
              limitations
            </h3>
            <p>
              Basé sur les métadonnées Spotify : certains crédits ou labels
              peuvent être incomplets, flous ou normalisés par la plateforme.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AboutProjectPage;