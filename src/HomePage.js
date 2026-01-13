// HomePage.js
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      {/* BLOC HOME BLEU PLEIN ÉCRAN */}
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#00439c",
          color: "#ffffff",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header / Nav */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "1.5rem 3rem 0.5rem",
            fontSize: "0.95rem",
          }}
        >
          {/* Logo */}
          <div style={{ fontWeight: 800, lineHeight: 1.05 }}>
            <div style={{ fontSize: "2.4rem" }}>LABEL</div>
            <div style={{ fontSize: "2.4rem" }}>EXPLORER</div>
          </div>

          {/* Nav */}
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

            {/* bouton contact qui scrolle */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
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

        {/* centre bleu qui prend tout l'espace */}
        <div style={{ flex: 1 }} />

        {/* footer */}
        <footer
          style={{
            padding: "0 0 1.5rem 0",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "6rem",
              fontWeight: 800,
              textTransform: "lowercase",
              color: "#f9c933",
              lineHeight: 0.9,
              paddingLeft: "0.5rem",
            }}
          >
            protect rights
          </div>

          <div style={{ paddingLeft: "3rem", marginTop: "1.5rem" }}>
            <Link to="/explore">
              <button
                style={{
                  padding: "0.8rem 2rem",
                  fontSize: "0.95rem",
                  borderRadius: "999px",
                  border: "none",
                  background: "#1DB954",
                  color: "#000",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Entrer dans le Live Explorer
              </button>
            </Link>
          </div>
        </footer>
      </div>

      {/* SECTION CONTACT EN DESSOUS, VISIBLE SEULEMENT APRÈS SCROLL */}
      <section
        id="contact"
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "4rem 3rem 5rem",
        }}
      >
        <h2
          style={{
            fontSize: "2.4rem",
            fontWeight: 800,
            marginBottom: "1.5rem",
            textTransform: "lowercase",
          }}
        >
          contact
        </h2>

        <p
          style={{
            maxWidth: "520px",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          Tu veux discuter du projet, collaborer, ou me parler de droits
          d&apos;auteur ? Laisse-moi un message ici.
        </p>

        <form
          style={{
            maxWidth: "520px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            alert("Merci pour ton message !");
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Ton nom"
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "999px",
              border: "none",
              fontSize: "1rem",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Ton email"
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "999px",
              border: "none",
              fontSize: "1rem",
            }}
          />
          <textarea
            name="message"
            placeholder="Ton message"
            rows={5}
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "16px",
              border: "none",
              fontSize: "1rem",
              resize: "vertical",
            }}
          />
          <button
            type="submit"
            style={{
              alignSelf: "flex-start",
              padding: "0.8rem 2rem",
              borderRadius: "999px",
              border: "none",
              background: "#f9c933",
              color: "#000",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            Envoyer
          </button>
        </form>
      </section>
    </>
  );
}

export default HomePage;
