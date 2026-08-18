document.addEventListener("DOMContentLoaded", () => {
  // 1. Cargar Configuración General en el DOM
  setupGeneralConfig();

  // 2. Inicializar el Modal de Detalles (Móvil)
  initModal();

  // 3. Renderizar Contenido Dinámico con un delay de 400ms para mostrar la animación de skeleton
  // y asegurar estabilidad visual contra el Cumulative Layout Shift (CLS)
  setTimeout(() => {
    renderAllSections();
    // 4. Inicializar Componentes de Interacción tras el renderizado
    initTabs();
    initBuscador();
  }, 400);
});

// --- RENDERIZADO DE COMPONENTES ---

function setupGeneralConfig() {
  const cfg = window.CONFIG;
  if (!cfg) return;

  // Botón flotante WhatsApp
  const waFlotante = document.querySelector(".wa-flotante");
  if (waFlotante) {
    const msg = encodeURIComponent(cfg.mensajeWhatsAppGeneral);
    waFlotante.href = `https://wa.me/${cfg.telefonoWhatsApp}?text=${msg}`;
    const tooltip = waFlotante.querySelector(".wa-tooltip");
    if (tooltip) tooltip.textContent = cfg.tooltipWhatsApp;
  }

  // Enlace WhatsApp en el Header/Topbar
  const topbarWa = document.querySelector(".topbar-wa");
  if (topbarWa) {
    const msg = encodeURIComponent(cfg.mensajeWhatsAppGeneral);
    topbarWa.href = `https://wa.me/${cfg.telefonoWhatsApp}?text=${msg}`;
  }

  // Footer text
  const footerTexto = document.querySelector(".footer-texto");
  if (footerTexto) {
    footerTexto.textContent = cfg.pieDePagina;
  }
}

