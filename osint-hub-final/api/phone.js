// api/phone.js
export default async function handler(req, res) {
  try {
    const mobile = (req.query.mobile || '').trim();
    if (!/^\d{10}$/.test(mobile)) return res.status(400).json({ error: 'invalid mobile' });
    const target = `https://flipcartstore.serv00.net/INFO.php?api_key=chxInfo&mobile=${encodeURIComponent(mobile)}`;
    const r = await fetch(target);
    const text = await r.text();
    try { return res.status(200).json(JSON.parse(text)); }
    catch { return res.status(200).send(text); }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
}
