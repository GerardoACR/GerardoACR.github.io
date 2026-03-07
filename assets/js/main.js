const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const yearEl = document.getElementById('current-year');
const skillsGrid = document.getElementById('skills-grid');
const logoMark = document.querySelector('.logo-mark');
const projectsTrack = document.getElementById('projects-track');
const projectsPrevButton = document.getElementById('projects-prev');
const projectsNextButton = document.getElementById('projects-next');
const projectsCounter = document.getElementById('projects-counter');
const projectsModelPanel = document.querySelector('[data-project-model]');
const projectsModelViewer = document.getElementById('projects-model-viewer');

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

const defaultSkills = [
  {
    name: 'Python',
    level: 'Intermediate',
    description: 'Pandas, Seaborn, Numpy, Sklearn, DoWhy',
  },
  {
    name: 'R',
    level: 'Intermediate',
    description: '',
  },
  {
    name: 'JavaScript',
    level: 'Low intermediate',
    description: '',
  },
  {
    name: 'SQL',
    level: 'Low intermediate',
    description: '',
  },
  {
    name: 'Spanish',
    level: 'Native',
    description: '',
  },
  {
    name: 'English',
    level: 'C1 Toefl iBT',
    description: '',
  },
  {
    name: 'Italian',
    level: 'C1 University of Bologna',
    description: '',
  },
  {
    name: 'Japanese',
    level: 'A1',
    description: 'Without certification',
  },
  {
    name: 'Adobe',
    level: 'Advanced',
    description: 'Photoshop, Premiere',
  },
  {
    name: 'Gen AI',
    level: 'High intermediate',
    description: 'Midjourney, ComfyUI, ChatGPT, NotebookLM',
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
          cta: project.cta ?? 'View project',
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
    renderSkills(defaultSkills);
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
bindProjectsModelHover();
loadSkills();
loadProjects();
