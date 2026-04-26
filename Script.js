// ==================== TODAS LAS FUNCIONALIDADES ====================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Active nav links
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        current = sec.getAttribute('id') || '';
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // 3. Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('active');
    });
  }
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('active');
    });
  });

  // 4. Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 5. Scroll Reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // 6. Partículas flotantes
  function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    particlesContainer.innerHTML = '';
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();

  // 7. Video Modal
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  const closeVideoModal = document.querySelector('#videoModal .modal-close');
  const videoThumbnails = document.querySelectorAll('.video-thumbnail-container');
  
  videoThumbnails.forEach(container => {
    const thumbnail = container.querySelector('.video-thumbnail');
    thumbnail.addEventListener('click', () => {
      const videoId = container.getAttribute('data-video-id');
      if (videoIframe) {
        videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
      videoModal.style.display = 'flex';
    });
  });
  
  if (closeVideoModal) {
    closeVideoModal.onclick = () => {
      videoModal.style.display = 'none';
      if (videoIframe) videoIframe.src = '';
    };
  }

  // 8. Reading Modal
  const readingModal = document.getElementById('readingModal');
  const readingModalBody = document.getElementById('readingModalBody');
  const closeReadingModal = document.querySelector('#readingModal .modal-close-reading');
  
  function openReadingModal(title, content) {
    if (readingModal && readingModalBody) {
      readingModalBody.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: var(--primary);">📖 ${title}</h3>
        <div style="line-height: 1.6;">${content}</div>
      `;
      readingModal.style.display = 'flex';
    }
  }
  
  document.querySelectorAll('.btn-reading').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const content = btn.getAttribute('data-content');
      openReadingModal(title, content);
    });
  });
  
  if (closeReadingModal) {
    closeReadingModal.onclick = () => {
      readingModal.style.display = 'none';
    };
  }

  // 9. Modo Oscuro/Claro
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // 10. PDF Descargables con jsPDF
  async function generatePDF(weekNumber, title) {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Configurar fuente
      doc.setFont('helvetica');
      
      // Colores
      const primaryColor = [30, 58, 95];
      const accentColor = [0, 180, 216];
      const textColor = [51, 65, 85];
      
      // Título principal
      doc.setFontSize(22);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(title, 20, 25);
      
      // Línea decorativa
      doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.setLineWidth(0.5);
      doc.line(20, 30, 190, 30);
      
      // Información del curso
      doc.setFontSize(10);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(`Universidad Peruana Los Andes`, 20, 40);
      doc.text(`Curso: Gerencia de Sistemas de Información`, 20, 48);
      doc.text(`Docente: Dr. Magno Teofilo Baldeon Tovar`, 20, 56);
      doc.text(`Ciclo: VII - 2026-I`, 20, 64);
      doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 72);
      
      // Contenido de la semana
      doc.setFontSize(14);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`📚 Contenido de la Semana ${weekNumber}`, 20, 90);
      
      doc.setFontSize(11);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      
      const weekContents = {
        1: {
          objective: "Comprender el rol estratégico de la información y los sistemas de información en las organizaciones modernas.",
          topics: [
            "La información como recurso estratégico: Diferencia entre dato, información y conocimiento.",
            "Componentes de los Sistemas de Información: Hardware, software, datos, personas y procesos.",
            "Tipos de Sistemas de Información: TPS, MIS, DSS, EIS, KMS.",
            "Arquitectura empresarial: Frameworks TOGAF y Zachman. Gobierno de TI (COBIT)."
          ]
        },
        2: {
          objective: "Diferenciar los modelos de servicio y despliegue en cloud computing.",
          topics: [
            "Definición y características esenciales (NIST): Autoservicio, elasticidad.",
            "Modelos de despliegue: Pública, privada, híbrida, comunitaria.",
            "Modelos de servicio: IaaS, PaaS, SaaS.",
            "TCO y estrategias: CapEx vs OpEx, FinOps."
          ]
        },
        3: {
          objective: "Identificar las funciones clave de la administración cloud y herramientas DevOps.",
          topics: [
            "Ciclo de administración: Aprovisionamiento, monitoreo, escalado.",
            "Gestión de identidades y accesos (IAM): MFA, roles y políticas.",
            "FinOps: Monitoreo, alertas, control de costos.",
            "Contenedores: Docker y Kubernetes."
          ]
        },
        4: {
          objective: "Analizar los componentes de la infraestructura de TI y su evolución.",
          topics: [
            "Componentes: Servidores, almacenamiento, redes.",
            "Evolución: Mainframe → Cloud → Edge.",
            "Virtualización: VMware, Hyper-V, contenedores.",
            "Gestión ITIL: BCP, DRP, monitoreo."
          ]
        },
        5: {
          objective: "Evaluar el impacto de los SI en los procesos de negocio.",
          topics: [
            "SI en áreas funcionales: Ventas, finanzas, RRHH.",
            "BI y Data Warehouse: ETL, OLAP, Power BI.",
            "Aplicaciones: CRM, SCM, ERP.",
            "Minería de datos: Algoritmos, dashboards."
          ]
        }
      };
      
      const content = weekContents[weekNumber] || weekContents[1];
      
      // Objetivo
      doc.setFontSize(12);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`🎯 Objetivo de aprendizaje`, 20, 105);
      
      doc.setFontSize(10);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      const objectiveLines = doc.splitTextToSize(content.objective, 160);
      doc.text(objectiveLines, 20, 115);
      
      let yPosition = 125 + (objectiveLines.length * 5);
      
      // Temas
      doc.setFontSize(12);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`📖 Temas desarrollados`, 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      
      for (let i = 0; i < content.topics.length; i++) {
        const topicLines = doc.splitTextToSize(`• ${content.topics[i]}`, 165);
        doc.text(topicLines, 20, yPosition);
        yPosition += (topicLines.length * 5) + 3;
        
        if (yPosition > 260) {
          doc.addPage();
          yPosition = 20;
        }
      }
      
      // Actividades
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`📝 Actividades sugeridas`, 20, yPosition + 5);
      yPosition += 15;
      
      doc.setFontSize(10);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      const activities = [
        "Revisar el video de la semana disponible en la plataforma",
        "Completar la lectura complementaria recomendada",
        "Realizar el cuestionario de autoevaluación",
        "Participar en el foro de discusión"
      ];
      
      for (const activity of activities) {
        const activityLines = doc.splitTextToSize(`✓ ${activity}`, 165);
        doc.text(activityLines, 20, yPosition);
        yPosition += (activityLines.length * 5) + 2;
      }
      
      // Footer
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.line(20, 275, 190, 275);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text("Documento generado desde la plataforma GSI UPLA", 105, 285, { align: "center" });
      doc.text("© 2026 Universidad Peruana Los Andes - Ingeniería de Sistemas", 105, 292, { align: "center" });
      
      // Guardar PDF
      doc.save(`Semana_${weekNumber}_${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
      
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta de nuevo.');
    }
  }
  
  document.querySelectorAll('.btn-pdf').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const weekNumber = btn.getAttribute('data-week');
      const title = btn.getAttribute('data-title');
      await generatePDF(weekNumber, title);
    });
  });

  // 11. Progreso Dinámico
  const weeksData = [
    { name: "Semana 1: La Información en la Empresa", percent: 20, checked: false },
    { name: "Semana 2: Computación en la Nube", percent: 20, checked: false },
    { name: "Semana 3: Administración en la Nube", percent: 20, checked: false },
    { name: "Semana 4: Infraestructura de TI", percent: 20, checked: false },
    { name: "Semana 5: SI en los Negocios", percent: 20, checked: false }
  ];
  const totalPercent = 100;

  function loadProgress() {
    const saved = localStorage.getItem('gsi_progress_v6');
    if (saved) {
      const checkedStates = JSON.parse(saved);
      weeksData.forEach((week, idx) => {
        if (checkedStates[idx]) week.checked = true;
      });
    }
    renderProgressList();
    updateOverallProgress();
    syncWeekCardChecks();
  }

  function saveProgress() {
    const states = weeksData.map(w => w.checked);
    localStorage.setItem('gsi_progress_v6', JSON.stringify(states));
  }

  function renderProgressList() {
    const container = document.getElementById('weeksProgressList');
    if (!container) return;
    container.innerHTML = '';
    
    weeksData.forEach((week, idx) => {
      const item = document.createElement('div');
      item.className = 'week-progress-item';
      const checkedClass = week.checked ? 'checked' : '';
      item.innerHTML = `
        <div class="check ${checkedClass}" data-index="${idx}">
          <i class="fa-regular ${week.checked ? 'fa-circle-check' : 'fa-square'}"></i>
        </div>
        <div class="week-name">${week.name}</div>
        <div class="week-bar"><div class="week-fill" style="width: ${week.checked ? '100%' : '0%'}"></div></div>
        <div class="week-percent">${week.checked ? '100%' : '0%'}</div>
      `;
      const checkDiv = item.querySelector('.check');
      checkDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        weeksData[idx].checked = !weeksData[idx].checked;
        saveProgress();
        renderProgressList();
        updateOverallProgress();
        syncWeekCardChecks();
      });
      container.appendChild(item);
    });
  }

  function updateOverallProgress() {
    let completedPercent = 0;
    weeksData.forEach(week => {
      if (week.checked) completedPercent += week.percent;
    });
    const finalPercent = (completedPercent / totalPercent) * 100;
    const fillElem = document.getElementById('overallFill');
    const percentElem = document.getElementById('overallPercent');
    if (fillElem) fillElem.style.width = `${finalPercent}%`;
    if (percentElem) percentElem.innerText = `${Math.round(finalPercent)}%`;
  }

  function syncWeekCardChecks() {
    const weekCards = document.querySelectorAll('.week-card');
    weekCards.forEach((card, idx) => {
      if (idx < weeksData.length) {
        const checkIcon = card.querySelector('.progress-check i');
        const percentSpan = card.querySelector('.progress-percent');
        if (weeksData[idx].checked) {
          if (checkIcon) checkIcon.className = 'fa-regular fa-circle-check';
          if (percentSpan) percentSpan.textContent = '100%';
        } else {
          if (checkIcon) checkIcon.className = 'fa-regular fa-square';
          if (percentSpan) percentSpan.textContent = '0%';
        }
      }
    });
  }

  function initWeekCardChecks() {
    const weekCards = document.querySelectorAll('.week-card');
    weekCards.forEach((card, idx) => {
      const checkSpan = card.querySelector('.progress-check');
      if (checkSpan && idx < weeksData.length) {
        checkSpan.style.cursor = 'pointer';
        checkSpan.addEventListener('click', (e) => {
          e.stopPropagation();
          weeksData[idx].checked = !weeksData[idx].checked;
          saveProgress();
          renderProgressList();
          updateOverallProgress();
          syncWeekCardChecks();
        });
      }
    });
  }

  loadProgress();
  initWeekCardChecks();

  // 12. Calendario Interactivo
  let currentDate = new Date();
  const events = [
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15), title: "Examen Parcial", type: "examen" },
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 22), title: "Entrega Trabajo Grupal", type: "entrega" },
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 30), title: "Webinar: Tendencias Cloud", type: "webinar" },
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 10), title: "Entrega Avance Proyecto", type: "entrega" },
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 20), title: "Examen Final", type: "examen" },
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 1), title: "Feedback Final", type: "entrega" }
  ];

  function renderCalendar() {
    const monthYear = document.getElementById('monthYear');
    const calendarDays = document.getElementById('calendarDays');
    const upcomingEvents = document.getElementById('upcomingEvents');
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayIndex = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    monthYear.textContent = `${monthNames[month]} ${year}`;
    
    calendarDays.innerHTML = '';
    
    for (let i = 0; i < startingDayIndex; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'calendar-day other-month';
      calendarDays.appendChild(emptyDay);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day';
      dayElement.textContent = day;
      
      const currentDayDate = new Date(year, month, day);
      const today = new Date();
      if (currentDayDate.toDateString() === today.toDateString()) {
        dayElement.classList.add('today');
      }
      
      const hasEvent = events.some(event => 
        event.date.getFullYear() === year && 
        event.date.getMonth() === month && 
        event.date.getDate() === day
      );
      if (hasEvent) {
        dayElement.classList.add('event');
      }
      
      calendarDays.appendChild(dayElement);
    }
    
    const now = new Date();
    const upcoming = events
      .filter(event => event.date > now)
      .sort((a, b) => a.date - b.date)
      .slice(0, 5);
    
    upcomingEvents.innerHTML = upcoming.map(event => `
      <div class="event-item">
        <div class="event-date">${event.date.toLocaleDateString()}</div>
        <div class="event-title">${event.title}</div>
        <div class="event-type ${event.type}">${event.type === 'examen' ? 'Examen' : event.type === 'entrega' ? 'Entrega' : 'Webinar'}</div>
      </div>
    `).join('');
    
    if (upcoming.length === 0) {
      upcomingEvents.innerHTML = '<p style="color: var(--gray-600);">No hay eventos próximos</p>';
    }
  }
  
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
  }
  
  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  }
  
  renderCalendar();

  // 13. Cerrar modales
  window.onclick = (e) => {
    if (e.target === videoModal) {
      videoModal.style.display = 'none';
      if (videoIframe) videoIframe.src = '';
    }
    if (e.target === readingModal) {
      readingModal.style.display = 'none';
    }
  };
  
});