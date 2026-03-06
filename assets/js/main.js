const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const yearEl = document.getElementById('current-year');
const skillsGrid = document.getElementById('skills-grid');
const logoMark = document.querySelector('.logo-mark');
const projectsTrack = document.getElementById('projects-track');
const projectsPrevButton = document.getElementById('projects-prev');
const projectsNextButton = document.getElementById('projects-next');
const projectsCounter = document.getElementById('projects-counter');

const defaultProjects = [
  {
    title: 'Future of design industry with GenAI [ESP]',
    description:
      'In July 2022, I wrote an article for El Universal (in Spanish) arguing that generative AI would fundamentally reshape the graphic design industry in the years ahead. Feel free to check it out.',
    cta: 'Check it out',
    href: 'https://www.generacionuniversitaria.com.mx/tu-voz/dibujo-asistido-por-inteligencia-artificial-es-arte/',
  },
  {
    title: 'The Digital Panopticon of Artificial Intelligence: between Safety and Freedom',
    description:
      "Drafted for my master's course Governance e Diritto delle PPAA, this paper examines how AI for public safety can drift into a digital panopticon and translates EU frameworks (AI Act, GDPR, Data Governance Act) into a practical application for companies that build or supply AI to government in a safe, auditable, and rights-respecting way.",
    cta: 'Read the paper (PDF)',
    href: 'assets/documents/panopticPaper.pdf',
  },
  {
    title: 'Opinion Essays on Philosophy [ESP]',
    description:
      'I publish short opinion pieces on diverse topics, and I will keep adding new articles there. Feel free to visit my Medium.',
    cta: 'Visit my Medium',
    href: 'https://gercorral.medium.com',
  },
];

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
    .map((project) => ({
      title: project.title,
      description: project.description ?? '',
      cta: project.cta ?? 'View project',
      href: project.href ?? '#',
    }));
}

function renderProjects(projects) {
  if (!projectsTrack) return;

  const items = normalizeProjects(projects);
  projectCount = items.length;

  if (!projectCount) {
    projectsTrack.innerHTML = `
      <article class="project-slide projects-empty" role="listitem">
        <h3>No projects yet</h3>
        <p>Add entries in <code>assets/data/projects.json</code> to populate this carousel.</p>
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
          <p class="project-kicker">Project ${index + 1}</p>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <a class="project-link" href="${project.href}" ${
            project.href.startsWith('http') || project.href.toLowerCase().endsWith('.pdf')
              ? 'target="_blank" rel="noopener noreferrer"'
              : ''
          }>${project.cta}</a>
        </article>
      `
    )
    .join('');

  activeProjectIndex = 0;
  bindProjectControls();
  updateProjectCarousel();
}

async function loadProjects() {
  if (!projectsTrack) return;

  try {
    const response = await fetch('assets/data/projects.json');
    if (!response.ok) {
      throw new Error(`Unable to load projects: ${response.statusText}`);
    }

    const projects = await response.json();
    renderProjects(projects);
  } catch (error) {
    console.error(error);
    renderProjects(defaultProjects);
  }
}

async function loadSkills() {
  if (!skillsGrid) return;
  try {
    const response = await fetch('assets/data/skills.json');
    if (!response.ok) {
      throw new Error(`Unable to load skills: ${response.statusText}`);
    }
    const skills = await response.json();
    renderSkills(skills);
  } catch (error) {
    console.error(error);
    const hasStaticSkills = skillsGrid.querySelector('.skill-item');
    if (hasStaticSkills) {
      registerRevealElements(skillsGrid);
      return;
    }

    skillsGrid.innerHTML = '<p class="skills-error">No se pudo cargar <code>assets/data/skills.json</code>. Publica el sitio con servidor (no <code>file://</code>) o revisa la ruta del archivo.</p>';
  }
}

function renderSkills(skills) {
  if (!Array.isArray(skills)) return;
  skillsGrid.innerHTML = skills
    .map((skill, index) => {
      const { name, level, description } = skill;
      return `
        <article class="skill-item" role="listitem" data-reveal style="--reveal-delay: ${index * 45}ms;">
          <h3>${name ?? 'Skill'}</h3>
          ${level ? `<span class="skill-level">${level}</span>` : ''}
          ${description ? `<p>${description}</p>` : ''}
        </article>
      `;
    })
    .join('');

  registerRevealElements(skillsGrid);
}

registerRevealElements();
loadSkills();
loadProjects();
