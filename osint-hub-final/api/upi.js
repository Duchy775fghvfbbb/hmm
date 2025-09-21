// api/upi.js
export default async function handler(req, res) {
  try {
    const upi = (req.query.upi_id || '').trim();
    if (!upi) return res.status(400).json({ error: 'missing upi_id' });
    const target = `https://upi-info.vercel.app/api/upi?upi_id=${encodeURIComponent(upi)}`;
    const r = await fetch(target);
    const text = await r.text();
    try { return res.status(200).json(JSON.parse(text)); }
    catch { return res.status(200).send(text); }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
}
