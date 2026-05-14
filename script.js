// TXT STUDIO - SCRIPT UTAMA
// DIBINA UNTUK LAMAN WEB TELCO

// ✅ FUNGSI MENU TELEFON (BUKA / TUTUP / TUKAR IKON)
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  // Bila tekan butang menu
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Tukar ikon garis ≡ jadi silang × bila menu terbuka
    const icon = menuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    } else {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    }
  });

  // Tutup menu bila pilih mana-mana pautan dalam menu
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      const icon = menuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });

  // Tutup menu bila tekan luar kawasan menu
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      const icon = menuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// ✅ TAMBAH BAYANG & WARNA NAVBAR BILA SCROLL KE BAWAH
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('nav');
  if (window.scrollY > 20) {
    navbar.classList.add('shadow-xl', 'bg-gelap/80');
    navbar.classList.remove('bg-gelap/60');
  } else {
    navbar.classList.remove('shadow-xl', 'bg-gelap/80');
    navbar.classList.add('bg-gelap/60');
  }
});

// ✅ SCROLL LICIN TAMBAHAN (KALAU PERLU)
document.documentElement.style.scrollBehavior = 'smooth';
