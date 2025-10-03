const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const yearEl = document.getElementById('current-year');
const skillsGrid = document.getElementById('skills-grid');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
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
    skillsGrid.innerHTML = '<p class="skills-error">Update <code>assets/data/skills.json</code> to list your current skills.</p>';
  }
}

function renderSkills(skills) {
  if (!Array.isArray(skills)) return;
  skillsGrid.innerHTML = skills
    .map((skill) => {
      const { name, level, description } = skill;
      return `
        <article class="skill-item" role="listitem">
          <h3>${name ?? 'Skill'}</h3>
          ${level ? `<span class="skill-level">${level}</span>` : ''}
          ${description ? `<p>${description}</p>` : ''}
        </article>
      `;
    })
    .join('');
}

loadSkills();