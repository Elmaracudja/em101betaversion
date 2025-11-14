const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// === CONFIGURATION ===
const GITHUB_REPO = 'https://github.com/Elmaracudja/em101betaversion.git';
const BRANCH = 'main';
const AUDIO_STREAM_URL = './Assets/audio/episode1.mp3';

// === Helpers ===
function writeFile(filepath, content) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Fichier écrit : ${filepath}`);
}

function gitCommand(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Erreur git ${cmd} :`, e.message);
    process.exit(1);
  }
}

function remoteExists() {
  try {
    const remotes = execSync('git remote').toString();
    return remotes.split('\n').includes('origin');
  } catch {
    return false;
  }
}

// === Templates ===
function templateHeader(title) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>em101betaversion - ${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header>
    <div class="container header-logo-title">
      <img src="Assets/logo.png" alt="Logo em101" class="logo" />
      <h1>em101betaversion</h1>
      <nav>
        <a href="index.html">Accueil</a>
        <a href="articles.html">Articles</a>
        <a href="agenda.html">Agenda</a>
        <a href="contact.html">Contact</a>
      </nav>
    </div>
    <div id="audio-player">
      <audio id="podcast-player" controls>
        <source src="${AUDIO_STREAM_URL}" type="audio/mpeg" />
        Votre navigateur ne supporte pas la lecture audio.
      </audio>
    </div>
  </header>
  <main>
`;
}

function templateFooter() {
  return `
  </main>
  <footer>
    <p>© 2025 em101betaversion. Tous droits réservés.</p>
  </footer>
  <script src="js/player.js"></script>
</body>
</html>`;
}

function templateIndex() {
  return (
    templateHeader('Accueil') +
    `
    <section class="welcome">
      <h2>Bienvenue sur em101betaversion</h2>
      <p>Écoutez les podcasts via le lecteur ci-dessus. Parcourez nos articles, consultez l’agenda et contactez-nous.</p>
    </section>
  ` +
    templateFooter()
  );
}

function templateArticles() {
  return (
    templateHeader('Articles') +
    `
    <section class="articles-list">
      <article>
        <h2>Premier Article : Découverte musicale</h2>
        <p>Un aperçu des dernières tendances musicales.</p>
        <div class="slideshow">
          <img src="Assets/articles/article1-1.jpg" alt="Image 1 article" />
          <img src="Assets/articles/article1-2.jpg" alt="Image 2 article" style="display:none;" />
          <img src="Assets/articles/article1-3.jpg" alt="Image 3 article" style="display:none;" />
          <button class="prev-btn">‹</button>
          <button class="next-btn">›</button>
        </div>
      </article>
      <article>
        <h2>Deuxième Article : Interview exclusive</h2>
        <p>Une interview approfondie avec un artiste renommé.</p>
        <div class="slideshow">
          <img src="Assets/articles/article2-1.jpg" alt="Image 1 article" />
          <img src="Assets/articles/article2-2.jpg" alt="Image 2 article" style="display:none;" />
          <button class="prev-btn">‹</button>
          <button class="next-btn">›</button>
        </div>
      </article>
    </section>
  ` +
    `<script src="js/slideshow.js"></script>` +
    templateFooter()
  );
}

function templateAgenda() {
  return (
    templateHeader('Agenda') +
    `
    <section class="agenda-list">
      <h2>Agenda des événements</h2>
      <ul>
        <li><strong>20 novembre 2025:</strong> Atelier DJ en ligne</li>
        <li><strong>5 décembre 2025:</strong> Interview spéciale avec artiste invité</li>
        <li><strong>15 décembre 2025:</strong> Diffusion en direct d’un concert</li>
      </ul>
    </section>
  ` +
    templateFooter()
  );
}

function templateContact() {
  return (
    templateHeader('Contact') +
    `
    <section class="contact-form">
      <h2>Contactez-nous</h2>
      <form action="mailto:contact@em101betaversion.example" method="post" enctype="text/plain">
        <label for="name">Nom:</label><br />
        <input type="text" id="name" name="name" required /><br /><br />
        
        <label for="email">Email:</label><br />
        <input type="email" id="email" name="email" required /><br /><br />
        
        <label for="message">Message:</label><br />
        <textarea id="message" name="message" rows="5" required></textarea><br /><br />
        
        <button type="submit">Envoyer</button>
      </form>
    </section>
  ` +
    templateFooter()
  );
}

// === CSS & JS ===
const cssContent = `
:root {
  --couleur-primaire: #FFA500;
  --couleur-secondaire: #90EE90;
  --couleur-fond: #000000;
  --couleur-texte: #FFFFFF;
  --couleur-bouton-bg: var(--couleur-primaire);
  --couleur-bouton-hover: var(--couleur-secondaire);
  --couleur-nav-bg: var(--couleur-fond);
  --couleur-nav-texte: var(--couleur-texte);
}

body {
  font-family: 'Roboto Condensed', Arial, sans-serif;
  background-color: var(--couleur-fond);
  color: var(--couleur-texte);
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

header {
  background-color: var(--couleur-nav-bg);
  color: var(--couleur-nav-texte);
  padding: 1rem;
}

.header-logo-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  height: 40px;
  width: auto;
}

nav a {
  color: var(--couleur-nav-texte);
  text-decoration: none;
  margin-left: 1rem;
  font-weight: bold;
  transition: color 0.3s ease;
}

nav a:hover {
  color: var(--couleur-primaire);
}

main {
  background-color: #111111;
  margin: 1rem auto;
  max-width: 900px;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px 2px rgba(255, 165, 0, 0.5);
}

h1, h2 {
  font-family: 'Roboto Condensed', Arial, sans-serif;
  color: var(--couleur-primaire);
}

a, button {
  cursor: pointer;
}

button {
  background-color: var(--couleur-bouton-bg);
  color: var(--couleur-texte);
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--couleur-bouton-hover);
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: var(--couleur-nav-bg);
  color: var(--couleur-nav-texte);
  margin-top: 2rem;
  font-size: 0.9rem;
}

