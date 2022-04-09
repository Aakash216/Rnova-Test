const Chart = require("../models/chart");


//Get Method to get data user wise
module.exports.getGraphData = async (req, res) => {
    try {
         const {userId} = req.query
         let graphData = await Chart.findOne({userId});
         if(graphData){
             res.status(200).json({graphData})
            }
    } catch (err) {
        let error = err.message;
        res.status(400).json({ error: error });
    }
};

