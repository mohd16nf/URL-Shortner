const  nanoid  = require('nano-id');
const URL = require('../models/url');

async function handleGenerateShortURL(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ err: 'URL is required' });

  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectURL: url,
    visitHistory: []
  });

  return res.json({ shortUrl: `http://localhost:6000/url/${shortId}` });
}

async function handleRedirect(req, res) {
  const { shortId } = req.params;
  const url = await URL.findOne({ shortId: shortId });
  if (url) {
    res.redirect(url.redirectURL);
  } else {
    res.status(404).json({ err: 'URL not found' });
  }
}

module.exports = {
  handleGenerateShortURL,
  handleRedirect
};
