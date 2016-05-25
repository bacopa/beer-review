var express = require("express");
var path = require("path");
var router = express.Router();

router.get("/", function (req, res) {
	var indexPath = path.join(__dirname, "../index.html");
	res.sendFile(indexPath);
});


module.exports = router;