function renderAllSections() {
  const data = window.PERFUMES_DATA;
  if (!data) return;

  // Actualizar los badges de navegación con el conteo real
  const badgeVarones = document.querySelector('[data-tab="varones"] .tab-badge');
  if (badgeVarones) badgeVarones.textContent = data.varones.length;

  const badgeDamas = document.querySelector('[data-tab="damas"] .tab-badge');
  if (badgeDamas) badgeDamas.textContent = data.damas.length;

  const badgeOfertas = document.querySelector('[data-tab="ofertas"] .tab-badge');
  if (badgeOfertas) badgeOfertas.textContent = data.ofertas.length;

  // Renderizar catálogo de Varones
  const varonesGrid = document.getElementById("catalogo-grid-varones");
  if (varonesGrid) {
    varonesGrid.innerHTML = data.varones.map(createCardHTML).join("");
    // Agregar div de "Sin resultados" al final del grid de varones
    varonesGrid.innerHTML += `
      <div class="no-resultados" id="no-resultados-varones">
        <p>No se encontraron fragancias para tu búsqueda.</p>
      </div>
    `;
  }

  // Renderizar catálogo de Damas (Yum Yum destacado + posibles otros perfumes)
  const panelDamas = document.getElementById("panel-damas");
  if (panelDamas) {
    let damasHTML = `
      <div class="seccion-header">
        <div class="seccion-header-left">
          <p class="seccion-etiqueta">Colección Femenina</p>
          <h2 class="seccion-titulo">Catálogo <em>Damas</em></h2>
        </div>
        <span class="seccion-conteo">${data.damas.length} fragancia${data.damas.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="separador"></div>
    `;

    // Buscar destacado del mes
    const destacado = data.damas.find(p => p.esDestacado);
    if (destacado) {
      const waText = encodeURIComponent(`Hola, estoy interesado en el perfume ${destacado.marca} ${destacado.nombre}`);
      const waUrl = `https://wa.me/${window.CONFIG.telefonoWhatsApp}?text=${waText}`;
      
      damasHTML += `
        <section class="destacado-perfume" style="padding-top: 40px;">
          <div class="destacado-inner">
            <div class="destacado-img-wrap">
              <div class="destacado-img-brillo"></div>
              <img src="${destacado.imagen}" alt="${destacado.nombre}" onerror="this.src='https://fimgs.net/mdimg/perfume/375x500.77898.jpg';this.onerror=null;">
            </div>
            <div class="destacado-texto">
              <span class="destacado-badge">${destacado.badgeTexto}</span>
              <h2 class="destacado-nombre">
                ${destacado.marca}
                <em>${destacado.nombre}</em>
              </h2>
              <div class="destacado-precio-highlight">
                <span class="destacado-precio-desde">Desde</span>
                <span class="destacado-precio-num">${destacado.precioDesde}</span>
                <span class="destacado-precio-mon">Bs</span>
              </div>
              <div class="destacado-sep"></div>
              <p class="destacado-item"><strong>Notas:</strong> ${destacado.notas}</p>
              <p class="destacado-item"><strong>Sensación:</strong> ${destacado.sensacion}</p>
              <p class="destacado-item"><strong>Ocasiones:</strong> ${destacado.ocasiones}</p>
              <p class="destacado-item"><strong>Duración:</strong> ${destacado.duracion}</p>
              
              <div class="destacado-precios">
                ${destacado.precios.map(p => `
                  <div class="destacado-precio">
                    <p class="ml">${p.size.toUpperCase()}</p>
                    <p class="bs">${p.valor} <small style="font-size:13px;color:var(--dorado)">Bs</small></p>
                  </div>
                `).join('')}
              </div>
              
              <a href="${waUrl}" class="btn-whatsapp" target="_blank" rel="noopener" style="max-width:200px">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.535 5.845L.057 23.428a.5.5 0 0 0 .515.572l5.725-1.5A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.157-1.42l-.369-.218-3.4.892.907-3.312-.24-.382A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Quiero Este
              </a>
            </div>
          </div>
        </section>
      `;
    }

    // Agregar otros perfumes de damas si existieran en formato grid
    const otrosDamas = data.damas.filter(p => !p.esDestacado);
    if (otrosDamas.length > 0) {
      damasHTML += `
        <div class="catalogo-grid">
          ${otrosDamas.map(createCardHTML).join("")}
        </div>
      `;
    }

    panelDamas.innerHTML = damasHTML;
  }

  // Renderizar catálogo de Ofertas (YSL MYSLF EDP destacado + posibles otros)
  const panelOfertas = document.getElementById("panel-ofertas");
  if (panelOfertas) {
    let ofertasHTML = `
      <div class="seccion-header">
        <div class="seccion-header-left">
          <p class="seccion-etiqueta">Promociones Especiales</p>
          <h2 class="seccion-titulo">Ofertas <em>de la Semana</em></h2>
        </div>
        <span class="seccion-conteo">${data.ofertas.length} oferta${data.ofertas.length !== 1 ? 's' : ''} activa${data.ofertas.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="separador"></div>
    `;

    data.ofertas.forEach(oferta => {
      const waText = encodeURIComponent(`Hola, estoy interesado en la oferta de ${oferta.marca} ${oferta.nombre}`);
      const waUrl = `https://wa.me/${window.CONFIG.telefonoWhatsApp}?text=${waText}`;

      ofertasHTML += `
        <section class="oferta-semana">
          <div class="oferta-inner">
            <div class="oferta-texto">
              <p class="oferta-etiqueta">Oferta de la Semana</p>
              <h2 class="oferta-bajada">${oferta.marca}<br><em>${oferta.nombre}</em></h2>
              <div class="oferta-tag">${oferta.tag}</div>
              <p class="oferta-desc">${oferta.desc}</p>
              
              <div class="oferta-precios">
                ${oferta.precios.map(p => `
                  <div class="oferta-precio-item">
                    <p class="oferta-precio-ml">${p.size.toUpperCase()}</p>
                    <p class="oferta-precio-valor"><span>Bs </span>${p.valor}</p>
                  </div>
                `).join('')}
              </div>
              
              <a href="${waUrl}" class="btn-whatsapp" target="_blank" rel="noopener" style="max-width:220px">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.535 5.845L.057 23.428a.5.5 0 0 0 .515.572l5.725-1.5A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.157-1.42l-.369-.218-3.4.892.907-3.312-.24-.382A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Aprovechar Oferta
              </a>
            </div>
            <div class="oferta-imagen-wrap">
              <img src="${oferta.imagen}" alt="${oferta.nombre}" onerror="this.src='https://fimgs.net/mdimg/perfume/375x500.77898.jpg';this.onerror=null;">
            </div>
          </div>
        </section>
      `;
    });

    panelOfertas.innerHTML = ofertasHTML;
  }
}