.articles-list article {
  margin-bottom: 2rem;
}

.slideshow {
  position: relative;
  max-width: 100%;
  height: auto;
  overflow: hidden;
}

.slideshow img {
  width: 100%;
  max-height: 350px;
  display: block;
}

.slideshow button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
}

.slideshow .prev-btn { left: 10px; }
.slideshow .next-btn { right: 10px; }

.contact-form label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}

.contact-form input, .contact-form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.contact-form button {
  background-color: var(--couleur-bouton-bg);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  border-radius: 3px;
}

.contact-form button:hover {
  background-color: var(--couleur-bouton-hover);
}
`;

const playerJs = `
const liveAudio = document.getElementById('podcast-player');
if(liveAudio) {
  liveAudio.volume = 0.5;
}
`;

const slideshowJs = `
document.querySelectorAll('.slideshow').forEach(slideshow => {
  const slides = slideshow.querySelectorAll('img');
  let currentIndex = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
  };

  slideshow.querySelector('.prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  slideshow.querySelector('.next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  showSlide(currentIndex);
});
`;

// === Main ===
function generateSite() {
  const requiredDirs = [
    'css',
    'js',
    'Assets/index',
    'Assets/articles',
    'Assets/agenda',
    'Assets/contact',
    'Assets/audio',
  ];

  requiredDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Dossier créé : ${dir}`);
    }
  });

  writeFile('index.html', templateIndex());
  writeFile('articles.html', templateArticles());
  writeFile('agenda.html', templateAgenda());
  writeFile('contact.html', templateContact());

  writeFile('css/style.css', cssContent);
  writeFile('js/player.js', playerJs);
  writeFile('js/slideshow.js', slideshowJs);

  console.log('Fichiers générés avec succès.');
}

function deployToGit() {
  if (!fs.existsSync('.git')) {
    gitCommand('git init');
    gitCommand(`git checkout -b ${BRANCH}`);
  }

  if (remoteExists()) {
    gitCommand(`git remote set-url origin ${GITHUB_REPO}`);
  } else {
    gitCommand(`git remote add origin ${GITHUB_REPO}`);
  }

  gitCommand('git add .');
  const commitMsg = `Automatisation générée - ${new Date().toISOString()}`;

  try {
    gitCommand(`git commit -m "${commitMsg}"`);
  } catch {
    console.log('Aucun changement à committer.');
  }

  try {
    gitCommand(`git push -u origin ${BRANCH}`);
    console.log('Déploiement sur GitHub terminé avec succès.');
  } catch (e) {
    console.error('Erreur lors du push Git:', e.message);
  }
}

generateSite();
deployToGit();
