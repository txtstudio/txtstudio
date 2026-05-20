// ✅ TXT STUDIO - SCRIPT UTAMA (CLEAN REDIRECT VERSION)
// NOMBOR ADMIN: 601123456636

// 1. MENU MOBILE
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// 2. SISTEM LOGIN
function processLogin(username, password) {
  if (username === "txtstudio" && password === "Rockerz6636") {
    localStorage.setItem('server_access', 'active');
    window.location.href = "home.html"; 
    return true;
  }
  alert("Salah password!");
  return false;
}

// ✅ 3. SISTEM CHECKOUT (ANTI POP-UP BLOCK)
// Kita buang semua alert() sebelum redirect untuk elak browser anggap ia spam
function hantarPesanan(phone, telco, amount) {
  if (!phone || parseFloat(amount) < 5) {
    alert("Sila masukkan nombor telefon dan minimum RM5.");
    return;
  }

  // Guna cara paling direct: Menukar URL tab sekarang secara paksa
  const target = `checkout.html?phone=${encodeURIComponent(phone)}&telco=${encodeURIComponent(telco)}&amount=${encodeURIComponent(amount)}`;
  
  // Ini adalah arahan paling kuat untuk tukar page tanpa popup
  window.location.assign(target);
}

// 4. PAPAR BAKI REAL DARI OTA MY
async function refreshOtaBalance() {
  try {
    const res = await fetch('/api/get-balance');
    const data = await res.json();
    const allDivs = document.querySelectorAll('div, span, p, h3');
    allDivs.forEach(el => {
      if (el.innerText.includes('17,562.57')) {
        el.innerText = `RM ${parseFloat(data.balance).toFixed(2)}`;
      }
    });
  } catch (e) {
    console.log("Baki manual.");
  }
}

if (window.location.pathname.includes('home.html')) {
    refreshOtaBalance();
}
