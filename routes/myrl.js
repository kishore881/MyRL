const express = require("express");
const validurl = require("valid-url");
const shortid = require("shortid");
// const config = require("config");
const Myrl = require("../models/Myrl");

const router = express.Router();

// @route   POST /api/myrl/modify
// @desc    Create new URL
router.post("/modify", async (req, res) => {
  const { oldUrl, customText } = req.body;
  // const baseUrl = config.get("baseUrl");
  const baseUrl = process.env.baseUrl;
  var sent = false;

  var urlCode;
  //check the custom text is not taken already
  if (customText) {
    urlCode = customText;
    let url = await Myrl.findOne({ urlCode: urlCode });
    if (url) {
      sent = true;
      res.send({
        newUrl: false,
        ctExist: urlCode,
        alExist: false,
        reto: false,
      });
    }
  } else urlCode = shortid.generate();
  // check if the oldUrl already points to something;
  if (!sent) {
    let url = await Myrl.findOne({ newUrl: oldUrl });
    if (url) {
      sent = true;
      res.send({
        newUrl: false,
        ctExist: false,
        alExist: false,
        reto: url.oldUrl,
      });
    }
  }
  if (!sent) {
    if (validurl.isUri(oldUrl)) {
      // check if input url is already shortened
      let url = await Myrl.findOne({ oldUrl });

      if (url) {
        res.send({
          newUrl: url.newUrl,
          ctExist: false,
          alExist: true,
          reto: false,
        });
      } else {
        var newUrl;
        var urlCode;
        if (customText) {
          urlCode = customText;
        } else {
          urlCode = shortid.generate();
        }
        newUrl = baseUrl + "/" + urlCode;
        url = new Myrl({
          oldUrl,
          newUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();

        res.send({ newUrl: url.newUrl });
      }
    }
  }
});

module.exports = router;