function createCardHTML(perfume) {
  const preciosHTML = perfume.precios.map(p => `
    <div class="precio-ml-item">
      <div class="precio-ml-size">${p.size}</div>
      <div class="precio-ml-val"><span>Bs </span>${p.valor}</div>
    </div>
  `).join("");

  const waText = encodeURIComponent(`Hola, estoy interesado en ${perfume.marca} ${perfume.nombre}`);
  const waUrl = `https://wa.me/${window.CONFIG.telefonoWhatsApp}?text=${waText}`;

  return `
    <div class="card" data-nombre="${perfume.dataNombre}">
      <div class="card-imagen">
        <img src="${perfume.imagen}" alt="${perfume.nombre}" loading="lazy" onerror="this.classList.add('img-error')">
        <div class="img-fallback"><span>${perfume.nombre}</span></div>
      </div>
      <div class="card-info">
        <span class="card-marca">${perfume.marca}</span>
        <h3 class="card-nombre">${perfume.nombre}</h3>
        <div class="card-precio-destacado">
          <span class="precio-destacado-desde">Desde</span>
          <span class="precio-destacado-valor"><span class="precio-destacado-moneda">Bs </span>${perfume.precioDesde}</span>
        </div>
        <div class="card-divider"></div>
        <div class="card-detalles">
          <p class="card-detalle"><strong>Notas:</strong> ${perfume.notas}</p>
          <p class="card-detalle"><strong>Sensación:</strong> ${perfume.sensacion}</p>
          <p class="card-detalle"><strong>Ocasiones:</strong> ${perfume.ocasiones}</p>
        </div>
        <span class="card-duracion">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          ${perfume.duracion}
        </span>
        <div class="card-precios-ml">
          ${preciosHTML}
        </div>
        <a href="${waUrl}" class="btn-whatsapp" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.535 5.845L.057 23.428a.5.5 0 0 0 .515.572l5.725-1.5A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.157-1.42l-.369-.218-3.4.892.907-3.312-.24-.382A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  `;
}

// --- LOGICA DE PESTAÑAS (TABS) ---

function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      // Desactivar todos
      tabBtns.forEach(b => b.classList.remove("activo"));
      tabPanels.forEach(p => p.classList.remove("activo"));

      // Activar el seleccionado
      btn.classList.add("activo");
      const targetPanel = document.getElementById("panel-" + target);
      if (targetPanel) targetPanel.classList.add("activo");

      // Limpiar buscador si cambiamos de tab
      if (target !== "varones") {
        const inputBuscador = document.getElementById("buscador");
        if (inputBuscador) {
          inputBuscador.value = "";
          resetBuscador();
        }
      }

      // Scroll suave al catálogo
      const catalogoEl = document.getElementById("catalogo");
      if (catalogoEl) {
        catalogoEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// --- LOGICA DEL BUSCADOR ---

let searchInput, cards, conteoResultados, noResultadosDiv, totalFraganciasCount;

function initBuscador() {
  searchInput = document.getElementById("buscador");
  conteoResultados = document.getElementById("conteo-resultados");
  noResultadosDiv = document.getElementById("no-resultados-varones");
  
  if (!searchInput) return;

  // Cachear los cards creados dinámicamente
  cards = document.querySelectorAll("#catalogo-grid-varones .card");
  totalFraganciasCount = window.PERFUMES_DATA.varones.length;

  searchInput.addEventListener("input", function () {
    // Si no estamos en la tab de varones, cambiar a ella primero
    const panelVarones = document.getElementById("panel-varones");
    if (!panelVarones.classList.contains("activo")) {
      const tabBtns = document.querySelectorAll(".tab-btn");
      const tabPanels = document.querySelectorAll(".tab-panel");
      
      tabBtns.forEach(b => b.classList.remove("activo"));
      tabPanels.forEach(p => p.classList.remove("activo"));
      
      const tabVaronesBtn = document.querySelector('[data-tab="varones"]');
      if (tabVaronesBtn) tabVaronesBtn.classList.add("activo");
      panelVarones.classList.add("activo");
    }

    const q = this.value.toLowerCase().trim();
    let visibles = 0;

    cards.forEach(card => {
      const nombre = card.getAttribute("data-nombre").toLowerCase();
      if (!q || nombre.includes(q)) {
        card.classList.remove("hidden");
        visibles++;
      } else {
        card.classList.add("hidden");
      }
    });

    if (conteoResultados) {
      conteoResultados.textContent = q 
        ? `${visibles} resultado${visibles !== 1 ? "s" : ""}` 
        : `${totalFraganciasCount} fragancias`;
    }

    if (noResultadosDiv) {
      noResultadosDiv.classList.toggle("visible", visibles === 0);
    }
  });
}

function resetBuscador() {
  if (!cards) cards = document.querySelectorAll("#catalogo-grid-varones .card");
  
  cards.forEach(card => card.classList.remove("hidden"));
  
  if (conteoResultados) {
    conteoResultados.textContent = `${totalFraganciasCount} fragancias`;
  }
  
  if (noResultadosDiv) {
    noResultadosDiv.classList.remove("visible");
  }
}

// --- LOGICA DEL MODAL DE DETALLES (MÓVIL) ---

function initModal() {
  const modal = document.getElementById("modal-detalle");
  const cerrarBtn = document.getElementById("modal-cerrar-btn");
  const cerrarOverlay = document.getElementById("modal-cerrar-overlay");

  function cerrarModal() {
    if (modal) {
      modal.classList.remove("activo");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = ""; // Reactivar scroll
    }
  }

  if (cerrarBtn) cerrarBtn.addEventListener("click", cerrarModal);
  if (cerrarOverlay) cerrarOverlay.addEventListener("click", cerrarModal);

  // Escuchar clics en tarjetas para abrir el modal (solo en versión móvil/tablet)
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      const card = e.target.closest(".catalogo-grid .card");
      if (card) {
        const dataNombre = card.getAttribute("data-nombre");
        let perfumeFound = null;
        
        const data = window.PERFUMES_DATA;
        if (!data) return;
        
        const allPerfumes = [
          ...(data.varones || []),
          ...(data.damas || []),
          ...(data.ofertas || [])
        ];
        
        perfumeFound = allPerfumes.find(p => p.dataNombre === dataNombre);
        
        if (!perfumeFound) {
          const cardNombre = card.querySelector(".card-nombre")?.textContent.trim();
          perfumeFound = allPerfumes.find(p => p.nombre === cardNombre);
        }

        if (perfumeFound) {
          openDetailModal(perfumeFound);
        }
      }
    }
  });
}

