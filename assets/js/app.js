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
      const waText = encodeURIComponent(`Hola, estoy interesado en el decant de 10ml de ${destacado.marca} ${destacado.nombre}`);
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
              
              <div class="destacado-precio-10ml-box">
                <span class="destacado-10ml-tag">DECANT 10 ML</span>
                <div class="destacado-10ml-val">
                  ${destacado.precioDesde} <small>Bs</small>
                </div>
              </div>

              <div class="destacado-sep"></div>
              <p class="destacado-item"><strong>Notas:</strong> ${destacado.notas}</p>
              <p class="destacado-item"><strong>Sensación:</strong> ${destacado.sensacion}</p>
              <p class="destacado-item"><strong>Ocasiones:</strong> ${destacado.ocasiones}</p>
              <p class="destacado-item"><strong>Duración:</strong> ${destacado.duracion}</p>
              
              <a href="${waUrl}" class="btn-whatsapp" target="_blank" rel="noopener" style="max-width:220px; margin-top:24px;">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.535 5.845L.057 23.428a.5.5 0 0 0 .515.572l5.725-1.5A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.157-1.42l-.369-.218-3.4.892.907-3.312-.24-.382A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Pedir 10ml por WhatsApp
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
        <div class="catalogo-grid" id="catalogo-grid-damas">
          ${otrosDamas.map(createCardHTML).join("")}
          <div class="no-resultados" id="no-resultados-damas">
            <p>No se encontraron fragancias para tu búsqueda.</p>
          </div>
        </div>
      `;
    }

    panelDamas.innerHTML = damasHTML;
  }

  // Renderizar catálogo de Ofertas (Combos & Promociones Especiales)
  const panelOfertas = document.getElementById("panel-ofertas");
  if (panelOfertas) {
    let ofertasHTML = `
      <div class="seccion-header">
        <div class="seccion-header-left">
          <p class="seccion-etiqueta">Packs Especiales & Promociones</p>
          <h2 class="seccion-titulo">Combos <em>& Ofertas Exclusivas</em></h2>
        </div>
        <span class="seccion-conteo">${data.ofertas.length} combos & ofertas activas</span>
      </div>
      <div class="separador"></div>
    `;

    // Hero Offer Banner (Combo Pa' Los Manes)
    const heroOferta = data.ofertas.find(o => o.id === "combo-pa-los-manes") || data.ofertas[0];
    if (heroOferta) {
      const waText = encodeURIComponent(`Hola, estoy interesado en el ${heroOferta.nombre}`);
      const waUrl = `https://wa.me/${window.CONFIG.telefonoWhatsApp}?text=${waText}`;

      const incluyeHeroHTML = heroOferta.incluye ? `
        <div class="oferta-incluye-lista">
          <p class="oferta-incluye-titulo">Fragancias incluidas:</p>
          <div class="oferta-incluye-chips">
            ${heroOferta.incluye.map(item => `<span class="chip-decant">✦ ${item}</span>`).join('')}
          </div>
        </div>
      ` : '';

      const precioOriginalHTML = heroOferta.precioOriginal ? `<span class="oferta-precio-tachado">Bs ${heroOferta.precioOriginal}</span>` : '';
      const comboSizeHero = heroOferta.precios && heroOferta.precios[0] ? heroOferta.precios[0].size.toUpperCase() : '15 ML';

      ofertasHTML += `
        <section class="oferta-semana">
          <div class="oferta-inner">
            <div class="oferta-texto">
              <p class="oferta-etiqueta">Combo Estrella del Mes</p>
              <h2 class="oferta-bajada">${heroOferta.marca}<br><em>${heroOferta.nombre}</em></h2>
              <div class="oferta-tag">${heroOferta.tag}</div>
              <p class="oferta-desc">${heroOferta.desc}</p>
              
              ${incluyeHeroHTML}
              
              <div class="oferta-precio-10ml-box">
                <div class="oferta-precio-item">
                  <p class="oferta-precio-ml">PRECIO COMBO (${comboSizeHero})</p>
                  <p class="oferta-precio-valor">
                    ${precioOriginalHTML}
                    <span>Bs </span>${heroOferta.precioCombo || heroOferta.precios[0].valor}
                  </p>
                </div>
              </div>
              
              <a href="${waUrl}" class="btn-whatsapp" target="_blank" rel="noopener" style="max-width:260px">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.535 5.845L.057 23.428a.5.5 0 0 0 .515.572l5.725-1.5A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.157-1.42l-.369-.218-3.4.892.907-3.312-.24-.382A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Pedir Combo Pa' Los Manes
              </a>
            </div>
            <div class="oferta-imagen-wrap">
              <img src="${heroOferta.imagen}" alt="${heroOferta.nombre}" onerror="this.src='https://fimgs.net/mdimg/perfume/375x500.77898.jpg';this.onerror=null;">
            </div>
          </div>
        </section>
      `;
    }

    // Grid de todos los Combos y Ofertas
    const otrosCombos = data.ofertas.filter(o => o.id !== "combo-pa-los-manes");
    if (otrosCombos.length > 0) {
      ofertasHTML += `
        <div class="seccion-subtitulo-block">
          <h3 class="subseccion-titulo">Más Combos & Ofertas Especiales</h3>
        </div>
        <div class="catalogo-grid combos-grid">
          ${otrosCombos.map(createComboCardHTML).join("")}
        </div>
      `;
    }

    panelOfertas.innerHTML = ofertasHTML;
  }
}

