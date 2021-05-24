const { Router } = require("express");
const {
  createCustomShortCode,
  createRandomShortCode,
  findLongURL,
} = require("../services/url-service");

const router = Router();

/**
 * FOR generating short links
 * POST /api/links
 * BODY
 *      link: http://xxxxx.xxxx/xxx/xxx
 *      --optional----
 *      code: xxxx
 */
router.post("/", async (req, res) => {
  if (!req.body)
    return res
      .status(404)
      .json({ success: false, error: "Please provide a link!" });
  const link = req.body.link;
  const code = req.body.code;
  if (!link)
    return res
      .status(404)
      .json({ success: false, error: "Please provide a link!" });
  if (!code) {
    try {
      const url = await createRandomShortCode(link);
      return res.json({ success: true, url });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }
  try {
    const url = await createCustomShortCode(code, link);
    return res.json({ success: true, url });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
});

/**
 * FOR retrieving the long links
 * POST /api/links/xxxx
 * RESPONSE
 *      link: http://xxxxx.xxxx/xxx/xxx
 */
router.get("/:code", async (req, res) => {
  const code = req.params.code;
  if (!code)
    return res
      .status(404)
      .json({ success: false, error: "Please provide a code!" });
  try {
    const url = await findLongURL(code);
    return res.json({ success: true, url });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
});

module.exports = router;
