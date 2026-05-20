export default async function handler(req, res) {
  // Hanya benarkan kaedah POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Maklumat API daripada Environment Variables di Vercel
  const userId = process.env.OTAMY_USER_ID;
  const password = process.env.OTAMY_PASSWORD;

  // Ambil data pelanggan yang dihantar dari Dashboard Admin
  const { phone, telco, amount } = req.body;

  if (!phone || !amount || !telco) {
    return res.status(400).json({ status: 'FAILED', message: 'Maklumat tidak lengkap' });
  }

  // Format URL API OTA MY (Ubah mengikut dokumentasi rasmi OTA MY jika perlu)
  // Biasanya formatnya: uid, pwd, phone, amount, type, & telco
  const url = `https://otamy.net/api/recharge?uid=${userId}&pwd=${password}&phone=${phone}&amount=${amount}&type=${telco}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Beri maklum balas kepada Dashboard Admin
    if (data.status === 'SUCCESS' || data.code === '00') {
      res.status(200).json({ 
        status: 'SUCCESS', 
        message: 'Pesanan berjaya dihantar ke OTA MY' 
      });
    } else {
      res.status(200).json({ 
        status: 'FAILED', 
        message: data.message || 'Ralat dari pembekal' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Gagal menyambung ke server OTA MY: ' + error.message 
    });
  }
}
