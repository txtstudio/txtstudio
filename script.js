// ✅ TXT STUDIO - SCRIPT UTAMA (FINAL VERSION - NO POPUP BLOCK)
// STATUS: 100% KOMISYEN MILIK ANDA (TANPA TOYYIBPAY)
// NOMBOR ADMIN: 601123456636

// 1. FUNGSI MENU MOBILE (NAVBAR)
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = menuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.replace('fa-times', 'fa-bars');
    } else {
      icon.classList.replace('fa-bars', 'fa-times');
    }
  });
}

// 2. SISTEM LOGIN & SERVER KEY
const authorizedKeys = ["txtstudio", "TXT-VVIP-888", "PRO-SERVER-99"];

function processLogin(username, password) {
  const validUser = "txtstudio";
  const validPass = "Rockerz6636";

  if (username === validUser && password === validPass) {
    localStorage.setItem('server_access', 'active');
    localStorage.setItem('user_role', 'admin');
    alert("Log masuk berjaya! Selamat kembali.");
    window.location.href = "home.html"; 
    return true;
  } else {
    alert("Username atau Password salah!");
    return false;
  }
}

function validateServerKey(inputKey) {
  if (authorizedKeys.includes(inputKey)) {
    localStorage.setItem('server_access', 'active');
    localStorage.setItem('current_key', inputKey);
    alert("Server Key sah!");
    window.location.href = "home.html";
    return true;
  }
  return false;
}

// ✅ 3. SISTEM CHECKOUT MANUAL (ELAK POP-UP BLOCK)
// Fungsi ini menggunakan window.location.href untuk menukar halaman secara terus
function hantarPesanan(phone, telco, amount) {
  console.log("Memproses pesanan ke checkout...");
  
  if (parseFloat(amount) < 5) {
    alert("Minimum pembelian adalah RM5.00");
    return;
  }

  // Menggunakan encodeURIComponent untuk keselamatan data dalam URL
  const phone_enc = encodeURIComponent(phone);
  const telco_enc = encodeURIComponent(telco);
  const amount_enc = encodeURIComponent(amount);

  // Redirect secara terus dalam tab yang sama (Browser tidak akan block)
  window.location.href = `checkout.html?phone=${phone_enc}&telco=${telco_enc}&amount=${amount_enc}`;
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
    console.log("Baki dikemaskini secara manual.");
  }
}

// 5. EFEK NAVBAR BILA SCROLL
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('nav');
  if (navbar) {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-2xl', 'bg-black/90', 'backdrop-blur-md');
    } else {
      navbar.classList.remove('shadow-2xl', 'bg-black/90', 'backdrop-blur-md');
    }
  }
});

// 6. JALANKAN FUNGSI AUTOMATIK
if (window.location.pathname.includes('home.html')) {
    refreshOtaBalance();
}

document.documentElement.style.scrollBehavior = 'smooth';
console.log("TXT Studio Script Ready - Mode: Manual Checkout (Direct Redirect)");
