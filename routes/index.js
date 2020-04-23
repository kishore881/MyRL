const express = require("express");
const router = express.Router();

const Myrl = require("../models/Myrl");

router.get("/", (req, res) => {
  res.render("index", { info: "" });
});

// @route GET /:code
// @desc Redirect to original url
router.get("/:code", async (req, res) => {
  if (!req.params.code) {
    res.render("index", { info: "" });
  }
  try {
    const url = await Myrl.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.oldUrl);
    } else {
      return res.render("index", {
        info: `Requested URL "my-rl.herokuapp.com${req.url}" does not exist.`,
      });
    }
  } catch (err) {
    console.error(err);
    res.render("index", { info: "Server Error.  Refresh the page." });
  }
});

module.exports = router;
