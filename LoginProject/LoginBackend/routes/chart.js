const express = require("express");
const router = express.Router();
const { getGraphData } = require("../controllers/chart");

router.get("/getGraphData", getGraphData);



module.exports = router;