function createComboCardHTML(combo) {
  const precioActual = combo.precioCombo || (combo.precios && combo.precios[0] ? combo.precios[0].valor : combo.precioDesde);
  const precioAnteriorHTML = combo.precioOriginal ? `<span class="combo-precio-original">Bs ${combo.precioOriginal}</span>` : '';
  const comboSizeTag = combo.precios && combo.precios[0] ? `PRECIO COMBO ${combo.precios[0].size.toUpperCase()}` : 'PRECIO COMBO';
  const waText = encodeURIComponent(`Hola, estoy interesado en comprar el ${combo.nombre}`);
  const waUrl = `https://wa.me/${window.CONFIG.telefonoWhatsApp}?text=${waText}`;

  const incluyeHTML = combo.incluye ? `
    <div class="combo-incluye-wrap">
      <p class="combo-incluye-titulo">Fragancias incluidas:</p>
      <div class="combo-incluye-tags">
        ${combo.incluye.map(item => `<span class="combo-chip">${item}</span>`).join('')}
      </div>
    </div>
  ` : '';

  return `
    <div class="card card-combo" data-nombre="${combo.dataNombre}">
      <div class="card-imagen card-imagen-combo">
        <img src="${combo.imagen}" alt="${combo.nombre}" loading="lazy" onerror="this.classList.add('img-error')">
        <div class="img-fallback"><span>${combo.nombre}</span></div>
      </div>
      <div class="card-info">
        <span class="card-marca">${combo.marca}</span>
        <h3 class="card-nombre">${combo.nombre}</h3>
        <p class="combo-desc-corta">${combo.desc}</p>

        ${incluyeHTML}

        <div class="card-precio-10ml card-precio-combo">
          <span class="precio-10ml-tag">${comboSizeTag}</span>
          <div class="precio-10ml-val">
            ${precioAnteriorHTML}
            <span class="monto">${precioActual}</span>
            <span class="moneda">Bs</span>
          </div>
        </div>

        <a href="${waUrl}" class="btn-whatsapp" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.535 5.845L.057 23.428a.5.5 0 0 0 .515.572l5.725-1.5A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.157-1.42l-.369-.218-3.4.892.907-3.312-.24-.382A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          Pedir Combo por WhatsApp
        </a>
      </div>
    </div>
  `;
}

function createCardHTML(perfume) {
  const precio10ml = perfume.precios && perfume.precios[0] ? perfume.precios[0].valor : perfume.precioDesde;
  const waText = encodeURIComponent(`Hola, estoy interesado en el decant de 10ml de ${perfume.marca} ${perfume.nombre}`);
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

        <div class="card-precio-10ml">
          <span class="precio-10ml-tag">DECANT 10 ML</span>
          <div class="precio-10ml-val">
            <span class="monto">${precio10ml}</span>
            <span class="moneda">Bs</span>
          </div>
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
        <a href="${waUrl}" class="btn-whatsapp" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.535 5.845L.057 23.428a.5.5 0 0 0 .515.572l5.725-1.5A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.157-1.42l-.369-.218-3.4.892.907-3.312-.24-.382A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          Pedir 10ml por WhatsApp
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
      const inputBuscador = document.getElementById("buscador");
      if (inputBuscador) {
        inputBuscador.value = "";
        resetBuscador();
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

let searchInput;

function initBuscador() {
  searchInput = document.getElementById("buscador");
  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const q = this.value.toLowerCase().trim();
    const activePanel = document.querySelector(".tab-panel.activo");
    if (!activePanel) return;

    const cardsInActive = activePanel.querySelectorAll(".card");
    const conteoEl = activePanel.querySelector(".seccion-conteo");
    const noResEl = activePanel.querySelector(".no-resultados");
    
    let visibles = 0;
    cardsInActive.forEach(card => {
      const nombre = (card.getAttribute("data-nombre") || "").toLowerCase();
      if (!q || nombre.includes(q)) {
        card.classList.remove("hidden");
        visibles++;
      } else {
        card.classList.add("hidden");
      }
    });

    if (conteoEl) {
      const totalCount = cardsInActive.length;
      conteoEl.textContent = q 
        ? `${visibles} resultado${visibles !== 1 ? "s" : ""}` 
        : `${totalCount} fragancia${totalCount !== 1 ? "s" : ""}`;
    }

    if (noResEl) {
      noResEl.classList.toggle("visible", visibles === 0 && cardsInActive.length > 0);
    }
  });
}

