// ✅ TXT STUDIO - SCRIPT UTAMA (FULL AUTO-PAYMENT VERSION)
// DIBINA UNTUK INTEGRASI TOYYIBPAY & VERCEL SERVERLESS
// STATUS: SIAP UNTUK DEPLOYMENT

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

// 2. LOGIK KOMISYEN & HARGA
const settingHarga = {
  modal_base: 0.95, 
  target_komisyen: 0.50
};

function kiraUntung(jumlah) {
  let modal = jumlah * settingHarga.modal_base;
  let untung = jumlah - modal;
  console.log(`Transaksi: RM${jumlah} | Modal: RM${modal} | Untung Anda: RM${untung}`);
  return untung;
}

// 3. SISTEM SERVER KEY (API PROVIDER)
const authorizedKeys = ["txtstudio", "TXT-VVIP-888", "PRO-SERVER-99"];

function validateServerKey(inputKey) {
  if (authorizedKeys.includes(inputKey)) {
    localStorage.setItem('server_access', 'active');
    localStorage.setItem('current_key', inputKey);
    return true;
  }
  return false;
}

// ✅ 4. INTEGRASI TOYYIBPAY AUTOMATIK (SISTEM AUTO-GATEWAY)
async function hantarPesanan(phone, telco, amount) {
  console.log("Memulakan proses pembayaran ToyyibPay...");
  
  // Beri maklum balas kepada pengguna
  alert("Anda akan dibawa ke portal pembayaran bank (FPX). Sila tunggu sebentar...");

  try {
    const response = await fetch('/api/create-bill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amount,
        phone: phone,
        billName: telco
      })
    });

    const data = await response.json();
    
    // Jika ToyyibPay berjaya menjana kod bil
    if (data[0] && data[0].BillCode) {
      // Bawa pelanggan terus ke portal pembayaran ToyyibPay
      window.location.href = `https://toyyibpay.com/${data[0].BillCode}`;
    } else {
      // Jika error (Contoh: Akaun belum disahkan/Active)
      alert("Maaf, sistem pembayaran sedang diselenggara. Sila cuba sebentar lagi atau hubungi Admin.");
      console.error("ToyyibPay Response:", data);
    }
  } catch (error) {
    console.error("Network Error:", error);
    alert("Gagal menyambung ke server pembayaran. Sila pastikan internet anda stabil.");
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

// 6. NOTIFIKASI LIVE JUALAN (SIMULASI SOCIAL PROOF)
function showFakeNotification() {
  const names = ["Ali", "Siti", "Chong", "Ramasamy", "Wan", "Bala", "Ridzwan"];
  const amounts = [5, 10, 30, 50, 100];
  
  setInterval(() => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
    console.log(`[LIVE] ${randomName} baru saja membeli Topup RM${randomAmount}`);
  }, 60000);
}

// Jalankan fungsi asas
showFakeNotification();
document.documentElement.style.scrollBehavior = 'smooth';

// Kod Dikemaskini pada: 2026-05-20 21:35
