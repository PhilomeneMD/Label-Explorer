// AboutPage.js
import React from "react";
import { Link } from "react-router-dom";
import yourPhoto from "./myphoto.JPG";

function AboutPage() {
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

          <span style={{ color: "#f8c933" }}>about me</span>

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
              color: "#ffffff",
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
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            about the project
          </Link>
        </nav>
      </header>

      {/* ABOUT CONTENT */}
      <main
        style={{
          flex: 1,
          padding: "3rem 4rem",
          display: "grid",
          gridTemplateColumns: "1.1fr 1.3fr",
          columnGap: "3rem",
          position: "relative",
        }}
      >
        <h2
          style={{
            position: "absolute",
            top: "3rem",
            left: "4rem",
            fontSize: "3rem",
            fontWeight: 800,
            textTransform: "lowercase",
          }}
        >
          about me
        </h2>

        {/* Left column: photo + bubbles */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginTop: "5rem",
          }}
        >
          <div
            style={{
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={yourPhoto}
              alt="Philomène"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              top: "18%",
              left: "0%",
              width: "230px",
              padding: "1.2rem 1.4rem",
              borderRadius: "999px",
              border: "2px solid #f8c933",
              background: "#000",
              textAlign: "center",
              fontWeight: 800,
              textTransform: "uppercase",
              lineHeight: 1.2,
            }}
          >
            FIGHT FOR
            <br />
            ARTISTS&apos; VOICES
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "5%",
              width: "230px",
              padding: "1.2rem 1.4rem",
              borderRadius: "999px",
              border: "2px solid #f8c933",
              background: "#000",
              textAlign: "center",
              fontWeight: 800,
              textTransform: "uppercase",
              lineHeight: 1.2,
            }}
          >
            WORK FOR
            <br />
            EQUALITY
          </div>
        </div>

        {/* Right column: text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "4rem",
          }}
        >
          <div
            style={{
              fontSize: "2.4rem",
              fontWeight: 800,
              textAlign: "right",
              marginBottom: "3rem",
              lineHeight: 1.2,
            }}
          >
            I&apos;m Philomène and I&apos;ve
            <br />
            always been interested in
            <br />
            copyright law
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "2rem",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#f5d47a",
            }}
          >
            <p>
              After a 3‑year data science degree, I&apos;ve developed strong
              skills in quantitative and qualitative data analysis, especially
              in the art and culture sector. I&apos;m also interested in how
              large language models can be used to support artists.
            </p>
            <p>
              My personal projects include a study on manipulative language in
              18th‑century literature and an exploration of which musical
              tendencies make the most difference in how we experience a song.
            </p>
            <p>
              In my free time, I try to stay as close to creative practice as
              possible: writing, experimenting with visual design, and
              collecting stories about how artists navigate copyright and
              contracts.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AboutPage;