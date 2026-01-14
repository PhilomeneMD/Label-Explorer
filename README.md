# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



# LABEL EXPLORER

Label Explorer is an experimental web app that maps relationships between artists, releases and record labels using the Spotify Web API and an interactive collaboration graph.

The project is both a technical demo and a research tool about how labels structure the circulation of music.

---

## Features

- **Artist search (Spotify)**  
  - Search for any artist via the Spotify API.  
  - Select the best match and fetch their albums, EPs and singles.

- **Label inference**  
  - Compute an artist’s **main label** from the labels attached to their releases.  
  - Display the label for each album / single.

- **Collaboration graph**  
  - Build a graph of collaborations between the searched artist and featured artists.  
  - Each node is an artist, links represent tracks they appear on together.  
  - Node colors are driven by labels: artists sharing a label share the same color.

- **Pages and navigation**  
  - **Home**: blue hero screen with a “protect rights” tagline and a contact section reachable on scroll.  
  - **Search bar / Explore**: yellow page with Spotify login, artist search, releases list and collaboration graph.  
  - **About me**: black page with a portrait and text about the author’s background and interests in copyright law.  
  - **About the project**: black page describing the concept, methodology, limitations and tech stack.

---

## Tech stack

- **Frontend**: React (Create React App)
- **Routing**: React Router
- **Graph visualisation**: [`react-force-graph-2d`](https://github.com/vasturiano/react-force-graph)  
- **API**: Spotify Web API (Authorization Code with PKCE)
- **Deployment**: Netlify

---

## Pages overview

### Home (`/`)

- Full-screen blue hero with the **LABEL EXPLORER** logo and navigation.
- Big “protect rights” tagline.
- Button to enter the **Live Explorer** (`/explore`).
- Contact section at the bottom of the page (scroll or click “contact” in the nav).

### Explore (`/explore`)

- Spotify login using Authorization Code + PKCE.
- Artist search input.
- For a given artist:
  - Main label (inferred from their albums).
  - List of releases and their labels.
  - List of featured-artist collaborations.
  - Force-directed graph of collaborations, colored by label.

### About me (`/about`)

- Black page with a circular portrait.
- Bubbles: **FIGHT FOR ARTISTS’ VOICES** and **WORK FOR EQUALITY**.
- Text about background in data science, art & culture, copyright and creative practice.

### About the project (`/project`)

- Description of Label Explorer as an experimental tool built on Spotify metadata.
- Explanation of what can be explored:
  - dominant labels for an artist,
  - recurring collaborations,
  - concentration of collaborations around specific labels.
- Notes on limitations (Spotify metadata can be incomplete or normalised).

---

## Getting started

### Prerequisites

- Node.js and npm installed.
- A Spotify developer account with a registered app.

You will need:

- `SPOTIFY_CLIENT_ID`
- a `REDIRECT_URI` that matches the one configured in your Spotify app (Netlify + local).

### Installation

```bash
git clone https://github.com/PhilomeneMD/Label-Explorer.git
cd Label-Explorer
npm install
