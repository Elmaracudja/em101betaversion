const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// === CONFIGURATION ===
// CHANGE ici l'URL de ton dépôt GitHub
const GITHUB_REPO = 'https://github.com/Elmaracudja/em101betaversion.git';
// Nom de la branche git
const BRANCH = 'main';
// URL audio live de ta webradio
const AUDIO_STREAM_URL = 'http://31.207.35.133:8000/A01.mp3';

// === Fonctions utilitaires ===
function writeFile(filepath, content) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Créé: ${filepath}`);
}

// === Templates HTML ===

function templateHeader(title) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>em101betaversion - ${title}</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header>
    <div class="container">
      <h1>em101betaversion</h1>
      <nav>
        <a href="index.html">Accueil</a>
        <a href="articles.html">Articles</a>
        <a href="agenda.html">Agenda</a>
        <a href="contact.html">Contact</a>
      </nav>
    </div>
    <div id="audio-player">
      <audio id="live-audio" preload="none" controls>
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
      <p>Écoutez la webradio en direct via le lecteur ci-dessus. Parcourez nos articles, consultez l’agenda et contactez-nous.</p>
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
          <img src="images/article1-1.jpg" alt="Image 1 article" />
          <img src="images/article1-2.jpg" alt="Image 2 article" style="display:none;" />
          <img src="images/article1-3.jpg" alt="Image 3 article" style="display:none;" />
          <button class="prev-btn">‹</button>
          <button class="next-btn">›</button>
        </div>
      </article>
      <article>
        <h2>Deuxième Article : Interview exclusive</h2>
        <p>Une interview approfondie avec un artiste renommé.</p>
        <div class="slideshow">
          <img src="images/article2-1.jpg" alt="Image 1 article" />
          <img src="images/article2-2.jpg" alt="Image 2 article" style="display:none;" />
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

// === CSS et JS ===

const cssContent = `
body, h1, h2, p, nav, a {
  margin: 0; padding: 0; font-family: Arial, sans-serif;
}
body {
  line-height: 1.6;
  background: #f0f0f0;
  color: #333;
}
.container {
  max-width: 960px;
  margin: auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header {
  background-color: #222;
  color: #eee;
  padding: 0.5rem 0;
}
header h1 {
  font-size: 1.5rem;
}
nav a {
  color: #eee;
  text-decoration: none;
  margin-left: 1rem;
}
nav a:hover {
  text-decoration: underline;
}
#audio-player {
  margin-top: 0.5rem;
  text-align: center;
}
main {
  background: white;
  margin: 1rem auto;
  max-width: 700px;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}
footer {
  text-align: center;
  font-size: 0.9rem;
  padding: 1rem;
  color: #555;
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
  background-color: #222;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  border-radius: 3px;
}
.contact-form button:hover {
  background-color: #444;
}
`;

const playerJs = `
const liveAudio = document.getElementById('live-audio');
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

// === Fonction principale ===

function generateSite() {
  // Création dossiers
  ['css', 'js', 'images'].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      console.log(`Dossier créé : ${dir}`);
    }
  });

  // Création fichiers HTML
  writeFile('index.html', templateIndex());
  writeFile('articles.html', templateArticles());
  writeFile('agenda.html', templateAgenda());
  writeFile('contact.html', templateContact());

  // Création fichiers CSS/JS
  writeFile('css/style.css', cssContent);
  writeFile('js/player.js', playerJs);
  writeFile('js/slideshow.js', slideshowJs);

  // (Pour tester, tu peux ajouter des images dans 'images' manuellement)
  console.log('Génération des fichiers terminée.');
}

function gitCommand(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Erreur git: ${cmd}`, error.message);
  }
}

function deployToGit() {
  // Initialisation repo git si pas déjà fait
  if (!fs.existsSync('.git')) {
    gitCommand('git init');
    gitCommand(`git checkout -b ${BRANCH}`);
    gitCommand(`git remote add origin ${GITHUB_REPO}`);
  }
  // Ajout, commit, push
  gitCommand('git add .');
  const commitMessage = `Déploiement automatique em101betaversion ${new Date().toISOString()}`;
  try {
    gitCommand(`git commit -m "${commitMessage}"`);
  } catch {
    console.log('Aucun changement à committer');
  }
  gitCommand(`git push -u origin ${BRANCH}`);
  console.log('\nDéploiement terminé. Pense à activer ton GitHub Pages via "Settings > Pages".');
}

// === Exécution ===
generateSite();
deployToGit();
