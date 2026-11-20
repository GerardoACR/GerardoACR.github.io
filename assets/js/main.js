const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const yearEl = document.getElementById('current-year');
const skillsGrid = document.getElementById('skills-grid');
const siteLogo = document.querySelector('.site-logo');
const logoMark = document.querySelector('.logo-mark');
const projectsTrack = document.getElementById('projects-track');
const projectsPrevButton = document.getElementById('projects-prev');
const projectsNextButton = document.getElementById('projects-next');
const projectsCounter = document.getElementById('projects-counter');
const projectsModelPanel = document.querySelector('[data-project-model]');
const projectsModelViewer = document.getElementById('projects-model-viewer');

let activeProjectIndex = 0;
let projectCount = 0;
let projectControlsBound = false;

const revealObserver =
  'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.16, rootMargin: '0px 0px -12% 0px' }
      )
    : null;

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (logoMark instanceof HTMLImageElement) {
  const setLogoReady = () => {
    if (logoMark.naturalWidth > 0) {
      document.documentElement.classList.add('has-logo-image');
    }
  };

  if (logoMark.complete) {
    setLogoReady();
  } else {
    logoMark.addEventListener('load', setLogoReady, { once: true });
  }
}

if (siteLogo instanceof HTMLAnchorElement) {
  siteLogo.addEventListener('click', (event) => {
    // Keep normal browser behavior for modified clicks (new tab/window, etc.).
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (navList && navToggle) {
      navList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navList.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function registerRevealElements(scope = document) {
  const elements = scope.querySelectorAll('[data-reveal]');

  elements.forEach((element, index) => {
    if (!element.style.getPropertyValue('--reveal-delay')) {
      element.style.setProperty('--reveal-delay', `${Math.min(index * 60, 260)}ms`);
    }

    if (!revealObserver) {
      element.classList.add('is-visible');
      return;
    }

    revealObserver.observe(element);
  });
}

function bindProjectControls() {
  if (projectControlsBound || !projectsPrevButton || !projectsNextButton || !projectsTrack) {
    return;
  }

  projectsPrevButton.addEventListener('click', () => {
    moveProjectSlide(-1);
  });

  projectsNextButton.addEventListener('click', () => {
    moveProjectSlide(1);
  });

  projectsTrack.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveProjectSlide(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveProjectSlide(1);
    }
  });

  projectControlsBound = true;
}

function bindProjectsModelHover() {
  if (!projectsModelPanel || !projectsModelViewer) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const baseTheta = 90;
  const basePhi = 75;
  const maxTheta = 5;
  const maxPhiShift = 3;

  const setOrbit = (theta, phi) => {
    projectsModelViewer.setAttribute('camera-orbit', `${theta.toFixed(2)}deg ${phi.toFixed(2)}deg auto`);
  };

  setOrbit(baseTheta, basePhi);

  projectsModelPanel.addEventListener('mousemove', (event) => {
    const bounds = projectsModelPanel.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    const theta = baseTheta + offsetX * (maxTheta * 2);
    const phi = basePhi - offsetY * (maxPhiShift * 2);
    setOrbit(theta, phi);
  });

  projectsModelPanel.addEventListener('mouseleave', () => {
    setOrbit(baseTheta, basePhi);
  });
}

function moveProjectSlide(step) {
  if (!projectCount) return;
  activeProjectIndex = (activeProjectIndex + step + projectCount) % projectCount;
  updateProjectCarousel();
}

function updateProjectCarousel() {
  if (!projectsTrack || !projectCount) return;

  projectsTrack.style.transform = `translateX(${-100 * activeProjectIndex}%)`;

  const cards = projectsTrack.querySelectorAll('.project-slide');
  cards.forEach((card, index) => {
    card.setAttribute('aria-hidden', String(index !== activeProjectIndex));
  });

  if (projectsCounter) {
    projectsCounter.textContent = `${activeProjectIndex + 1} / ${projectCount}`;
  }

  const disableArrows = projectCount < 2;
  if (projectsPrevButton) projectsPrevButton.disabled = disableArrows;
  if (projectsNextButton) projectsNextButton.disabled = disableArrows;
}

function normalizeProjects(projects) {
  if (!Array.isArray(projects)) return [];

  return projects
    .filter((project) => project && typeof project === 'object' && project.title)
    .map((project) => {
      const links = [];
      const rawLinks = Array.isArray(project.links) ? project.links : [];

      rawLinks.forEach((link) => {
        if (!link || typeof link !== 'object') return;
        const cta = String(link.cta ?? link.label ?? link.text ?? '').trim();
        const href = String(link.href ?? '').trim();
        if (!cta || !href) return;
        links.push({ cta, href });
      });

      if (project.cta && project.href) {
        links.push({
          cta: String(project.cta).trim(),
          href: String(project.href).trim(),
        });
      }

      if (project.cta2 && project.href2) {
        links.push({
          cta: String(project.cta2).trim(),
          href: String(project.href2).trim(),
        });
      }

      if (!links.length) {
        links.push({
          cta: project.cta ?? projectsTrack.dataset.linkLabel,
          href: project.href ?? '#',
        });
      }

      return {
        title: project.title,
        description: project.description ?? '',
        links,
      };
    });
}

function renderProjects(projects) {
  if (!projectsTrack) return;

  const items = normalizeProjects(projects);
  projectCount = items.length;

  if (!projectCount) {
    projectsTrack.innerHTML = `
      <article class="project-slide projects-empty" role="listitem">
        <h3>${projectsTrack.dataset.emptyLabel}</h3>
      </article>
    `;
    activeProjectIndex = 0;
    if (projectsCounter) projectsCounter.textContent = '';
    if (projectsPrevButton) projectsPrevButton.disabled = true;
    if (projectsNextButton) projectsNextButton.disabled = true;
    return;
  }

  projectsTrack.innerHTML = items
    .map(
      (project, index) => `
        <article class="project-slide" role="listitem" tabindex="0" aria-hidden="${index === 0 ? 'false' : 'true'}">
          <p class="project-kicker">${projectsTrack.dataset.projectLabel} ${index + 1}</p>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-links">
            ${project.links
              .map(
                (link) => `
                  <a class="project-link" href="${link.href}" ${
                    link.href.startsWith('http') || link.href.toLowerCase().endsWith('.pdf')
                      ? 'target="_blank" rel="noopener noreferrer"'
                      : ''
                  }>${link.cta}</a>
                `
              )
              .join('')}
          </div>
        </article>
      `
    )
    .join('');

  activeProjectIndex = 0;
  bindProjectControls();
  updateProjectCarousel();
}

function renderSkills(skills) {
  if (!Array.isArray(skills)) return;
  skillsGrid.querySelectorAll('[data-skill-group]').forEach((grid) => {
    const items = skills.filter((skill) => (skill.group ?? 'other') === grid.dataset.skillGroup);
    grid.closest('.skill-group').hidden = items.length === 0;
    grid.innerHTML = items.map(({ name, level, description }, index) => `
      <article class="skill-item" role="listitem" data-reveal style="--reveal-delay: ${index * 45}ms;">
        <h4>${name}</h4>
        ${level ? `<span class="skill-level">${level}</span>` : ''}
        ${description ? `<p>${description}</p>` : ''}
      </article>
    `).join('');
  });

  registerRevealElements(skillsGrid);
}

function addBackgroundParticles() {
  const particlesPerSide = 312;
  for (const side of ['left', 'center-left', 'center-right', 'right']) {
    const isCenter = side.startsWith('center');
    const count = isCenter ? particlesPerSide / 2 : particlesPerSide;
    const band = document.createElement('div');
    band.className = `particle-band particle-band--${side}`;
    band.setAttribute('aria-hidden', 'true');

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('i');
      const depth = Math.random() ** 1.5;
      const size = 1 + 1.6 * depth + 2 * Math.max(0, depth - 0.75);
      const rise = 75 - 42 * depth + Math.random() * 8;
      const position = (i + Math.random()) / count;
      const opacity = (0.24 + 0.47 * depth) * (isCenter ? 0.5 : 1);
      dot.style.setProperty('--x', `${position * 100}%`);
      dot.style.setProperty('--size', `${size * (isCenter ? 0.65 : 1)}px`);
      dot.style.setProperty('--alpha', opacity.toFixed(3));
      dot.style.setProperty('--rise', `${rise}s`);
      dot.style.setProperty('--phase', `${-Math.random() * rise}s`);
      dot.style.setProperty('--sway', `${4 + Math.random() * 5}s`);
      dot.style.setProperty('--drift', `${3 + depth * 9}px`);
      band.append(dot);
    }
    document.body.prepend(band);
  }
}

document.querySelectorAll('[data-film-id]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (location.protocol === 'file:' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const player = document.createElement('iframe');
    player.className = 'film-player';
    player.title = link.getAttribute('aria-label');
    player.src = `https://www.youtube-nocookie.com/embed/${link.dataset.filmId}?autoplay=1&playsinline=1`;
    player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    link.replaceWith(player);
    player.focus();
  });
});

addBackgroundParticles();
registerRevealElements();
bindProjectsModelHover();
renderSkills(portfolioSkills);
renderProjects(portfolioProjects);
