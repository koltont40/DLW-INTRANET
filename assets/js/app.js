const quickLinks = [
  {
    name: 'Site Access Tracker',
    description: 'Manage gate codes, site maps, and escort contacts for all DLW towers.',
    category: 'Operations',
    url: 'https://intranet.dixielandwireless.com/site-access',
    credentials: 'VPN + Okta MFA required',
  },
  {
    name: 'Customer Management Portal',
    description: 'View service status, schedule installs, and update customer records.',
    category: 'Customer Care',
    url: 'https://portal.dixielandwireless.com/customers',
    credentials: 'Okta login | Tier 2 and above',
  },
  {
    name: 'Vendor Gateway',
    description: 'Submit purchase orders, track shipments, and coordinate contractors.',
    category: 'Supply Chain',
    url: 'https://vendors.dixielandwireless.com',
    credentials: 'VPN required | Contact Operations for access',
  },
  {
    name: 'Network Monitoring',
    description: 'Realtime health, alarms, and historical performance for the wireless network.',
    category: 'NOC',
    url: 'https://noc.dixielandwireless.com',
    credentials: 'Secure token via Hardware MFA',
  },
  {
    name: 'Tower Compliance Library',
    description: 'Reference safety checklists, environmental docs, and compliance attestations.',
    category: 'Compliance',
    url: 'https://docs.dixielandwireless.com/compliance',
    credentials: 'DLW Google Workspace',
  },
  {
    name: 'Field Technician Dispatch',
    description: 'Assign jobs, review crew availability, and dispatch resources in real time.',
    category: 'Field Ops',
    url: 'https://dispatch.dixielandwireless.com',
    credentials: 'Portal login managed by Dispatch',
  },
];

const dailyMetrics = {
  installs: 12,
  accessRequests: 5,
  tickets: 8,
};

const announcements = [
  {
    title: 'North Ridge Sector Upgrade',
    body: 'A new spectrum allocation is being deployed. Expect maintenance window from 11:00 PM to 3:00 AM.',
    date: '2024-06-04',
  },
  {
    title: 'Install Portal Release 2.4',
    body: 'Tech install portal now supports offline field notes syncing. Update your mobile app before Friday.',
    date: '2024-06-01',
  },
  {
    title: 'New Vendor Escort Policy',
    body: 'All third-party contractors must have updated compliance documentation in the Site Access Tracker.',
    date: '2024-05-28',
  },
];

const knowledgeBaseArticles = [
  {
    title: 'Site Access Request Workflow',
    summary: 'Step-by-step SOP for securing property access and documenting escort approvals.',
    topic: 'Operations',
    url: 'https://docs.dixielandwireless.com/site-access-workflow.pdf',
  },
  {
    title: 'Wireless Install Playbook',
    summary: 'Comprehensive checklist for standard residential and commercial installs.',
    topic: 'Field Ops',
    url: 'https://docs.dixielandwireless.com/install-playbook',
  },
  {
    title: 'Tower Climb Safety Brief',
    summary: 'Safety procedures, PPE requirements, and emergency response for tower climbs.',
    topic: 'Safety',
    url: 'https://docs.dixielandwireless.com/tower-safety-brief',
  },
  {
    title: 'Customer Communication Templates',
    summary: 'Approved messaging for scheduling, rescheduling, and completion follow-ups.',
    topic: 'Customer Care',
    url: 'https://docs.dixielandwireless.com/customer-templates',
  },
  {
    title: 'Install Portal Quick Start',
    summary: 'Guide for onboarding technicians into the tech install portal with role-based tips.',
    topic: 'Technology',
    url: 'https://www.dixielandwireless.com/install-portal/quick-start',
  },
  {
    title: 'Emergency Response Guide',
    summary: 'Escalation paths and contact matrix for outages, safety events, and compliance issues.',
    topic: 'Operations',
    url: 'https://docs.dixielandwireless.com/emergency-response-guide',
  },
];

