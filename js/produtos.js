(function () {
  const products = [
    { id:"sd-ks-01", nome:"Seda King Size Slim", categoria:"Sedas", preco:7.90, tags:["king size","slim"], destaque:true, descricao:"Seda king size slim para uma queima uniforme e acabamento limpo." },
    { id:"sd-ks-02", nome:"Seda King Size Brown", categoria:"Sedas", preco:9.90, tags:["brown","natural"], destaque:false, descricao:"Seda marrom com pegada natural e visual clássico." },
    { id:"sd-sab-01", nome:"Seda Saborizada (Mix)", categoria:"Sedas", preco:11.90, tags:["sabor"], destaque:true, descricao:"Variedade de sabores para quem curte uma experiência diferente." },
    { id:"sd-mini-01", nome:"Seda 1 1/4", categoria:"Sedas", preco:6.50, tags:["1 1/4"], destaque:false, descricao:"Formato tradicional 1 1/4, prática e versátil." },

    { id:"pt-pap-01", nome:"Piteira de Papel (Pré-cortada)", categoria:"Piteiras", preco:4.90, tags:["papel"], destaque:false, descricao:"Piteiras de papel pré-cortadas para montar rápido." },
    { id:"pt-vid-01", nome:"Piteira de Vidro (Curta)", categoria:"Piteiras", preco:19.90, tags:["vidro"], destaque:true, descricao:"Piteira de vidro curta: mais conforto e reutilizável." },
    { id:"pt-vid-02", nome:"Piteira de Vidro (Longa)", categoria:"Piteiras", preco:29.90, tags:["vidro","longa"], destaque:true, descricao:"Versão longa para reduzir calor e aumentar conforto." },
    { id:"pt-sil-01", nome:"Piteira de Silicone", categoria:"Piteiras", preco:14.90, tags:["silicone"], destaque:false, descricao:"Flexível, resistente e fácil de limpar." },

    { id:"tb-01", nome:"Tabaco Aromático (Blend 1)", categoria:"Tabacos", preco:24.90, tags:["blend","aroma"], destaque:true, descricao:"Blend aromático com perfil equilibrado (exemplo demonstrativo)." },
    { id:"tb-02", nome:"Tabaco Aromático (Blend 2)", categoria:"Tabacos", preco:27.90, tags:["blend"], destaque:false, descricao:"Opção com notas mais intensas (exemplo demonstrativo)." },
    { id:"tb-03", nome:"Tabaco Tradicional (Clássico)", categoria:"Tabacos", preco:22.90, tags:["tradicional"], destaque:false, descricao:"Perfil clássico, para quem curte o básico bem feito." },

    { id:"isq-01", nome:"Isqueiro Clássico", categoria:"Isqueiros", preco:6.90, tags:["clássico"], destaque:false, descricao:"Isqueiro simples e confiável para o dia a dia." },
    { id:"isq-02", nome:"Isqueiro Maçarico", categoria:"Isqueiros", preco:29.90, tags:["maçarico"], destaque:true, descricao:"Chama forte e estável. Ideal para vento e uso intenso." },
    { id:"isq-03", nome:"Gás para Isqueiro (Refil)", categoria:"Isqueiros", preco:14.90, tags:["refil"], destaque:false, descricao:"Refil para manter seus isqueiros sempre prontos." },

    { id:"dh-01", nome:"Dichavador Acrílico (2 partes)", categoria:"Dichavadores", preco:9.90, tags:["acrílico"], destaque:false, descricao:"Simples, leve e prático para uso cotidiano." },
    { id:"dh-02", nome:"Dichavador Metal (4 partes)", categoria:"Dichavadores", preco:49.90, tags:["metal"], destaque:true, descricao:"Mais robusto, com compartimentos e peneira (exemplo)." },

    { id:"ts-01", nome:"Tesourinha Compacta", categoria:"Tesourinhas", preco:12.90, tags:["compacta"], destaque:false, descricao:"Compacta e precisa, ideal para pequenos ajustes." },
    { id:"ts-02", nome:"Tesourinha Inox (Precisão)", categoria:"Tesourinhas", preco:19.90, tags:["inox"], destaque:true, descricao:"Aço inox, corte firme e pegada confortável." },

    { id:"ac-01", nome:"Pote Hermético (Pequeno)", categoria:"Acessórios", preco:16.90, tags:["armazenamento"], destaque:false, descricao:"Ajuda a manter o conteúdo protegido e organizado." },
    { id:"ac-02", nome:"Carteira Porta-Sedas", categoria:"Acessórios", preco:18.90, tags:["porta-sedas"], destaque:true, descricao:"Leve e discreta para carregar sedas e piteiras." },
    { id:"ac-03", nome:"Bandeja de Enrolar (Tray)", categoria:"Acessórios", preco:34.90, tags:["tray"], destaque:true, descricao:"Bandeja para manter tudo no lugar durante a montagem." },

    { id:"fl-01", nome:"Filtro de Carvão (Pack)", categoria:"Filtros", preco:21.90, tags:["carvão"], destaque:false, descricao:"Filtros de carvão ativado (exemplo demonstrativo)." },
    { id:"ot-01", nome:"Cinzeiro de Mesa", categoria:"Outros", preco:19.90, tags:["cinzeiro"], destaque:false, descricao:"Cinzeiro resistente para uso interno/externo." }
  ];

  const categories = ["Sedas","Piteiras","Tabacos","Isqueiros","Dichavadores","Tesourinhas","Acessórios","Filtros","Outros"];

  const productsRoot = document.querySelector("[data-products]");
  const categorySelect = document.querySelector("[data-category]");
  const searchInput = document.querySelector("[data-search]");
  const sortSelect = document.querySelector("[data-sort]");
  const resetBtn = document.querySelector("[data-reset]");
  const countEl = document.querySelector("[data-count]");
  const strip = document.querySelector("[data-category-strip]");

  const modal = document.querySelector("[data-modal]");
  const modalBody = document.querySelector("[data-modal-body]");

  const money = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const getQuery = () => new URLSearchParams(window.location.search);
  const initialCategoria = getQuery().get("categoria");

  function highlightPills(cat) {
    if (!strip) return;
    strip.querySelectorAll("[data-cat-pill]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-cat-pill") === cat);
    });
  }

  function buildCategories() {
    if (!categorySelect) return;

    const options = ["Todas", ...categories];
    categorySelect.innerHTML = options.map(c => `<option value="${c}">${c}</option>`).join("");

    if (strip) {
      strip.innerHTML = options.map((c) => {
        const cls = c === "Todas" ? "cat-pill active" : "cat-pill";
        return `<button type="button" class="${cls}" data-cat-pill="${c}">${c}</button>`;
      }).join("");

      strip.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-cat-pill]");
        if (!btn) return;
        const cat = btn.getAttribute("data-cat-pill");
        categorySelect.value = cat;
        highlightPills(cat);
        render();
        window.scrollTo({ top: strip.offsetTop - 80, behavior: "smooth" });
      });
    }

    if (initialCategoria && options.includes(initialCategoria)) {
      categorySelect.value = initialCategoria;
      highlightPills(initialCategoria);
    }
  }

  function scoreRelevancia(p, q) {
    if (!q) return 0;
    const s = q.toLowerCase();
    const base = (p.nome + " " + p.categoria + " " + (p.tags || []).join(" ") + " " + (p.descricao || "")).toLowerCase();
    let score = 0;
    if (p.nome.toLowerCase().includes(s)) score += 5;
    if (p.categoria.toLowerCase().includes(s)) score += 3;
    if ((p.tags || []).some(t => String(t).toLowerCase().includes(s))) score += 2;
    if ((p.descricao || "").toLowerCase().includes(s)) score += 1;
    return score;
  }

  function getFiltered() {
    const cat = categorySelect ? categorySelect.value : "Todas";
    const q = searchInput ? searchInput.value.trim() : "";
    const sort = sortSelect ? sortSelect.value : "relevancia";

    let list = products.slice();

    if (cat && cat !== "Todas") list = list.filter(p => p.categoria === cat);

    if (q) {
      list = list
        .map(p => ({ ...p, _score: scoreRelevancia(p, q) }))
        .filter(p => p._score > 0)
        .sort((a, b) => b._score - a._score);
    }

    if (sort === "preco-asc") list.sort((a, b) => a.preco - b.preco);
    if (sort === "preco-desc") list.sort((a, b) => b.preco - a.preco);
    if (sort === "nome-asc") list.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

    if (sort === "relevancia" && !q) {
      list.sort((a, b) => (b.destaque === true) - (a.destaque === true) || a.nome.localeCompare(b.nome, "pt-BR"));
    }

    return list;
  }

  function productCard(p) {
    const badges = [
      `<span class="badge-mini">${p.categoria}</span>`,
      p.destaque ? `<span class="badge-mini badge-hot">Destaque</span>` : ""
    ].filter(Boolean).join("");

    return `
      <article class="product-card" data-product="${p.id}" tabindex="0" role="button" aria-label="Ver detalhes de ${p.nome}">
        <div class="product-media">
          <div class="product-badges">${badges}</div>
          <div class="product-price">${money(p.preco)}</div>
        </div>
        <div class="product-body">
          <h3 class="product-name">${p.nome}</h3>
          <p class="product-desc">${p.descricao || ""}</p>
          <div class="product-meta">
            <span>${(p.tags || []).slice(0,2).join(" • ") || "HighWay"}</span>
            <span>Ver →</span>
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    if (!productsRoot) return;
    const list = getFiltered();
    productsRoot.innerHTML = list.map(productCard).join("");
    if (countEl) countEl.textContent = String(list.length);

    productsRoot.querySelectorAll("[data-product]").forEach(card => {
      card.addEventListener("click", () => openProduct(card.getAttribute("data-product")));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProduct(card.getAttribute("data-product"));
        }
      });
    });
  }

  function openProduct(id) {
    if (!modal || !modalBody) return;
    const p = products.find(x => x.id === id);
    if (!p) return;

    modalBody.innerHTML = `
      <div class="modal-grid">
        <div class="modal-media" aria-hidden="true"></div>
        <div>
          <h2 class="modal-title">${p.nome}</h2>
          <p class="modal-sub">${p.descricao || ""}</p>
          <div class="modal-price">${money(p.preco)}</div>
          <div class="divider"></div>
          <div class="muted"><strong>Categoria:</strong> ${p.categoria}</div>
          <div class="muted"><strong>Tags:</strong> ${(p.tags || []).join(", ") || "—"}</div>

          <div class="modal-actions">
            <a class="btn secondary" href="contato.html">Pedir orçamento</a>
            <button class="btn ghost" type="button" data-modal-close>Fechar</button>
          </div>

          <div class="muted" style="margin-top:10px;">Venda proibida para menores de 18 anos.</div>
        </div>
      </div>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.matches("[data-modal-close]")) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categorySelect) categorySelect.value = "Todas";
      if (sortSelect) sortSelect.value = "relevancia";
      highlightPills("Todas");
      render();
    });
  }

  [searchInput, categorySelect, sortSelect].forEach(el => {
    if (!el) return;
    el.addEventListener("input", () => {
      if (categorySelect && strip) highlightPills(categorySelect.value);
      render();
    });
    el.addEventListener("change", () => {
      if (categorySelect && strip) highlightPills(categorySelect.value);
      render();
    });
  });

  // init
  if (productsRoot) {
    buildCategories();
    render();
  }
})();
