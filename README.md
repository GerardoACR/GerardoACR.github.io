# GerardoACR.github.io

Personal portfolio site for Gerardo Antonio Corral Ruiz. The project is organized for GitHub Pages deployment with a modular structure that makes future updates straightforward.

## Project structure

```
├── index.html                  # Landing page
├── assets
│   ├── css
│   │   └── style.css           # Global styles
│   ├── data
│   │   └── skills.json         # Editable skills list rendered on the homepage
│   ├── images
│   │   └── profile.png         # Placeholder portrait (replace with your photo)
│   ├── js
│   │   └── main.js             # Navigation + dynamic skills rendering
│   └── resume
│       └── Gerardo-Corral-Resume.pdf   # Placeholder résumé (replace with your PDF)
```

## Getting started

1. Replace the placeholder portrait in `assets/images/profile.png` with your desired image.
2. Swap the résumé file in `assets/resume/Gerardo-Corral-Resume.pdf` with your latest PDF.
3. Update `assets/data/skills.json` with your current skill set. The page automatically renders whatever you list there.
4. Edit sections in `index.html` (projects, writing, etc.) to add real content or links.

## Local development

Because the site fetches a local JSON file, use a local web server when developing to avoid CORS restrictions. Any static server works, for example:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Deployment

Push the repository to a GitHub repository named `GerardoACR.github.io` (or configure GitHub Pages for a different repo). The site will deploy automatically via GitHub Pages.

## License

Feel free to adapt and reuse this layout for your personal projects.