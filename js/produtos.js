(function () {
  // =========================================
  // CONFIG
  // =========================================
  const WHATSAPP_NUMBER = "5519974120394";

  const money = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const titleOf = (p) => {
    const m = (p.marca || "").trim();
    const mod = (p.modelo || "").trim();
    if (m && mod) return `${m} — ${mod}`;
    return m || mod || "Produto";
  };

  const slug = (s) =>
    String(s)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const waLink = (p) => {
    const t = titleOf(p);
    const codigo = p.codigo ? `Código: ${p.codigo}` : "Código: —";
    const preco = typeof p.preco === "number" ? `Preço: ${money(p.preco)}` : "Preço: a consultar";
    const msg =
      `Olá! Vi no site e quero comprar:\n` +
      `• ${t}\n` +
      `• Categoria: ${p.categoria}\n` +
      `• ${codigo}\n` +
      `• ${preco}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  // =========================================
  // CATÁLOGO (do seu print)
  // - Sem "quantidade"
  // - Nome = Marca + Modelo
  // - Preços faltando: estimados (coerentes com sua tabela)
  // =========================================
  const products = [
    // SEDAS
    { id: 1, categoria: "Seda", marca: "Bem Bolado", modelo: "Hemp King", preco: 5.0, codigo: 1, img: "images/produtos/sedas/bem-bolado-hemp-king.png" },
    { id: 2, categoria: "Seda", marca: "Bem Bolado", modelo: "11/4", preco: 4.0, codigo: 2, img: "images/produtos/sedas/bem-bolado-11-4.png" },
    { id: 3, categoria: "Seda", marca: "Smoking", modelo: "Brown King", preco: 7.0, codigo: 3, img: "images/produtos/sedas/smoking-brown-king.png" },
    { id: 4, categoria: "Seda", marca: "Smoking", modelo: "Silver King", preco: 7.0, codigo: 4, img: "images/produtos/sedas/smoking-silver-king.png" },
    { id: 5, categoria: "Seda", marca: "Zomo", modelo: "White King", preco: 3.0, codigo: 5, img: "images/produtos/sedas/zomo-white-king.png" },
    { id: 6, categoria: "Seda", marca: "Zomo", modelo: "Brown King", preco: 3.0, codigo: 6, img: "images/produtos/sedas/zomo-brown-king.png" },
    { id: 7, categoria: "Seda", marca: "Zomo", modelo: "Rosa King", preco: 3.0, codigo: 7, img: "images/produtos/sedas/zomo-rosa-king.png" },
    { id: 8, categoria: "Seda", marca: "OCB", modelo: "Sedas diversas", preco: 7.0, codigo: 8, img: "images/produtos/sedas/ocb-diversas.png" },
    { id: 9, categoria: "Seda", marca: "Papelito", modelo: "Seda c/ piteira", preco: 7.5, codigo: 9, img: "images/produtos/sedas/papelito-seda-piteira.png" },
    { id: 10, categoria: "Seda", marca: "Sadhu", modelo: "Morning", preco: 8.5, codigo: 10, img: "images/produtos/sedas/sadhu-morning.png" },
    { id: 11, categoria: "Seda", marca: "Sadhu", modelo: "Night", preco: 8.5, codigo: 11, img: "images/produtos/sedas/sadhu-night.png" },
    { id: 12, categoria: "Seda", marca: "Sadhu", modelo: "Evening", preco: 8.5, codigo: 12, img: "images/produtos/sedas/sadhu-evening.png" },

    // Preços estavam vazios no print -> estimados (padrão do seu catálogo: kings ~7 / premium ~8-9)
    { id: 13, categoria: "Seda", marca: "Bem Bolado", modelo: "King Size Slim Silver", preco: 7.0, codigo: null, img: "images/produtos/sedas/bem-bolado-king-slim-silver.png" },
    { id: 14, categoria: "Seda", marca: "Bem Bolado", modelo: "King Size Slim Brown", preco: 7.0, codigo: null, img: "images/produtos/sedas/bem-bolado-king-slim-brown.png" },
    { id: 15, categoria: "Seda", marca: "Pay-Pay", modelo: "Slim Size", preco: 8.9, codigo: null, img: "images/produtos/sedas/paypay-slim-size.png" },

    // BLUNT
    { id: 16, categoria: "Blunt", marca: "King", modelo: "Herbal Wrap Camomila", preco: 11.9, codigo: null, img: "images/produtos/blunts/king-herbal-wrap-camomila.png" },

    // PITEIRAS
    { id: 101, categoria: "Piteira", marca: "ToNaBe", modelo: "Megalonga", preco: 7.0, codigo: 101, img: "images/produtos/piteiras/tonabe-megalonga.png" },
    { id: 102, categoria: "Piteira", marca: "Papelito", modelo: "Megalonga 2x1", preco: 8.0, codigo: 102, img: "images/produtos/piteiras/papelito-megalonga-2x1.webp" },
    { id: 103, categoria: "Piteira", marca: "Papelito", modelo: "Ultra Longa 2x1", preco: 7.0, codigo: null, img: "images/produtos/piteiras/papelito-ultra-longa-2x1.webp" },
    { id: 104, categoria: "Piteira", marca: "Girlsn'green", modelo: "Megalonga", preco: 6.0, codigo: 103, img: "images/produtos/piteiras/girlsngreen-megalonga.png" },
    { id: 105, categoria: "Piteira", marca: "Bem Bolado", modelo: "Slim Size", preco: 4.0, codigo: 104, img: "images/produtos/piteiras/bem-bolado-slim.png" },
    { id: 106, categoria: "Piteira", marca: "Vidro Tonabe", modelo: "5mm x 7cm (bocal redondo)", preco: 24.0, codigo: 105, img: "images/produtos/piteiras/tonabe-vidro-5x7.png" },
    { id: 107, categoria: "Piteira", marca: "Sadhu", modelo: "X-Large", preco: 6.0, codigo: null, img: "images/produtos/piteiras/sadhu-x-large.png" },

    // CUIA
    { id: 201, categoria: "Cuia", marca: "ToNaBe", modelo: "", preco: 20.0, codigo: 201, img: "images/produtos/cuias/tonabe-cuia.png" },

    // ISQUEIROS
    { id: 202, categoria: "Isqueiro", marca: "BIC", modelo: "Grande", preco: 8.0, codigo: 202, img: "images/produtos/isqueiros/bic-grande.png" },
    { id: 203, categoria: "Isqueiro", marca: "FireStar", modelo: "Transparente", preco: 2.5, codigo: 203, img: "images/produtos/isqueiros/firestar-transparente.png" },
    { id: 204, categoria: "Isqueiro", marca: "Clipper", modelo: "Diversos", preco: 12.0, codigo: null, img: "images/produtos/isqueiros/clipper-diversos.webp" },

    // ACESSÓRIOS
    { id: 205, categoria: "Acessório", marca: "ONE", modelo: "Porta Beck", preco: 8.0, codigo: 204, img: "images/produtos/acessorios/porta-beck-one.png" },
    { id: 206, categoria: "Acessório", marca: "Moon", modelo: "Gás para isqueiro", preco: 30.0, codigo: null, img: "images/produtos/acessorios/gas-moon.png" },
    { id: 207, categoria: "Acessório", marca: "Slick", modelo: "Personagens — 5ml", preco: 20.0, codigo: 205, img: "images/produtos/acessorios/slick-5ml.png" },

    // TABACOS
    { id: 301, categoria: "Tabaco", marca: "Amsterdam", modelo: "25g", preco: 24.0, codigo: 301, img: "images/produtos/tabacos/amsterdam-25g.png" },
    { id: 302, categoria: "Tabaco", marca: "ToNaBe", modelo: "25g", preco: 20.0, codigo: 302, img: "images/produtos/tabacos/tonabe-25g.png" },
    { id: 303, categoria: "Tabaco", marca: "ToNaBe", modelo: "12g", preco: 13.0, codigo: 303, img: "images/produtos/tabacos/tonabe-12g.png" },
    { id: 304, categoria: "Tabaco", marca: "A Crema", modelo: "20g", preco: 20.0, codigo: 304, img: "images/produtos/tabacos/a-crema-20g.png" },
    { id: 305, categoria: "Tabaco", marca: "Caramel Dog", modelo: "35g — especial suave", preco: 29.0, codigo: 309, img: "images/produtos/tabacos/caramel-dog-especial-suave.webp" },
    { id: 306, categoria: "Tabaco", marca: "Caramel Dog", modelo: "35g — virginia blend", preco: 27.5, codigo: 305, img: "images/produtos/tabacos/caramel-dog-virginia.webp" },
    { id: 307, categoria: "Tabaco", marca: "Hi Tobacco", modelo: "35g", preco: 33.0, codigo: 306, img: "images/produtos/tabacos/hi-tobacco-35g.png" },
    { id: 308, categoria: "Tabaco", marca: "Hi Tobacco", modelo: "12g", preco: 15.0, codigo: 310, img: "images/produtos/tabacos/hi-tobacco-12g.png" },
    { id: 309, categoria: "Tabaco", marca: "Tabaquin", modelo: "20g", preco: 15.0, codigo: 307, img: "images/produtos/tabacos/tabaquin-20g.png" },
    { id: 310, categoria: "Tabaco", marca: "#Tab", modelo: "25g", preco: 19.0, codigo: 308, img: "images/produtos/tabacos/tab-25g.png" },
    { id: 311, categoria: "Tabaco", marca: "Dublin", modelo: "25g — Pink Tobacco", preco: 15.0, codigo: null, img: "images/produtos/tabacos/dublin-pink-25g.png" },

    // FERRAMENTAS
    { id: 401, categoria: "Tesoura", marca: "Bud Cutter", modelo: "Bud cutter", preco: 12.0, codigo: 6, img: "images/produtos/ferramentas/bud-cutter.png" },
    { id: 402, categoria: "Tesoura", marca: "Óculos", modelo: "Óculos dobrável", preco: 22.0, codigo: 6, img: "images/produtos/ferramentas/oculos-dobravel.png" },

    // LIMPEZA
    { id: 501, categoria: "Limpador", marca: "Limpador", modelo: "3", preco: 2.5, codigo: null, img: "images/produtos/limpeza/limpador-3.png" }
  ];

  // =========================================
  // HOOKS (compatível com seu HTML)
  // =========================================
  const productsRoot = document.querySelector("[data-products]");
  const categorySelect = document.querySelector("[data-category]");
  const searchInput = document.querySelector("[data-search]");
  const sortSelect = document.querySelector("[data-sort]");
  const resetBtn = document.querySelector("[data-reset]");
  const countEl = document.querySelector("[data-count]");
  const strip = document.querySelector("[data-category-strip]");

  const modal = document.querySelector("[data-modal]");
  const modalBody = document.querySelector("[data-modal-body]");

  // =========================================
  // UI HELPERS
  // =========================================
  function buildCategories() {
    const categories = [...new Set(products.map((p) => p.categoria))].sort((a, b) => a.localeCompare(b, "pt-BR"));
    const all = ["Todas", ...categories];

    if (categorySelect) {
      categorySelect.innerHTML = all.map((c) => `<option value="${c}">${c}</option>`).join("");
    }

    if (strip) {
      strip.innerHTML = all
        .map((c, idx) => {
          const active = idx === 0 ? "active" : "";
          return `<button type="button" class="cat-pill ${active}" data-cat-pill="${c}">${c}</button>`;
        })
        .join("");

      strip.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-cat-pill]");
        if (!btn) return;
        const cat = btn.getAttribute("data-cat-pill");
        if (categorySelect) categorySelect.value = cat;
        highlightPills(cat);
        render();
      });
    }
  }

  function highlightPills(cat) {
    if (!strip) return;
    strip.querySelectorAll("[data-cat-pill]").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-cat-pill") === cat);
    });
  }

  function score(p, q) {
    if (!q) return 0;
    const s = q.toLowerCase();
    const text = `${p.categoria} ${p.marca} ${p.modelo} ${p.codigo ?? ""}`.toLowerCase();
    let sc = 0;
    if (String(p.marca || "").toLowerCase().includes(s)) sc += 4;
    if (String(p.modelo || "").toLowerCase().includes(s)) sc += 4;
    if (String(p.categoria || "").toLowerCase().includes(s)) sc += 2;
    if (String(p.codigo || "").toLowerCase().includes(s)) sc += 1;
    if (text.includes(s)) sc += 1;
    return sc;
  }

  function getFiltered() {
    const cat = categorySelect ? categorySelect.value : "Todas";
    const q = searchInput ? searchInput.value.trim() : "";
    const sort = sortSelect ? sortSelect.value : "relevancia";

    let list = products.slice();

    if (cat && cat !== "Todas") list = list.filter((p) => p.categoria === cat);

    if (q) {
      list = list
        .map((p) => ({ ...p, _score: score(p, q) }))
        .filter((p) => p._score > 0)
        .sort((a, b) => b._score - a._score);
    }

    if (sort === "preco-asc") list.sort((a, b) => (a.preco ?? 9e9) - (b.preco ?? 9e9));
    if (sort === "preco-desc") list.sort((a, b) => (b.preco ?? -1) - (a.preco ?? -1));
    if (sort === "nome-asc") list.sort((a, b) => titleOf(a).localeCompare(titleOf(b), "pt-BR"));

    if (sort === "relevancia" && !q) {
      list.sort((a, b) => titleOf(a).localeCompare(titleOf(b), "pt-BR"));
    }

    return list;
  }

  function card(p) {
    const t = titleOf(p);
    const price = typeof p.preco === "number" ? money(p.preco) : "a consultar";
    const code = p.codigo ? `#${p.codigo}` : "";

    return `
      <article class="product-card" data-product="${p.id}" tabindex="0" role="button" aria-label="Ver detalhes de ${t}">
        <div class="product-media" style="background-image:url('${p.img}');">
          <div class="product-badges">
            <span class="badge-mini">${p.categoria}</span>
          </div>
          <div class="product-price">${price}</div>
        </div>
        <div class="product-body">
          <h3 class="product-name">${t}</h3>
          <p class="product-desc">${p.codigo ? `código: ${p.codigo}` : "clique para ver detalhes"}</p>
          <div class="product-meta">
            <span>${code || "HighWay"}</span>
            <span>ver →</span>
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    if (!productsRoot) return;
    const list = getFiltered();
    productsRoot.innerHTML = list.map(card).join("");
    if (countEl) countEl.textContent = String(list.length);

    if (categorySelect && strip) highlightPills(categorySelect.value);

    productsRoot.querySelectorAll("[data-product]").forEach((el) => {
      el.addEventListener("click", () => openProduct(Number(el.getAttribute("data-product"))));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProduct(Number(el.getAttribute("data-product")));
        }
      });
    });
  }

  function openProduct(id) {
    if (!modal || !modalBody) return;
    const p = products.find((x) => x.id === id);
    if (!p) return;

    const t = titleOf(p);
    const price = typeof p.preco === "number" ? money(p.preco) : "a consultar";
    const code = p.codigo ? `#${p.codigo}` : "—";

    modalBody.innerHTML = `
      <div class="modal-grid">
        <div class="modal-media">
          <img class="modal-img" src="${p.img}" alt="${t}">
        </div>
          <h2 class="modal-title">${t}</h2>
          <p class="modal-sub">categoria: <strong>${p.categoria}</strong></p>
          <div class="modal-price">${price}</div>
          <div class="divider"></div>
          <div class="muted"><strong>código:</strong> ${code}</div>

          <div class="modal-actions">
            <a class="btn secondary" href="${waLink(p)}" target="_blank" rel="noopener">comprar no whatsapp</a>
            <button class="btn ghost" type="button" data-modal-close>fechar</button>
          </div>

          <div class="muted" style="margin-top:10px;">venda proibida para menores de 18 anos.</div>
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

  [searchInput, categorySelect, sortSelect].forEach((el) => {
    if (!el) return;
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  // init
  if (productsRoot) {
    buildCategories();
    render();
  }
})();
