// api/vehicle.js
export default async function handler(req, res) {
  try {
    const rc = (req.query.rc_number || '').trim();
    if (!rc) return res.status(400).json({ error: 'missing rc_number' });
    const target = `https://vehicle0-api.vercel.app/?rc_number=${encodeURIComponent(rc)}`;
    const r = await fetch(target);
    const text = await r.text();
    try { return res.status(200).json(JSON.parse(text)); }
    catch { return res.status(200).send(text); }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
}
