// TXT STUDIO - SCRIPT UTAMA (MASTER PROVIDER VERSION)
// DIBINA UNTUK PENGURUSAN KOMISYEN TINGGI & SERVER KEY

// ✅ 1. FUNGSI MENU MOBILE (NAVBAR)
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

// ✅ 2. LOGIK KOMISYEN & HARGA (RM10 = RM10)
// Nota: Walaupun pelanggan bayar RM10, sistem rekod untung RM0.50 (berdasarkan modal RM9.50)
const settingHarga = {
  modal_base: 0.95, // Anggapan modal anda 95% (Untung 5%)
  target_komisyen: 0.50
};

function kiraUntung(jumlah) {
  let modal = jumlah * settingHarga.modal_base;
  let untung = jumlah - modal;
  console.log(`Transaksi: RM${jumlah} | Modal: RM${modal} | Untung Anda: RM${untung}`);
  return untung;
}

// ✅ 3. SISTEM SERVER KEY (API PROVIDER)
// Ini adalah senarai key sah yang boleh digunakan oleh ejen anda
const authorizedKeys = ["txtstudio", "TXT-VVIP-888", "PRO-SERVER-99"];

function validateServerKey(inputKey) {
  if (authorizedKeys.includes(inputKey)) {
    localStorage.setItem('server_access', 'active');
    localStorage.setItem('current_key', inputKey);
    return true;
  }
  return false;
}

// ✅ 4. INTEGRASI WHATSAPP PANTAS (MANUAL PROCESS)
function hantarPesanan(phone, telco, amount) {
  const adminWhatsApp = "601123456636"; // No anda
  const untungKasar = kiraUntung(amount);
  
  const text = `*ORDER BARU TXT STUDIO*%0A` +
               `-----------------------%0A` +
               `*Telco:* ${telco}%0A` +
               `*No Tel:* ${phone}%0A` +
               `*Nilai:* RM${amount}%0A` +
               `*Bayaran:* RM${amount}.00%0A` +
               `-----------------------%0A` +
               `_Sila proses segera di aplikasi SRS._`;

  window.open(`https://wa.me/${adminWhatsApp}?text=${text}`, '_blank');
}

// ✅ 5. EFEK NAVBAR BILA SCROLL
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

// ✅ 6. NOTIFIKASI AUTO (SIMULASI)
// Menunjukkan website anda "aktif" dengan jualan (Social Proof)
function showFakeNotification() {
  const names = ["Ali", "Siti", "Chong", "Ramasamy", "Wan", "Bala"];
  const amounts = [5, 10, 30, 50];
  
  setInterval(() => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
    // Anda boleh tambah kod UI untuk pop-up kecil di sini nanti
    console.log(`[LIVE] ${randomName} baru saja beli Topup RM${randomAmount}`);
  }, 60000); // Setiap 1 minit
}

// Jalankan fungsi
showFakeNotification();
document.documentElement.style.scrollBehavior = 'smooth';
