export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const userId = process.env.OTAMY_USER_ID;
  const password = process.env.OTAMY_PASSWORD;
  const { phone, telco, amount } = req.body;

  // CUBAAN URL BARU (Sesuai untuk server Otamy/Vbiz)
  // Kita guna port 8000 atau direct api path
  const url = `https://otamy.net/api/recharge.php?uid=${userId}&pwd=${password}&msisdn=${phone}&amount=${amount}&type=${telco}&format=json`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    
    // Jika respon bermula dengan <!, bermakna URL salah (keluar HTML Not Found)
    if (text.startsWith('<!')) {
        return res.status(200).json({ 
            status: 'FAILED', 
            message: "URL API Salah. Sila pastikan URL API dari Admin OTA MY." 
        });
    }

    const data = JSON.parse(text);
    if (data.status === 'SUCCESS' || data.code === '00' || data.code === '1') {
      return res.status(200).json({ status: 'SUCCESS', message: 'Berjaya' });
    } else {
      return res.status(200).json({ status: 'FAILED', message: data.message || 'Gagal' });
    }
  } catch (error) {
    return res.status(500).json({ status: 'ERROR', message: 'Ralat: ' + error.message });
  }
}
