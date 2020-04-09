const express = require("express");
const validurl = require("valid-url");
const shortid = require("shortid");
const config = require("config");
const Myrl = require("../models/Myrl");

const router = express.Router();

// @route   POST /api/myrl/modify
// @desc    Create new URL
router.post("/modify", async (req, res) => {
  const { oldUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  //check base url
  if (!validurl.isUri(baseUrl)) {
    return res.status(401).json("invalid base url: " + baseUrl);
  }

  // create url code
  const urlCode = shortid.generate();

  // check input url
  if (validurl.isUri(oldUrl)) {
    try {
      let url = await Myrl.findOne({ oldUrl });

      if (url) {
        res.json(url);
      } else {
        const newUrl = baseUrl + "/" + urlCode;

        url = new Myrl({
          oldUrl,
          newUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).send("invalid Url");
    console.log(oldUrl);
    console.log(req.headers);
  }
});

module.exports = router;
