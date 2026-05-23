SAWS Cyberpunk Portfolio

This project is a lightweight React portfolio for your semi-autonomous sensor-to-shooter system. It loads the model directly from `public/assets/industrial machine 3d model_Clone1.glb`.

Quick start:

```bash
cd /home/vishwa/Desktop/SAWS/frontend
npm install
npm run dev
```

Open the local dev URL printed by Vite.

Build for production:

```bash
npm run build
```

Free GitHub Pages hosting:

1. Create a new GitHub repository and push this project to it.
2. In GitHub Repository Settings > Pages, select branch `main` and folder `/docs`.
3. Run `npm run build` locally.
4. Commit the generated `docs/` folder and push to GitHub.
5. GitHub Pages will serve the portfolio from `https://<username>.github.io/<repo>/`.

Project structure:
- `public/assets/industrial machine 3d model_Clone1.glb` — model asset
- `src/App.jsx` — portfolio page and 3D viewer
- `src/styles.css` — cyberpunk holographic styling

Notes:
- No file picker is required; the model loads directly from `public/assets`.
- The project is ready for GitHub Pages as a static site.
