const express = require("express");
const router = express.Router();

const Myrl = require("../models/Myrl");

// @route GET /:code
// @desc Redirect to original url
router.get("/:code", async (req, res) => {
  if (!req.params.code) {
    res.sendFile("./views/index.html");
  }
  try {
    const url = await Myrl.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.oldUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("server error");
  }
});

module.exports = router;
