export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const userId = process.env.OTAMY_USER_ID;
  const password = process.env.OTAMY_PASSWORD;

  const { phone, telco, amount } = req.body;

  // Format telco ke huruf kecil/besar mengikut keperluan OTA MY
  // Sesetengah API memerlukan kod produk (cth: C5 untuk Celcom RM5)
  const productCode = telco.toUpperCase(); 

  // URL API OTA MY yang dikemas kini (Gunakan HTTPS)
  const url = `https://otamy.net/api/recharge?uid=${userId}&pwd=${password}&phone=${phone}&amount=${amount}&type=${productCode}&format=json`;

  try {
    const response = await fetch(url);
    const text = await response.text(); // Ambil dalam bentuk text dulu untuk elak error JSON tadi
    
    try {
      const data = JSON.parse(text);
      if (data.status === 'SUCCESS' || data.code === '00') {
        return res.status(200).json({ status: 'SUCCESS', message: 'Berjaya!' });
      } else {
        return res.status(200).json({ status: 'FAILED', message: data.message || 'Gagal dari OTA MY' });
      }
    } catch (e) {
      // Jika server OTA MY balas dalam bentuk bukan JSON (mungkin ralat akaun/maintenance)
      return res.status(200).json({ status: 'FAILED', message: "Respon Server: " + text });
    }
  } catch (error) {
    return res.status(500).json({ status: 'ERROR', message: 'Ralat Connection: ' + error.message });
  }
}