function openDetailModal(perfume) {
  const modal = document.getElementById("modal-detalle");
  const modalContenido = document.getElementById("modal-detalle-contenido");
  if (!modal || !modalContenido) return;

  const preciosHTML = perfume.precios ? perfume.precios.map(p => `
    <div class="modal-precios-ml-card">
      <div class="modal-precios-ml-card-size">${p.size}</div>
      <div class="modal-precios-ml-card-val">Bs ${p.valor}</div>
    </div>
  `).join("") : "";

  const waText = encodeURIComponent(`Hola, estoy interesado en el perfume ${perfume.marca} ${perfume.nombre}`);
  const waUrl = `https://wa.me/${window.CONFIG.telefonoWhatsApp}?text=${waText}`;

  const notasText = perfume.notas ? perfume.notas : "No especificado";
  const sensacionText = perfume.sensacion ? perfume.sensacion : "No especificado";
  const ocasionesText = perfume.ocasiones ? perfume.ocasiones : "No especificado";
  const duracionText = perfume.duracion ? perfume.duracion : "No especificado";

  modalContenido.innerHTML = `
    <div class="modal-perfume-header">
      <div class="modal-perfume-img-wrap">
        <img src="${perfume.imagen}" alt="${perfume.nombre}" onerror="this.src='https://fimgs.net/mdimg/perfume/375x500.77898.jpg';this.onerror=null;">
      </div>
      <span class="modal-perfume-marca">${perfume.marca}</span>
      <h3 class="modal-perfume-nombre">${perfume.nombre}</h3>
    </div>

    ${perfume.precioDesde ? `
    <div class="modal-precio-destacado">
      <span class="modal-precio-destacado-label">Desde</span>
      <span class="modal-precio-destacado-val">Bs ${perfume.precioDesde}</span>
    </div>
    ` : ""}

    <div class="modal-section-title">Detalles de la Fragancia</div>
    <div class="modal-desc-list">
      <div class="modal-desc-item"><strong>Notas:</strong> ${notasText}</div>
      <div class="modal-desc-item"><strong>Sensación:</strong> ${sensacionText}</div>
      <div class="modal-desc-item"><strong>Ocasiones:</strong> ${ocasionesText}</div>
      <div class="modal-desc-item"><strong>Duración:</strong> ${duracionText}</div>
    </div>

    ${preciosHTML ? `
    <div class="modal-section-title">Precios por Tamaño (Decants)</div>
    <div class="modal-precios-ml-grid">
      ${preciosHTML}
    </div>
    ` : ""}

    <a href="${waUrl}" class="modal-btn-wa" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.535 5.845L.057 23.428a.5.5 0 0 0 .515.572l5.725-1.5A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.157-1.42l-.369-.218-3.4.892.907-3.312-.24-.382A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
      Consultar por WhatsApp
    </a>
  `;

  modal.classList.add("activo");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Bloquear scroll en body
}
