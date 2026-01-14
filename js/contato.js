(function () {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const tel = form.telefone.value.trim();
    const assunto = form.assunto.value;
    const msg = form.mensagem.value.trim();

    if (!nome || !email || !assunto || !msg) {
      alert("Preencha nome, e-mail, assunto e mensagem.");
      return;
    }

    const subject = encodeURIComponent(`Contato - ${assunto}`);
    const body = encodeURIComponent(
      `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${tel || "-"}\n\nMensagem:\n${msg}\n\n(HighWay Tabacaria - site)`
    );

    // Troque pelo seu e-mail real
    window.location.href = `mailto:contato@highwaytabacaria.com?subject=${subject}&body=${body}`;
  });

  // Substitua pelos seus links reais quando quiser
  const whats = document.querySelector("[data-whats]");
  const insta = document.querySelector("[data-instagram]");

  if (whats) {
    whats.href = "https://wa.me/5500000000000"; // troque aqui
    whats.target = "_blank";
    whats.rel = "noopener";
  }

  if (insta) {
    insta.href = "https://instagram.com/highway.tabacaria"; // troque aqui
    insta.target = "_blank";
    insta.rel = "noopener";
  }
})();
