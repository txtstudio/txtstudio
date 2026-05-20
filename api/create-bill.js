export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { amount, phone, billName } = req.body;

  const details = new URLSearchParams({
    userSecretKey: process.env.TOYYIBPAY_API_KEY,
    categoryCode: process.env.TOYYIBPAY_CATEGORY_CODE,
    billName: 'Topup ' + billName,
    billDescription: 'Pembayaran Topup TXT Studio',
    billPriceSetting: 1,
    billPayorInfo: 1,
    billAmount: (parseFloat(amount) * 100).toString(), // RM ke Sen
    billReturnUrl: 'https://txtstudio.vercel.app',
    billCallbackUrl: 'https://txtstudio.vercel.app/api/callback',
    billExternalReferenceNo: 'TXT' + Date.now(),
    billTo: phone,
    billEmail: 'customer@email.com',
    billPhone: phone,
  });

  try {
    const response = await fetch('https://toyyibpay.com/index.php/api/createBill', {
      method: 'POST',
      body: details
    });
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghubungi ToyyibPay' });
  }
}