function resetBuscador() {
  const cardsAll = document.querySelectorAll(".tab-panel .card");
  cardsAll.forEach(card => card.classList.remove("hidden"));
  
  const noResultadosAll = document.querySelectorAll(".no-resultados");
  noResultadosAll.forEach(nr => nr.classList.remove("visible"));

  const activePanel = document.querySelector(".tab-panel.activo");
  if (activePanel) {
    const conteoEl = activePanel.querySelector(".seccion-conteo");
    const cardsInActive = activePanel.querySelectorAll(".card");
    if (conteoEl && cardsInActive.length > 0) {
      conteoEl.textContent = `${cardsInActive.length} fragancia${cardsInActive.length !== 1 ? "s" : ""}`;
    }
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

  const precioActual = perfume.precioCombo || (perfume.precios && perfume.precios[0] ? perfume.precios[0].valor : perfume.precioDesde);
  const precioAnteriorHTML = perfume.precioOriginal ? `<span class="modal-precio-tachado">Bs ${perfume.precioOriginal}</span>` : '';
  const modalPreciosHTML = `
    <div class="modal-precio-10ml-box">
      <span class="modal-precio-10ml-label">${perfume.incluye ? "PRECIO COMBO PROMO" : "PRESENTACIÓN 10 ML"}</span>
      <div class="modal-precio-10ml-val">
        ${precioAnteriorHTML}
        ${precioActual} <small>Bs</small>
      </div>
    </div>
  `;

  const waText = encodeURIComponent(`Hola, estoy interesado en consultar sobre ${perfume.nombre}`);
  const waUrl = `https://wa.me/${window.CONFIG.telefonoWhatsApp}?text=${waText}`;

  const incluyeModalHTML = perfume.incluye ? `
    <div class="modal-section-title">Fragancias Incluidas</div>
    <div class="modal-desc-list">
      ${perfume.incluye.map(item => `<div class="modal-desc-item">✦ <strong>${item}</strong></div>`).join('')}
    </div>
  ` : `
    <div class="modal-section-title">Detalles de la Fragancia</div>
    <div class="modal-desc-list">
      <div class="modal-desc-item"><strong>Notas:</strong> ${perfume.notas || "No especificado"}</div>
      <div class="modal-desc-item"><strong>Sensación:</strong> ${perfume.sensacion || "No especificado"}</div>
      <div class="modal-desc-item"><strong>Ocasiones:</strong> ${perfume.ocasiones || "No especificado"}</div>
      <div class="modal-desc-item"><strong>Duración:</strong> ${perfume.duracion || "No especificado"}</div>
    </div>
  `;

  modalContenido.innerHTML = `
    <div class="modal-perfume-header">
      <div class="modal-perfume-img-wrap">
        <img src="${perfume.imagen}" alt="${perfume.nombre}" onerror="this.src='https://fimgs.net/mdimg/perfume/375x500.77898.jpg';this.onerror=null;">
      </div>
      <span class="modal-perfume-marca">${perfume.marca}</span>
      <h3 class="modal-perfume-nombre">${perfume.nombre}</h3>
    </div>

    ${modalPreciosHTML}

    <p class="modal-desc-texto" style="font-size:12.5px;color:var(--gris-medio);line-height:1.6;margin-bottom:12px;">${perfume.desc || ""}</p>

    ${incluyeModalHTML}

    <a href="${waUrl}" class="modal-btn-wa" target="_blank" rel="noopener" style="margin-top:20px;">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.535 5.845L.057 23.428a.5.5 0 0 0 .515.572l5.725-1.5A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.157-1.42l-.369-.218-3.4.892.907-3.312-.24-.382A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
      Pedir por WhatsApp
    </a>
  `;

  modal.classList.add("activo");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Bloquear scroll en body
}
