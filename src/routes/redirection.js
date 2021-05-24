const { Router } = require("express");
const { findLongURL } = require("../services/url-service");

const router = Router();

router.get("/:code", async (req, res) => {
  const code = req.params.code;
  if (!code)
    return res
      .status(404)
      .json({ success: false, error: "Please provide a code!" });
  try {
    const url = await findLongURL(code);
    if (url) return res.redirect(url.link);
    else return res.redirect("https://google.com");
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
});

module.exports = router;
