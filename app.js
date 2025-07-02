// Navegación visual entre pantallas
const loginPage = document.getElementById('login-page');
const projectPage = document.getElementById('project-page');
const mainApp = document.getElementById('main-app');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');
const projectBtns = document.querySelectorAll('.project-btn');
const sidebarItems = document.querySelectorAll('#sidebar nav ul li');
const sections = document.querySelectorAll('.section');

// Login visual
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (usernameInput.value === 'admin' && passwordInput.value === 'admin') {
    loginPage.classList.add('hidden');
    projectPage.classList.remove('hidden');
  } else {
    passwordInput.value = '';
    usernameInput.value = '';
    passwordInput.placeholder = 'Contraseña incorrecta';
    usernameInput.placeholder = 'Usuario incorrecto';
    passwordInput.classList.add('error');
    usernameInput.classList.add('error');
    setTimeout(() => {
      passwordInput.placeholder = 'Contraseña';
      usernameInput.placeholder = 'Usuario';
      passwordInput.classList.remove('error');
      usernameInput.classList.remove('error');
    }, 1200);
  }
});

// Selección de proyecto
projectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    projectPage.classList.add('hidden');
    if (btn.dataset.project === 'salud') {
      mainApp.classList.remove('hidden');
    } else {
      // Para los otros proyectos, solo mostramos un mensaje visual
      alert('Solo está implementado visualmente el apartado de Servicio Aragonés de Salud y Carrera.');
      loginPage.classList.remove('hidden');
    }
  });
});

// Navegación lateral
sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    sidebarItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const section = item.dataset.section;
    sections.forEach(sec => {
      if (sec.id === 'section-' + section) {
        sec.classList.remove('hidden');
      } else {
        sec.classList.add('hidden');
      }
    });
  });
});

// Drag visual para méritos (solo visual)
const meritoCards = document.querySelectorAll('.merito-card');
let dragged = null;
meritoCards.forEach(card => {
  card.addEventListener('dragstart', (e) => {
    dragged = card;
    setTimeout(() => card.classList.add('hidden'), 0);
  });
  card.addEventListener('dragend', (e) => {
    card.classList.remove('hidden');
    dragged = null;
  });
  card.addEventListener('dragover', (e) => e.preventDefault());
  card.addEventListener('drop', (e) => {
    e.preventDefault();
    if (dragged && dragged !== card) {
      const parent = card.parentNode;
      parent.insertBefore(dragged, card.nextSibling);
    }
  });
});

// Drag and drop visual para validación de documentos
const dropzone = document.querySelector('.dropzone');
const docList = document.querySelector('.doc-list');
if (dropzone) {
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.background = '#d0e2ff';
  });
  dropzone.addEventListener('dragleave', (e) => {
    dropzone.style.background = '';
  });
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.style.background = '';
    // Visualmente añadimos "documentos validados" con icono y diseño
    const fakeDoc = document.createElement('li');
    fakeDoc.innerHTML = '<span class="doc-icon">✔️</span> Documento validado';
    docList.appendChild(fakeDoc);
  });
}

// Administración: tabs visuales
const adminTabs = document.querySelectorAll('.admin-tab');
const adminPanels = {
  usuarios: document.getElementById('admin-usuarios'),
  documentos: document.getElementById('admin-documentos'),
  prompts: document.getElementById('admin-prompts'),
  plantillas: document.getElementById('admin-plantillas'),
};
adminTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    adminTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    Object.keys(adminPanels).forEach(key => {
      adminPanels[key].classList.add('hidden');
    });
    adminPanels[tab.dataset.tab].classList.remove('hidden');
  });
}); 