export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const userId = process.env.OTAMY_USER_ID;
  const password = process.env.OTAMY_PASSWORD;
  const { phone, telco, amount } = req.body;

  // Sesuaikan link API mengikut server OTA MY yang sebenar
  // Kita cuba format yang paling umum untuk server 6890 / Otamy
  const url = `https://otamy.net/api/recharge.php?uid=${userId}&pwd=${password}&msisdn=${phone}&amount=${amount}&type=${telco}&format=json`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      // OTA MY biasanya guna kod '1' atau 'SUCCESS' untuk berjaya
      if (data.status === 'SUCCESS' || data.code === '1' || data.code === '00') {
        return res.status(200).json({ status: 'SUCCESS', message: 'Pesanan Diterima' });
      } else {
        return res.status(200).json({ status: 'FAILED', message: data.message || 'Gagal' });
      }
    } catch (e) {
      // Jika masih bukan JSON, kita paparkan respon pendek
      return res.status(200).json({ status: 'FAILED', message: "Respon: " + text.substring(0, 100) });
    }
  } catch (error) {
    return res.status(500).json({ status: 'ERROR', message: 'Connection Error' });
  }
}