const credentials = [
  {
    name: 'Site Access Tracker',
    detail: 'URL shared via VPN homepage. Requires Okta MFA and supervisor approval.',
  },
  {
    name: 'Customer Management Portal',
    detail: 'https://portal.dixielandwireless.com — Use your @dixielandwireless.com email.',
  },
  {
    name: 'Vendor Gateway',
    detail: 'Contact vendor-admin@dixielandwireless.com to request access.',
  },
  {
    name: 'Network Monitoring',
    detail: 'Accessible only from NOC. Hardware token required.',
  },
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function renderQuickLinks(list) {
  const container = document.getElementById('quick-links-grid');
  container.innerHTML = '';
  list.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-header">
        <h3>${item.name}</h3>
        <span class="chip">${item.category}</span>
      </div>
      <p>${item.description}</p>
      <div class="card-actions">
        <a href="${item.url}" target="_blank" rel="noopener">Open portal</a>
        <button class="link-button" type="button" data-credentials="${item.name}">Credentials</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderAnnouncements() {
  const container = document.getElementById('announcement-timeline');
  announcements.forEach((item) => {
    const entry = document.createElement('article');
    entry.className = 'timeline-item';
    entry.innerHTML = `
      <span class="timeline-dot" aria-hidden="true"></span>
      <div class="timeline-content">
        <time datetime="${item.date}">${formatDate(item.date)}</time>
        <h3>${item.title}</h3>
        <p>${item.body}</p>
      </div>
    `;
    container.appendChild(entry);
  });
}

function renderKnowledgeBase(list) {
  const container = document.getElementById('kb-grid');
  container.innerHTML = '';
  list.forEach((article) => {
    const card = document.createElement('article');
    card.className = 'kb-card';
    card.innerHTML = `
      <span class="badge">${article.topic}</span>
      <h3>${article.title}</h3>
      <p>${article.summary}</p>
      <a href="${article.url}" target="_blank" rel="noopener">View article</a>
    `;
    container.appendChild(card);
  });
}

function renderCredentials() {
  const list = document.getElementById('credentials-list');
  credentials.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.name}:</strong> ${item.detail}`;
    list.appendChild(li);
  });
}

function setupFiltering() {
  const quickSearch = document.getElementById('quick-search');
  quickSearch.addEventListener('input', () => {
    const value = quickSearch.value.toLowerCase();
    const filtered = quickLinks.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value)
    );
    renderQuickLinks(filtered);
  });

  const kbSearch = document.getElementById('kb-search');
  kbSearch.addEventListener('input', () => {
    const value = kbSearch.value.toLowerCase();
    const filtered = knowledgeBaseArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(value) ||
        article.summary.toLowerCase().includes(value) ||
        article.topic.toLowerCase().includes(value)
    );
    renderKnowledgeBase(filtered);
  });
}

function setupModal() {
  const modal = document.getElementById('login-modal');
  const closeButtons = modal.querySelectorAll('[data-close-modal]');

  const openModal = () => {
    modal.hidden = false;
    modal.querySelector('.modal-content').focus();
  };

  const closeModal = () => {
    modal.hidden = true;
  };

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-credentials]');
    if (button) {
      event.preventDefault();
      openModal();
    }
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}

function updateFooterYear() {
  const year = new Date().getFullYear();
  document.getElementById('footer-year').textContent = year;
}

function updateHeroMetrics() {
  const installs = document.getElementById('install-count');
  const access = document.getElementById('access-count');
  const tickets = document.getElementById('ticket-count');

  if (installs) installs.textContent = dailyMetrics.installs;
  if (access) access.textContent = dailyMetrics.accessRequests;
  if (tickets) tickets.textContent = dailyMetrics.tickets;
}

function init() {
  renderQuickLinks(quickLinks);
  renderAnnouncements();
  renderKnowledgeBase(knowledgeBaseArticles);
  renderCredentials();
  setupFiltering();
  setupModal();
  updateFooterYear();
  updateHeroMetrics();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
