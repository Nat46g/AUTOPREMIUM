// ===== Utilitários =====
export function formatarPreco(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

export function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function gerarNumeroPedido() {
  const ano = new Date().getFullYear();
  const seq = String(Math.floor(1000 + Math.random() * 9000));
  return `AP-${ano}-${seq}`;
}

export function exibirToast(mensagem, tipo = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;
  toast.textContent = mensagem;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Máscara de telefone
export function aplicarMascaraTelefone(input) {
  input.addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
      value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0,2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    this.value = value;
  });
}

// Máscara de CPF (opcional)
export function aplicarMascaraCPF(input) {
  input.addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 9) {
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
    }
    this.value = value;
  });
}

// Confetes (para nota fiscal)
export function criarConfetes() {
  const cores = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
  for (let i = 0; i < 50; i++) {
    const c = document.createElement('div');
    c.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${cores[Math.floor(Math.random() * cores.length)]};
      border-radius: 50%;
      top: 0;
      left: ${Math.random() * 100}vw;
      opacity: 0.8;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(c);
    const anim = c.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(${window.innerHeight}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
    ], { duration: 2000 + Math.random() * 2000, easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)' });
    anim.onfinish = () => c.remove();
  }
}

// Lazy loading de imagens (já nativo, mas podemos adicionar fallback)
export function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) return;
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });
  imgs.forEach(img => observer.observe(img));
}

// Inicialização automática (se quiser usar via script)
document.addEventListener('DOMContentLoaded', () => {
  // Qualquer inicialização global
});