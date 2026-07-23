// ============================================
// APEX ADS — Fichas Mayoristas
// ============================================

const WHATSAPP_NUMBER = "5492236669393"; // Apex Ads — 223 666 9393 (AR)

document.getElementById("year").textContent = new Date().getFullYear();

function showToast(msg){
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2600);
}

function buildMessage(){
  const name = document.getElementById("fName").value.trim();
  const exp = document.getElementById("fExp").value;
  const netwin = document.getElementById("fNetwin").value;
  const plat = document.getElementById("fPlat").value.trim();

  if(!name){
    showToast("Completá al menos tu nombre para continuar.");
    document.getElementById("fName").focus();
    return null;
  }

  let msg = `Hola Apex Ads! Quiero información sobre fichas mayoristas al 6%.\n\n`;
  msg += `Nombre: ${name}\n`;
  if(exp) msg += `Experiencia vendiendo: ${exp}\n`;
  if(netwin) msg += `Netwin aproximado mensual: ${netwin}\n`;
  if(plat) msg += `Plataforma: ${plat}\n`;

  return msg;
}

function openWhatsApp(msg){
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// Form submit button
document.getElementById("submitWa").addEventListener("click", () => {
  const msg = buildMessage();
  if(msg) openWhatsApp(msg);
});

// Generic quick-contact buttons (nav, cta band, floating button)
const defaultMessage = "Hola Apex Ads! Quiero información sobre fichas mayoristas al 6%.";

document.getElementById("ctaWaBtn").addEventListener("click", () => {
  const name = document.getElementById("fName").value.trim();
  openWhatsApp(name ? buildMessage() || defaultMessage : defaultMessage);
});

document.getElementById("floatWaBtn").addEventListener("click", (e) => {
  e.preventDefault();
  openWhatsApp(defaultMessage);
});

document.getElementById("navWaBtn").addEventListener("click", (e) => {
  // let it scroll to the form via the href="#form"
});

// Subtle scroll-reveal for cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".platform-card, .feature-card").forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(16px)";
  el.style.transition = "opacity .5s ease, transform .5s ease";
  observer.observe(el);
});
